from pydantic import BaseModel
from datetime import date
from typing import Optional
from datetime import datetime
from enums.equipment import EquipmentCategory, EquipmentSource
from uuid import UUID

class EquipmentCreate(BaseModel):
    category: EquipmentCategory
    name: str

    serial_number: Optional[str] = None
    inventory_number: Optional[str] = None

    date_received: date
    source: EquipmentSource

    warranty_until: Optional[date] = None


class EquipmentRead(EquipmentCreate):
    id: UUID
    status: str

    class Config:
        from_attributes = True


class IssueCreate(BaseModel):
    name: str

    full_user_name: str

    full_admin_name: str

    serial_number: Optional[str] = None

    possession_until: Optional[datetime] = None


