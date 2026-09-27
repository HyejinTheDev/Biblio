from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from api.dependencies import get_db
from api.services.student_service import StudentService
from api.models.student import StudentStateResponse
from api.models.skill import AdventureMapResponse

router = APIRouter(prefix="/students", tags=["students"])


@router.get("/{student_id}/state", response_model=StudentStateResponse)
async def get_student_state(student_id: str, db: AsyncSession = Depends(get_db)):
    service = StudentService(db)
    state = await service.get_student_state(student_id)
    return StudentStateResponse(
        student_id=state["student_id"],
        name=state["name"],
        level=state["level"],
        exp=state["exp"],
        next_level_exp=state["next_level_exp"],
        streak_days=state["streak_days"],
        total_stars=state["total_stars"],
        mastery_map=state["mastery_map"],
        overall_progress=state["overall_progress"],
    )


@router.get("/{student_id}/adventure-map", response_model=AdventureMapResponse)
async def get_student_adventure_map(student_id: str, db: AsyncSession = Depends(get_db)):
    service = StudentService(db)
    map_data = await service.get_adventure_map(student_id)
    return AdventureMapResponse(**map_data)
