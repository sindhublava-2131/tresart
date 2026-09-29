from datetime import datetime, timezone
from typing import Any

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from pymongo.errors import PyMongoError

from app.db import get_database
from app.schemas import CartItemRequest
from app.security import get_current_user

router = APIRouter()


def serialize_product(product: dict[str, Any] | None) -> dict[str, Any] | None:
    if product is None:
        return None
    result = {key: value for key, value in product.items() if key != "__v"}
    result["_id"] = str(product["_id"])
    for field in ("createdAt", "updatedAt"):
        if isinstance(result.get(field), datetime):
            result[field] = result[field].isoformat()
    return result


async def populated_cart(user: dict[str, Any], database: Any) -> list[dict[str, Any]]:
    cart = []
    for item in user.get("cart", []):
        product_id = item.get("productId")
        product = None
        if product_id is not None:
            try:
                product = await database.products.find_one({"_id": ObjectId(str(product_id))})
            except (TypeError, ValueError):
                product = None
        cart.append({
            "_id": str(item.get("_id", ObjectId())),
            "quantity": item.get("quantity", 1),
            "productId": serialize_product(product),
        })
    return cart


async def save_cart(user: dict[str, Any], database: Any) -> list[dict[str, Any]]:
    user["updatedAt"] = datetime.now(timezone.utc)
    await database.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"cart": user.get("cart", []), "updatedAt": user["updatedAt"]}},
    )
    return await populated_cart(user, database)


@router.get("")
async def get_cart(user=Depends(get_current_user), database=Depends(get_database)) -> list[dict[str, Any]]:
    return await populated_cart(user, database)


@router.post("/add")
async def add_to_cart(
    body: CartItemRequest,
    user=Depends(get_current_user),
    database=Depends(get_database),
) -> list[dict[str, Any]]:
    try:
        product_id = ObjectId(body.productId)
        cart = user.setdefault("cart", [])
        cart_item = next((item for item in cart if str(item.get("productId")) == str(product_id)), None)
        if cart_item:
            cart_item["quantity"] = cart_item.get("quantity", 1) + (body.quantity or 1)
        else:
            cart.append({"_id": ObjectId(), "productId": product_id, "quantity": body.quantity or 1})
        return await save_cart(user, database)
    except (TypeError, ValueError, PyMongoError):
        raise HTTPException(status_code=400, detail={"error": "Could not add item to cart"})


@router.put("/update")
async def update_cart(
    body: CartItemRequest,
    user=Depends(get_current_user),
    database=Depends(get_database),
) -> list[dict[str, Any]]:
    try:
        product_id = ObjectId(body.productId)
    except (TypeError, ValueError):
        raise HTTPException(status_code=400, detail={"error": "Invalid productId"})

    cart = user.get("cart", [])
    cart_item = next((item for item in cart if str(item.get("productId")) == str(product_id)), None)
    if cart_item is None:
        raise HTTPException(status_code=404, detail={"error": "Item not in cart"})
    cart_item["quantity"] = body.quantity
    if cart_item["quantity"] <= 0:
        user["cart"] = [item for item in cart if str(item.get("productId")) != str(product_id)]
    try:
        return await save_cart(user, database)
    except PyMongoError:
        raise HTTPException(status_code=400, detail={"error": "Could not update cart"})


@router.delete("/remove/{product_id}")
async def remove_from_cart(
    product_id: str,
    user=Depends(get_current_user),
    database=Depends(get_database),
) -> list[dict[str, Any]]:
    user["cart"] = [
        item for item in user.get("cart", [])
        if str(item.get("productId")) != product_id and str(item.get("_id")) != product_id
    ]
    try:
        return await save_cart(user, database)
    except PyMongoError:
        raise HTTPException(status_code=400, detail={"error": "Could not remove item from cart"})


@router.post("/clear")
async def clear_cart(user=Depends(get_current_user), database=Depends(get_database)) -> dict[str, str]:
    user["cart"] = []
    try:
        await save_cart(user, database)
    except PyMongoError:
        raise HTTPException(status_code=400, detail={"error": "Could not clear cart"})
    return {"message": "Cart cleared"}