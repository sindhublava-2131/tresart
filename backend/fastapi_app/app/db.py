from typing import Any

from fastapi import Request


def get_database(request: Request) -> Any:
    return request.app.state.database