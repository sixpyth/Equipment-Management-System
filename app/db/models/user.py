from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Enum, UUID
from uuid import uuid4

from enums.enum_status import UserStatus, UserType
from app.db.models.base import BaseModel


class User(BaseModel):
    __tablename__ = "users"
    
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )

    

    email: Mapped[str] = mapped_column(String, nullable=False, index=True)

    name: Mapped[str] = mapped_column(String, nullable=False)

    surname: Mapped[str] = mapped_column(String, nullable=False)

    father_name: Mapped[str] = mapped_column(String, nullable=False)

    position: Mapped[str] = mapped_column(String, nullable=False)

    department: Mapped[str] = mapped_column(String, nullable=False)

    contact_info: Mapped[str] = mapped_column(String, nullable=False)

    rights: Mapped[UserType] = mapped_column(Enum(UserType), nullable=True)

    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus, name="user_status_enum"),
        nullable=False,
        default=UserStatus.ACTIVE,
    )
