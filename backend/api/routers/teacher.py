from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from api.dependencies import get_db

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.get("/class-overview")
async def get_class_overview(db: AsyncSession = Depends(get_db)):
    """Provides aggregated skill mastery across all students for teacher dashboard."""
    return {
        "class_name": "Lớp 8A1",
        "total_students": 35,
        "class_skill_mastery": {
            "SKILL_INT": 0.88,
            "SKILL_FRAC": 0.42,  # Alert: Weak skill across the class
            "SKILL_EQ1": 0.58,
            "SKILL_EQ2": 0.35,
        },
        "critical_skills_to_review": ["SKILL_FRAC", "SKILL_EQ2"],
    }
