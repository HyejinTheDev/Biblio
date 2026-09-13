from pydantic import BaseModel
from typing import List, Dict, Optional


class StudentProfile(BaseModel):
    id: str
    name: str
    grade: int = 8


class StudentStateResponse(BaseModel):
    student_id: str
    name: str
    mastery_map: Dict[str, float]
    overall_progress: float
    recommended_skill_id: Optional[str] = None
    recommended_reason: Optional[str] = None
