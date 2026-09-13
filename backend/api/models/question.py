from pydantic import BaseModel
from typing import Optional, List


class QuestionDetail(BaseModel):
    id: str
    skill_id: str
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    difficulty: int = 1


class SubmitAnswerRequest(BaseModel):
    student_id: str
    question_id: str
    selected_option: str
    response_time_sec: float = 0.0


class SubmitAnswerResponse(BaseModel):
    is_correct: bool
    correct_answer: str
    explanation: str
    skill_id: str
    new_mastery: float
    status_changed: str  # e.g. 'weak', 'average', 'mastered'
    recommended_next_skill_id: Optional[str] = None
    recommended_message: Optional[str] = None
