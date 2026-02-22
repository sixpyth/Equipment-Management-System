from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String
from app.db.models.base import BaseModel


class AuditLog(BaseModel):
    __tablename__ = "audit_logs"

    user_email: Mapped[str] = mapped_column(String, nullable=False)
    action: Mapped[str] = mapped_column(String, nullable=False)

    entity: Mapped[str] = mapped_column(String, nullable=False)
    entity_id: Mapped[int] = mapped_column(nullable=False)
