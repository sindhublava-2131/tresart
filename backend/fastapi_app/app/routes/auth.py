import re
from datetime import datetime, timezone
from typing import Any

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.errors import DuplicateKeyError, PyMongoError

from app.db import get_database
from app.schemas import LoginRequest, ProfileUpdateRequest, RegisterRequest
from app.security import create_access_token, get_current_user, hash_password, verify_password

router = APIRouter()
PUBLIC_USER_FIELDS = (
    "name",
    "email",
    "phone",
    "address",
    "street",
    "landmark",
    "city",
    "state",
    "pincode",
    "nationality",
    "createdAt",
    "updatedAt",
)


def public_user(user: dict[str, Any]) -> dict[str, Any]:
    result: dict[str, Any] = {"_id": str(user["_id"])}
    for field in PUBLIC_USER_FIELDS:
        if field in user:
            value = user[field]
            result[field] = value.isoformat() if isinstance(value, datetime) else value
    return result


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(body: RegisterRequest, database=Depends(get_database)) -> dict[str, Any]:
    clean_email = body.email.strip().lower()
    clean_name = body.name.strip()
    digits_only = re.sub(r"\D", "", body.phone.strip())
    clean_phone = digits_only[-10:] if len(digits_only) >= 10 else digits_only
    now = datetime.now(timezone.utc)
    user = {
        "name": clean_name,
        "email": clean_email,
        "password": hash_password(body.password),
        "phone": clean_phone,
        "address": "",
        "street": body.street,
        "landmark": body.landmark,
        "city": body.city,
        "state": body.state,
        "pincode": body.pincode,
        "nationality": body.nationality,
        "cart": [],
        "createdAt": now,
        "updatedAt": now,
    }
    try:
        inserted = await database.users.insert_one(user)
    except (DuplicateKeyError, PyMongoError):
        raise HTTPException(status_code=400, detail={"error": "Registration failed. Please try again or use a different email."})

    user["_id"] = inserted.inserted_id
    return {"user": public_user(user), "token": create_access_token(inserted.inserted_id)}


@router.post("/login")
async def login(body: LoginRequest, database=Depends(get_database)) -> dict[str, Any]:
    identifier = body.email.strip()
    search_conditions: list[dict[str, Any]] = [{"email": identifier.lower()}, {"phone": identifier}]
    digits_only = re.sub(r"\D", "", identifier)
    if len(digits_only) >= 10:
        phone_query = digits_only[-10:]
        search_conditions.extend([{"phone": phone_query}, {"phone": {"$regex": f"{phone_query}$"}}])

    user = await database.users.find_one({"$or": search_conditions})
    if user is None or not verify_password(body.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail={"error": "Invalid login credentials"})
    return {"user": public_user(user), "token": create_access_token(user["_id"])}


@router.get("/me")
async def get_me(user=Depends(get_current_user)) -> dict[str, Any]:
    return public_user(user)


@router.put("/me")
async def update_me(
    body: ProfileUpdateRequest,
    user=Depends(get_current_user),
    database=Depends(get_database),
) -> dict[str, Any]:
    updates = body.model_dump(exclude_unset=True)
    if "password" in updates and updates["password"] is not None:
        updates["password"] = hash_password(updates["password"])
    if not updates:
        return public_user(user)

    updates["updatedAt"] = datetime.now(timezone.utc)
    try:
        await database.users.update_one({"_id": user["_id"]}, {"$set": updates})
    except PyMongoError:
        raise HTTPException(status_code=400, detail={"error": "Profile update failed"})
    user.update(updates)
    return public_user(user)