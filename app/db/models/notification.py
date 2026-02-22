from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean
from app.db.models.base import BaseModel


class Notification(BaseModel):
    __tablename__ = "notifications"

    recipient_email: Mapped[str] = mapped_column(String, nullable=True)

    message: Mapped[str] = mapped_column(String, nullable=False)

    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
