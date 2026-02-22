from fastapi import APIRouter
from app.api.routers.user import router as user_router
from app.api.routers.equipment import router as equipment_router
from app.api.routers.issue_equipment import router as issue_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(user_router, prefix="/user")
api_router.include_router(equipment_router, prefix="/equipment")
api_router.include_router(issue_router, prefix="/issue")
