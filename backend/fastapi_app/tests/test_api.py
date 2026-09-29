import asyncio
import re
from typing import Any

import bcrypt
import httpx
import pytest
from bson import ObjectId

from app.core.config import get_settings
from app.db import get_database
from app.main import app


class FakeCursor:
    def __init__(self, documents: list[dict[str, Any]]):
        self.documents = documents

    async def to_list(self, length: int | None = None) -> list[dict[str, Any]]:
        return self.documents if length is None else self.documents[:length]


class FakeCollection:
    def __init__(self, documents: list[dict[str, Any]] | None = None):
        self.documents = documents or []

    async def find_one(self, query: dict[str, Any]) -> dict[str, Any] | None:
        for document in self.documents:
            if self._matches(document, query):
                return document
        return None

    async def insert_one(self, document: dict[str, Any]):
        stored = document.copy()
        stored["_id"] = ObjectId()
        self.documents.append(stored)

        class InsertResult:
            inserted_id = stored["_id"]

        return InsertResult()

    async def update_one(self, query: dict[str, Any], update: dict[str, Any]):
        document = await self.find_one(query)
        if document:
            document.update(update.get("$set", {}))

    def find(self, query: dict[str, Any]) -> FakeCursor:
        return FakeCursor([document for document in self.documents if self._matches(document, query)])

    @classmethod
    def _matches(cls, document: dict[str, Any], query: dict[str, Any]) -> bool:
        if "$or" in query:
            return any(cls._matches(document, condition) for condition in query["$or"])
        for field, expected in query.items():
            actual = document.get(field)
            if isinstance(expected, dict) and "$regex" in expected:
                if not re.search(expected["$regex"], str(actual or "")):
                    return False
            elif actual != expected:
                return False
        return True


class FakeDatabase:
    def __init__(self):
        product_id = ObjectId()
        self.products = FakeCollection([{
            "_id": product_id,
            "name": "Test Tote",
            "price": 450,
            "description": "Test product",
            "imageURL": "/images/test.png",
            "category": "Tote Bags",
        }])
        self.users = FakeCollection()
        self.product_id = product_id


def make_request(method: str, path: str, **kwargs: Any) -> httpx.Response:
    async def send() -> httpx.Response:
        async with httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app),
            base_url="http://test",
        ) as client:
            return await client.request(method, path, **kwargs)

    return asyncio.run(send())


@pytest.fixture
def database(monkeypatch: pytest.MonkeyPatch) -> FakeDatabase:
    monkeypatch.setenv("JWT_SECRET", "test-secret-for-api-tests-at-least-32-bytes")
    get_settings.cache_clear()
    fake_database = FakeDatabase()
    app.dependency_overrides[get_database] = lambda: fake_database
    yield fake_database
    app.dependency_overrides.clear()
    get_settings.cache_clear()


def test_register_normalizes_fields_and_does_not_return_password(database: FakeDatabase) -> None:
    response = make_request("POST", "/api/auth/register", json={
        "name": "  Test Buyer ",
        "email": " BUYER@EXAMPLE.COM ",
        "password": "test-password",
        "phone": "+91 98765 43210",
    })

    assert response.status_code == 201
    result = response.json()
    assert result["user"]["email"] == "buyer@example.com"
    assert result["user"]["name"] == "Test Buyer"
    assert result["user"]["phone"] == "9876543210"
    assert "password" not in result["user"]
    assert bcrypt.checkpw(b"test-password", database.users.documents[0]["password"].encode())


def test_login_accepts_phone_and_auth_error_shape(database: FakeDatabase) -> None:
    database.users.documents.append({
        "_id": ObjectId(),
        "name": "Test Buyer",
        "email": "buyer@example.com",
        "phone": "9876543210",
        "password": bcrypt.hashpw(b"test-password", bcrypt.gensalt(rounds=10)).decode(),
    })
    response = make_request("POST", "/api/auth/login", json={
        "email": "+91 98765 43210",
        "password": "test-password",
    })

    assert response.status_code == 200
    assert response.json()["token"]
    assert "password" not in response.json()["user"]

    bad_login = make_request("POST", "/api/auth/login", json={"email": "missing", "password": "bad"})
    assert bad_login.status_code == 401
    assert bad_login.json() == {"error": "Invalid login credentials"}


def test_products_and_cart_routes_preserve_frontend_shape(database: FakeDatabase) -> None:
    user_id = ObjectId()
    database.users.documents.append({
        "_id": user_id,
        "name": "Test Buyer",
        "email": "buyer@example.com",
        "phone": "9876543210",
        "password": "unused",
        "cart": [],
    })
    from app.security import create_access_token

    token = create_access_token(user_id)
    headers = {"Authorization": f"Bearer {token}"}
    products_response = make_request("GET", "/api/products")
    assert products_response.status_code == 200
    assert products_response.json()[0]["_id"] == str(database.product_id)

    added = make_request("POST", "/api/cart/add", headers=headers, json={
        "productId": str(database.product_id),
        "quantity": 2,
    })
    assert added.status_code == 200
    assert added.json()[0]["quantity"] == 2
    assert added.json()[0]["productId"]["name"] == "Test Tote"
    line_id = added.json()[0]["_id"]

    cart = make_request("GET", "/api/cart", headers=headers)
    assert cart.json()[0]["_id"] == line_id

    updated = make_request("PUT", "/api/cart/update", headers=headers, json={
        "productId": str(database.product_id),
        "quantity": 0,
    })
    assert updated.status_code == 200
    assert updated.json() == []

    cleared = make_request("POST", "/api/cart/clear", headers=headers)
    assert cleared.json() == {"message": "Cart cleared"}


def test_protected_route_rejects_missing_token(database: FakeDatabase) -> None:
    response = make_request("GET", "/api/auth/me")

    assert response.status_code == 401
    assert response.json() == {"error": "Please authenticate."}