from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends

from app.db import get_database

router = APIRouter()


def serialize_product(product: dict[str, Any]) -> dict[str, Any]:
    result = {key: value for key, value in product.items() if key != "__v"}
    result["_id"] = str(product["_id"])
    for field in ("createdAt", "updatedAt"):
        if isinstance(result.get(field), datetime):
            result[field] = result[field].isoformat()
    return result


@router.get("")
async def get_products(database=Depends(get_database)) -> list[dict[str, Any]]:
    products = await database.products.find({}).to_list(length=None)
    return [serialize_product(product) for product in products]