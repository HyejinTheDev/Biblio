from typing import Dict, Any, Optional
from core.agent.orchestrator import AgentOrchestrator
from core.agent.tools import AgentTools


class AgentService:
    def __init__(self, agent_tools: Optional[AgentTools] = None):
        self.tools = agent_tools or AgentTools()
        self.orchestrator = AgentOrchestrator(self.tools)

    async def get_adaptive_advice(
        self,
        student_id: str,
        skill_id: str,
        is_correct: bool,
        new_mastery: float,
        root_weakness_id: Optional[str] = None
    ) -> str:
        return await self.orchestrator.generate_recommendation_advice(
            student_id=student_id,
            current_skill_id=skill_id,
            is_correct=is_correct,
            mastery_prob=new_mastery,
            root_weakness_skill_id=root_weakness_id
        )
