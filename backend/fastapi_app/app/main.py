from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pymongo import AsyncMongoClient
from pymongo.errors import InvalidOperation
from starlette.responses import JSONResponse, PlainTextResponse

from app.core.config import get_settings
from app.routes import auth, cart, products


@asynccontextmanager
async def lifespan(application: FastAPI):
    settings = get_settings()
    if not settings.mongodb_uri:
        raise RuntimeError("MONGODB_URI must be configured in backend/.env or the environment")
    if not settings.jwt_secret:
        raise RuntimeError("JWT_SECRET must be configured in backend/.env or the environment")

    client = AsyncMongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)
    try:
        await client.admin.command("ping")
        if settings.mongodb_database:
            database = client[settings.mongodb_database]
        else:
            try:
                database = client.get_default_database()
            except InvalidOperation as error:
                raise RuntimeError("Set MONGODB_DATABASE or include a database name in MONGODB_URI") from error
        application.state.mongo_client = client
        application.state.database = database
        yield
    finally:
        await client.close()


app = FastAPI(title="TresArt API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(cart.router, prefix="/api/cart", tags=["cart"])
app.include_router(products.router, prefix="/api/products", tags=["products"])


@app.exception_handler(HTTPException)
async def api_http_exception_handler(request: Request, error: HTTPException) -> JSONResponse:
    content = error.detail
    if isinstance(content, dict) and "error" in content:
        return JSONResponse(status_code=error.status_code, content=content, headers=error.headers)
    return JSONResponse(status_code=error.status_code, content={"detail": content}, headers=error.headers)


@app.get("/", response_class=PlainTextResponse)
async def health_check() -> str:
    return "TresArt API is running..."