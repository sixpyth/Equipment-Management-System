from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, Boolean, ForeignKey, UUID
from app.db.models.base import BaseModel
from app.db.models.equipment import Equipment
from enums.issue import IssueType
from uuid import uuid4

class EquipmentIssue(BaseModel):
    __tablename__ = "equipment_issues"

    equipment_id: Mapped[UUID] = mapped_column(
        ForeignKey("equipment.id"), nullable=False,
        default=uuid4
    )
    
    equipment: Mapped["Equipment"] = relationship(
    "Equipment",
    back_populates="issues"
)
    name: Mapped[str] = mapped_column(String, unique=False)
    
    full_user_name: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    full_admin_name: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    admin_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )


    serial_number: Mapped[str] = mapped_column(String, nullable=True)

    issued_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False
    )

    possession_until: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    confirmed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
