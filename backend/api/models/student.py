from pydantic import BaseModel
from typing import List, Dict, Optional, Any


class StudentProfile(BaseModel):
    id: str
    name: str
    grade: int = 8
    level: int = 1
    exp: int = 0
    streak_days: int = 1
    total_stars: int = 0


class StudentStateResponse(BaseModel):
    student_id: str
    name: str
    level: int = 1
    exp: int = 0
    next_level_exp: int = 500
    streak_days: int = 1
    total_stars: int = 0
    mastery_map: Dict[str, Any]
    overall_progress: float
    recommended_skill_id: Optional[str] = None
    recommended_reason: Optional[str] = None
