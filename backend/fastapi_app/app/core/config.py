from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_ENV_FILE = Path(__file__).resolve().parents[3] / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BACKEND_ENV_FILE,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    mongodb_uri: str = ""
    mongodb_database: str | None = None
    jwt_secret: str = ""
    cors_origins: str = "http://localhost:5173"
    port: int = 5000

    @property
    def allowed_origins(self) -> list[str]:
        origins = [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

        for host in ("localhost", "127.0.0.1"):
            for port in range(5173, 5191):
                origins.append(f"http://{host}:{port}")

        return list(dict.fromkeys(origins))


@lru_cache
def get_settings() -> Settings:
    return Settings()