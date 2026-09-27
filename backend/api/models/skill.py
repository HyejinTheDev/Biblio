from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class StageNode(BaseModel):
    id: str
    stage_code: str
    phase_id: str
    name: str
    description: str
    prerequisites: List[str] = []
    is_boss: bool = False
    mastery_prob: float = 0.0
    stars_earned: int = 0
    status: str = "locked"  # locked, active, cleared
    highest_difficulty: str = "none"  # none, normal, hard, hell


class PhaseInfo(BaseModel):
    id: str
    number: int
    title: str
    description: str
    stages: List[StageNode] = []
    phase_progress: float = 0.0


class GamerProfile(BaseModel):
    student_id: str
    name: str
    level: int = 1
    exp: int = 0
    next_level_exp: int = 500
    streak_days: int = 1
    total_stars: int = 0


class AdventureMapResponse(BaseModel):
    subject: str
    title: str
    description: str
    gamer_profile: GamerProfile
    phases: List[PhaseInfo]
    overall_progress: float = 0.0


# Backward compatibility schemas
class SkillNode(StageNode):
    pass


class KnowledgeGraphState(BaseModel):
    subject: str
    skills: List[StageNode]
    overall_progress: float = 0.0
