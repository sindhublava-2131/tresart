import bcrypt
import jwt
from bson import ObjectId
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pymongo.errors import PyMongoError

from app.core.config import get_settings
from app.db import get_database

bearer_scheme = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")[:72]
    return bcrypt.hashpw(password_bytes, bcrypt.gensalt(rounds=10)).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    try:
        password_bytes = password.encode("utf-8")[:72]
        return bcrypt.checkpw(password_bytes, password_hash.encode("utf-8"))
    except (ValueError, TypeError):
        return False


def create_access_token(user_id: ObjectId) -> str:
    secret = get_settings().jwt_secret
    if not secret:
        raise RuntimeError("JWT_SECRET must be configured before issuing tokens")
    return jwt.encode({"_id": str(user_id)}, secret, algorithm="HS256")


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    database=Depends(get_database),
):
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={"error": "Please authenticate."},
        headers={"WWW-Authenticate": "Bearer"},
    )
    secret = get_settings().jwt_secret
    if credentials is None or not secret:
        raise unauthorized

    try:
        payload = jwt.decode(credentials.credentials, secret, algorithms=["HS256"])
        user_id = ObjectId(payload["_id"])
        user = await database.users.find_one({"_id": user_id})
    except (jwt.PyJWTError, KeyError, TypeError, ValueError, PyMongoError):
        raise unauthorized

    if user is None:
        raise unauthorized
    return user