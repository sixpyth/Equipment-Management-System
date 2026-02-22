from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from uuid import UUID
from app.db.models.equipment import Equipment
from app.db.models.equipment_issue import EquipmentIssue
from app.db.models.user import User
from app.db.deps import get_db
from starlette import status
from app.schemas.equipment import IssueCreate
from enums.equipment import EquipmentStatus
from enums.enum_status import UserType



router = APIRouter(tags=["Issue equipment"])


# Issue equipment to user (Выдача юзеру)
@router.post("/issue")
async def issue_equipment(
    payload: IssueCreate,
    db: AsyncSession = Depends(get_db),
):
    # ищем пользователя
    try:
        user = await db.scalar(
            select(User).where(
                User.surname == payload.full_user_name.split()[0],
                User.name == payload.full_user_name.split()[1],
                User.father_name == payload.full_user_name.split()[2],
            )
        )
    except IndexError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Пожалуйста, введите полное имя получателя")

    if not user:
        raise HTTPException(404, "Пользователь не найден")

    try:
        # ищем администратора
        admin = await db.scalar(
            select(User).where(
                User.surname == payload.full_admin_name.split()[0],
                User.name == payload.full_admin_name.split()[1],
                User.father_name == payload.full_admin_name.split()[2],
            )
        )
    except IndexError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Пожалуйста, введите полное имя администратора")

    if admin.rights != UserType.IT_ADMIN:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Пользователь не является администратором")

    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Администратор не найден")

    # ищем оборудование
    equipment = await db.scalar(
        select(Equipment).where(Equipment.name == payload.name)
    )

    if not equipment:
        raise HTTPException(404, "Оборудование не найдено")

    if equipment.status != EquipmentStatus.IN_STOCK:
        raise HTTPException(400, "Оборудование недоступно")

    issue = EquipmentIssue(
        equipment_id=equipment.id,
        user_id=user.id,
        admin_id=admin.id,
        name=equipment.name,
        full_user_name=payload.full_user_name,
        full_admin_name=payload.full_admin_name,
        serial_number=payload.serial_number,
        possession_until=payload.possession_until,
    )

    db.add(issue)

    equipment.status = EquipmentStatus.GIVEN

    await db.commit()
    await db.refresh(issue)

    return issue

@router.post("/confirm_issue")
async def confirm_issue(issue_id: int, db: AsyncSession = Depends(get_db)):
    issue = await db.get(EquipmentIssue, issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Заявка не найдена"
        )
    if issue.confirmed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Заявка уже подтверждена"
        )
    issue.confirmed = True
    await db.commit()
    return "Запись подтверждена"


# Return issued equipment
@router.post("/return/{issue_id}")
async def return_equipment(
    id: UUID,
    db: AsyncSession = Depends(get_db),
):
    issue: EquipmentIssue = await db.get(EquipmentIssue, id)

    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Оборудование не найдено"
        )

    equipment: Equipment = await db.get(Equipment, issue.equipment_id)

    if equipment.status == EquipmentStatus.IN_STOCK:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Оборудование уже было возвращено",
        )

    equipment.status = EquipmentStatus.IN_STOCK

    await db.commit()
   
    return "Оборудование было возвращено"


# Get all equipment by user
@router.get("/issue/by-user/{email}")
async def user_equipment(
    full_name: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.scalars(
        select(EquipmentIssue).where(EquipmentIssue.full_user_name == full_name)
    )
    return result.all()
