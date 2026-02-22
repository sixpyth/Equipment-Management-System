from pydantic import (
    BaseModel,
    EmailStr,
)
from enums.enum_status import UserType, UserStatus
from typing import Optional


class UserUpdateRequest(BaseModel):
    email: EmailStr
    payload: dict


class UserUpdateResponse(BaseModel):
    message: str


class UserUpdatePayload(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    position: Optional[str] = None
    status: UserStatus = None
    rights: UserType = None
