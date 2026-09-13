from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from api.dependencies import get_db
from api.services.student_service import StudentService
from api.models.student import StudentStateResponse

router = APIRouter(prefix="/students", tags=["students"])


@router.get("/{student_id}/state", response_model=StudentStateResponse)
async def get_student_state(student_id: str, db: AsyncSession = Depends(get_db)):
    service = StudentService(db)
    state = await service.get_student_state(student_id)
    return StudentStateResponse(
        student_id=state["student_id"],
        name=state["name"],
        mastery_map=state["mastery_map"],
        overall_progress=state["overall_progress"],
    )
