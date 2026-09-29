from pydantic import BaseModel, ConfigDict


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    phone: str = ""
    street: str = ""
    landmark: str = ""
    city: str = ""
    state: str = ""
    pincode: str = ""
    nationality: str = "Indian"


class LoginRequest(BaseModel):
    email: str
    password: str


class ProfileUpdateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None = None
    phone: str | None = None
    street: str | None = None
    landmark: str | None = None
    city: str | None = None
    state: str | None = None
    pincode: str | None = None
    nationality: str | None = None
    password: str | None = None


class CartItemRequest(BaseModel):
    productId: str
    quantity: int = 1