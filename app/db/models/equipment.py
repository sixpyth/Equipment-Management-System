from datetime import date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Date, Enum
from app.db.models.base import BaseModel
from enums.equipment import (
    EquipmentStatus, 
    EquipmentCategory,
    EquipmentSource
)

class Equipment(BaseModel):
    __tablename__ = "equipment"

    category: Mapped[EquipmentCategory] = mapped_column(
        Enum(EquipmentCategory),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String, nullable=False)

    serial_number: Mapped[str | None] = mapped_column(String, nullable=True)
    inventory_number: Mapped[str | None] = mapped_column(String, nullable=True)

    date_received: Mapped[date] = mapped_column(Date, nullable=False)
    source: Mapped[EquipmentSource] = mapped_column(Enum(EquipmentSource), nullable=False)

    warranty_until: Mapped[date | None] = mapped_column(Date, nullable=True)

    status: Mapped[EquipmentStatus] = mapped_column(
        Enum(EquipmentStatus, name="equipment_status_enum"),
        default=EquipmentStatus.RESERVED,
        nullable=False,
    )

    issues: Mapped[list] = relationship(
    "EquipmentIssue",
    back_populates="equipment",
    cascade="all, delete-orphan"
)
