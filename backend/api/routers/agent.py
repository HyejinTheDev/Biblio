from fastapi import APIRouter
from pydantic import BaseModel
from api.services.agent_service import AgentService

router = APIRouter(prefix="/agent", tags=["agent"])


class AgentAdviceRequest(BaseModel):
    student_id: str
    skill_id: str
    is_correct: bool
    new_mastery: float
    root_weakness_id: str = None


class AgentAdviceResponse(BaseModel):
    advice: str


@router.post("/recommend", response_model=AgentAdviceResponse)
async def get_agent_recommendation(payload: AgentAdviceRequest):
    agent_svc = AgentService()
    advice = await agent_svc.get_adaptive_advice(
        student_id=payload.student_id,
        skill_id=payload.skill_id,
        is_correct=payload.is_correct,
        new_mastery=payload.new_mastery,
        root_weakness_id=payload.root_weakness_id,
    )
    return AgentAdviceResponse(advice=advice)
