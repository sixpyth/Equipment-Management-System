from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError
from app.db.models.equipment import Equipment
from app.db.deps import get_db
from starlette import status
from app.schemas.equipment import EquipmentCreate
from app.db.models.notification import Notification
from uuid import UUID


router = APIRouter(tags=["Equipment"])


# Create new equipment item
@router.post("/equipment")
async def create_equipment(
    equipment: EquipmentCreate,
    db: AsyncSession = Depends(get_db),
):
    obj = Equipment(**equipment.model_dump())
    get_obj = await db.scalars(
        select(Equipment).where(
            and_(
                Equipment.serial_number == equipment.serial_number,
                Equipment.category == equipment.category,
            )
        )
    )
    result = get_obj.all()
    if result:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Оборудование с таким серийным номером уже существует в данной категории",
        )

    db.add(obj)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Это оборудование уже существует в базе",
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Произошла неизвестная ошибка, пожалуйста, попробуйте позже",
        )

    # notification
    notify = Notification(recipient_email=None, message="Новое оборудование было создано")
    db.add(notify)
    
    await db.commit()
    await db.refresh(obj)
    return obj


# Get all equipment
# TODO add 1c integration
@router.get("/equipment")
async def list_equipment(db: AsyncSession = Depends(get_db)):
    result = await db.scalars(select(Equipment))
    return result.all()


# Get single equipment by id
@router.get("/equipment/{id}")
async def get_equipment(id: UUID, db: AsyncSession = Depends(get_db)):
    return await db.get(Equipment, id)


# Update equipment fields
@router.patch("/equipment/{id}")
async def update_equipment(
    id: int,
    payload: dict,
    db: AsyncSession = Depends(get_db),
):
    obj = await db.get(Equipment, id)

    if not obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Оборудование не найдено"
        )

    for k, v in payload.items():
        setattr(obj, k, v)

    # notification
    notify = Notification(recipient_email=None, message="Оборудование было обновлено")
    db.add(notify)

    await db.commit()
    return obj


# Delete equipment
@router.delete("/equipment/{id}")
async def delete_equipment(id: int, db: AsyncSession = Depends(get_db)):
    obj = await db.get(Equipment, id)

    if not obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Оборудование не найдено"
        )
    
    # notification
    notify = Notification(recipient_email=None, message="Оборудование было удалено")
    db.add(notify)

    await db.delete(obj)
    await db.commit()
