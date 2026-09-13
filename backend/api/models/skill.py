from pydantic import BaseModel
from typing import List, Optional


class SkillNode(BaseModel):
    id: str
    name: str
    description: str
    prerequisites: List[str] = []
    difficulty: int = 1
    mastery_prob: Optional[float] = 0.0  # 0.0 to 1.0
    status: Optional[str] = "not_started"  # weak, average, mastered, ready_to_learn


class KnowledgeGraphState(BaseModel):
    subject: str
    skills: List[SkillNode]
    overall_progress: float = 0.0
