from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from app.db.models.user import User
from app.db.models.equipment_issue import EquipmentIssue
from app.db.models.equipment import Equipment
from enums.enum_status import UserType, UserStatus
from enums.equipment import EquipmentStatus

from app.schemas.user_schemas import (
    UserUpdateResponse,
    UserUpdatePayload,
)
from app.db.deps import (
    get_current_user,
    get_db,
)
from fastapi.exceptions import HTTPException
from starlette import status

router = APIRouter(tags=["User"])


@router.get("/users/me")
async def me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.get("/users/{email}")
async def get_user(
    email: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.scalar(select(User).where(User.email == email))
    return result


@router.patch("/users/{email}", response_model=UserUpdateResponse)
async def update_user(
    email: str,
    payload: UserUpdatePayload,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.right is not UserType.IT_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="У вас нет прав на изменение",
        )
    user = await db.scalar(select(User).where(User.email == email))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден"
        )
    for key, value in payload.model_dump(exclude_unset=True, exclude_none=True).items():
        setattr(user, key, value)
        print(user, key, value)

    await db.commit()
    await db.refresh(user)
    return user


@router.patch("/terminate", response_model=UserUpdateResponse)
async def terminate_user(
    full_name: str,
    db: AsyncSession = Depends(get_db)
):
    print("terminate_user HIT")
    user: User | None = await db.scalar(select(User).where(User.surname == full_name.split()[0]))

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден"
        )


    stmt = (
            select(EquipmentIssue)
            .join(Equipment)
            .where(EquipmentIssue.full_user_name == full_name)
            .where(Equipment.status == EquipmentStatus.GIVEN)
            .options(joinedload(EquipmentIssue.equipment))
        )

    result: EquipmentIssue = (await db.scalars(stmt)).all()
    names = [equipment.name for equipment in result]
    if result:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Пользователь не может быть уволен т.к. у него всё еще осталось оборудование: {names}")
    
    user.status = UserStatus.FIRED
    await db.commit()

    if user.status == UserStatus.FIRED:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь уже уволен")

    return UserUpdateResponse(message="Пользователь был успешно уволен")
    
