from pydantic import BaseModel
from typing import Optional, List


class QuestionDetail(BaseModel):
    id: str
    stage_id: str
    difficulty_tier: str = "normal"  # normal, hard, hell
    question_title: str = ""
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    exp_reward: int = 50
    # Backward compatibility
    skill_id: Optional[str] = None
    difficulty: Optional[int] = 1


class SubmitAnswerRequest(BaseModel):
    student_id: str
    question_id: str
    selected_option: str
    response_time_sec: float = 0.0
    difficulty_tier: Optional[str] = "normal"


class SubmitAnswerResponse(BaseModel):
    is_correct: bool
    correct_answer: str
    explanation: str
    stage_id: str
    new_mastery: float
    status_changed: str  # e.g. 'cleared', 'in_progress', 'failed'
    exp_gained: int = 0
    stars_earned: int = 0
    next_stage_unlocked: Optional[str] = None
    recommended_message: Optional[str] = None
    # Backward compatibility
    skill_id: Optional[str] = None
