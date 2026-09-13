"""
Agent Orchestrator:
Coordinates ReAct cycle or State Machine between tools, knowledge tracing state, and student interactions.
"""
from typing import Dict, Any, Optional
from core.agent.tools import AgentTools
from core.agent.prompts import STUDENT_TUTOR_SYSTEM_PROMPT


class AgentOrchestrator:
    def __init__(self, tools: AgentTools):
        self.tools = tools

    async def generate_recommendation_advice(
        self,
        student_id: str,
        current_skill_id: str,
        is_correct: bool,
        mastery_prob: float,
        root_weakness_skill_id: Optional[str] = None
    ) -> str:
        """
        Orchestrates advice for the student after an exercise attempt.
        """
        if is_correct:
            if mastery_prob >= 0.8:
                return "Tuyệt vời! Bạn đã nắm rất vững kỹ năng này. Hãy thử sức với bài toán nâng cao tiếp theo nhé!"
            return "Rất tốt! Bạn đã trả lời đúng, hãy luyện thêm 1-2 câu để thành thạo hoàn toàn."
        else:
            if root_weakness_skill_id:
                return f"Đừng lo lắng! Có vẻ bạn đang gặp khó khăn do chưa nắm chắc phần kiến thức gốc '{root_weakness_skill_id}'. Chúng ta hãy cùng ôn lại phần này trước nhé!"
            return "Câu trả lời chưa chính xác. Bạn hãy xem kỹ lại phần giải thích chi tiết bên dưới nhé!"
