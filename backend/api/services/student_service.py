from typing import Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from api.db.repository.student_repo import StudentRepository
from api.db.repository.question_repo import QuestionRepository
from core.knowledge_tracing.bkt import BKTModel
from core.knowledge_graph.graph_query import KnowledgeGraphQuery


class StudentService:
    def __init__(self, session: AsyncSession, graph_query: Optional[KnowledgeGraphQuery] = None):
        self.session = session
        self.student_repo = StudentRepository(session)
        self.question_repo = QuestionRepository()
        self.graph_query = graph_query
        self.bkt = BKTModel()

    async def get_student_state(self, student_id: str) -> Dict[str, Any]:
        student = await self.student_repo.get_or_create_student(student_id, f"Học sinh {student_id}")
        masteries = await self.student_repo.get_all_skill_masteries(student_id)

        # Calculate overall progress
        total_skills = len(masteries) if masteries else 1
        avg_mastery = sum(masteries.values()) / max(1, total_skills)

        return {
            "student_id": student.id,
            "name": student.name,
            "mastery_map": masteries,
            "overall_progress": round(avg_mastery * 100, 1),
        }

    async def process_answer(
        self,
        student_id: str,
        question_id: str,
        selected_option: str,
        response_time_sec: float = 0.0
    ) -> Dict[str, Any]:
        # 1. Fetch question info
        question = self.question_repo.get_by_id(question_id)
        if not question:
            raise ValueError(f"Question {question_id} not found.")

        skill_id = question["skill_id"]
        correct_answer = str(question["correct_answer"]).strip().upper()
        is_correct = (selected_option.strip().upper() == correct_answer)

        # 2. Record response in DB
        await self.student_repo.record_response(
            student_id=student_id,
            question_id=question_id,
            skill_id=skill_id,
            selected_option=selected_option,
            is_correct=is_correct,
            response_time_sec=response_time_sec
        )

        # 3. Update Mastery using BKT
        masteries = await self.student_repo.get_all_skill_masteries(student_id)
        current_p_l = masteries.get(skill_id, self.bkt.p_l0)
        new_p_l = self.bkt.update(current_p_l, is_correct)
        await self.student_repo.update_skill_mastery(student_id, skill_id, new_p_l)

        # 4. Status label
        if new_p_l >= 0.75:
            status = "mastered"
        elif new_p_l >= 0.45:
            status = "average"
        else:
            status = "weak"

        return {
            "is_correct": is_correct,
            "correct_answer": correct_answer,
            "explanation": question.get("explanation", ""),
            "skill_id": skill_id,
            "new_mastery": round(new_p_l, 3),
            "status_changed": status
        }
