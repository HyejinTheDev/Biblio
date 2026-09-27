import os
import json
from typing import Dict, Any, Optional, List
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

        # Path to AI VinUni Knowledge Graph JSON
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
        self.graph_file = os.path.join(base_dir, "data", "subjects", "ai_vinuni", "knowledge_graph.json")

    def _load_graph_data(self) -> Dict[str, Any]:
        if os.path.exists(self.graph_file):
            with open(self.graph_file, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"subject": "ai_vinuni", "title": "AI Thực Chiến VinUni", "phases": [], "skills": []}

    async def get_student_state(self, student_id: str) -> Dict[str, Any]:
        student = await self.student_repo.get_or_create_student(student_id, f"Chiến Binh AI #{student_id[-4:]}")
        masteries = await self.student_repo.get_all_skill_masteries(student_id)

        # Flat mastery map for backward compatibility
        flat_map = {k: v["mastery_prob"] for k, v in masteries.items()}
        avg_mastery = sum(flat_map.values()) / max(1, len(flat_map)) if flat_map else 0.0

        return {
            "student_id": student.id,
            "name": student.name,
            "level": student.level,
            "exp": student.exp,
            "next_level_exp": student.level * 500,
            "streak_days": student.streak_days,
            "total_stars": student.total_stars,
            "mastery_map": flat_map,
            "overall_progress": round(avg_mastery * 100, 1),
        }

    async def get_adventure_map(self, student_id: str) -> Dict[str, Any]:
        student = await self.student_repo.get_or_create_student(student_id, f"Chiến Binh AI #{student_id[-4:]}")
        masteries = await self.student_repo.get_all_skill_masteries(student_id)
        graph_data = self._load_graph_data()

        # Set of cleared stages (stars_earned >= 1 or mastery_prob >= 0.70)
        cleared_stage_ids = set()
        for s_id, record in masteries.items():
            if record.get("stars_earned", 0) >= 1 or record.get("mastery_prob", 0.0) >= 0.70:
                cleared_stage_ids.add(s_id)

        phases_output = []
        all_skills = graph_data.get("skills", [])
        total_stages = len(all_skills)
        total_cleared = 0

        # Group by phase
        phases_def = graph_data.get("phases", [])
        for phase in phases_def:
            p_id = phase["id"]
            phase_skills = [s for s in all_skills if s.get("phase_id") == p_id]
            stage_nodes = []
            phase_cleared = 0

            for skill in phase_skills:
                s_id = skill["id"]
                prereqs = skill.get("prerequisites", [])
                record = masteries.get(s_id, {"mastery_prob": 0.0, "stars_earned": 0, "highest_difficulty": "none"})

                # Determine status
                is_cleared = s_id in cleared_stage_ids
                if is_cleared:
                    status = "cleared"
                    phase_cleared += 1
                    total_cleared += 1
                elif s_id == "STAGE_1_1":
                    # First stage always active
                    status = "active"
                else:
                    # Check prerequisites
                    all_prereqs_met = all(p in cleared_stage_ids for p in prereqs) if prereqs else False
                    status = "active" if all_prereqs_met else "locked"

                stage_nodes.append({
                    "id": s_id,
                    "stage_code": skill.get("stage_code", ""),
                    "phase_id": p_id,
                    "name": skill.get("name", ""),
                    "description": skill.get("description", ""),
                    "prerequisites": prereqs,
                    "is_boss": skill.get("is_boss", False),
                    "mastery_prob": record.get("mastery_prob", 0.0),
                    "stars_earned": record.get("stars_earned", 0),
                    "status": status,
                    "highest_difficulty": record.get("highest_difficulty", "none"),
                })

            phase_progress = round((phase_cleared / max(1, len(phase_skills))) * 100, 1)
            phases_output.append({
                "id": p_id,
                "number": phase.get("number", 1),
                "title": phase.get("title", ""),
                "description": phase.get("description", ""),
                "stages": stage_nodes,
                "phase_progress": phase_progress,
            })

        overall_progress = round((total_cleared / max(1, total_stages)) * 100, 1)

        return {
            "subject": graph_data.get("subject", "ai_vinuni"),
            "title": graph_data.get("title", "AI Thực Chiến VinUni"),
            "description": graph_data.get("description", ""),
            "gamer_profile": {
                "student_id": student.id,
                "name": student.name,
                "level": student.level,
                "exp": student.exp,
                "next_level_exp": student.level * 500,
                "streak_days": student.streak_days,
                "total_stars": student.total_stars,
            },
            "phases": phases_output,
            "overall_progress": overall_progress,
        }

    async def process_answer(
        self,
        student_id: str,
        question_id: str,
        selected_option: str,
        response_time_sec: float = 0.0,
        difficulty_tier: str = "normal"
    ) -> Dict[str, Any]:
        # 1. Fetch question info
        question = self.question_repo.get_by_id(question_id)
        if not question:
            raise ValueError(f"Question {question_id} not found.")

        stage_id = question.get("stage_id") or question.get("skill_id")
        correct_answer = str(question["correct_answer"]).strip().upper()
        is_correct = (selected_option.strip().upper() == correct_answer)

        # 2. Record response in DB
        await self.student_repo.record_response(
            student_id=student_id,
            question_id=question_id,
            skill_id=stage_id,
            selected_option=selected_option,
            is_correct=is_correct,
            response_time_sec=response_time_sec
        )

        # 3. Update Mastery using BKT
        masteries = await self.student_repo.get_all_skill_masteries(student_id)
        current_record = masteries.get(stage_id, {"mastery_prob": self.bkt.p_l0, "stars_earned": 0})
        current_p_l = current_record.get("mastery_prob", self.bkt.p_l0)
        new_p_l = self.bkt.update(current_p_l, is_correct)

        # 4. RPG Rewards calculation
        tier_star_map = {"normal": 1, "hard": 2, "hell": 3}
        earned_stars = tier_star_map.get(difficulty_tier, 1) if is_correct else 0
        base_exp = int(question.get("exp_reward", 50))
        earned_exp = base_exp if is_correct else 10

        # Only add new stars if higher than previously earned
        old_stars = current_record.get("stars_earned", 0)
        stars_delta = max(0, earned_stars - old_stars)

        if is_correct:
            await self.student_repo.add_exp_and_stars(student_id, earned_exp, stars_delta)
            await self.student_repo.update_skill_mastery(
                student_id=student_id,
                skill_id=stage_id,
                mastery_prob=new_p_l,
                stars=earned_stars,
                difficulty=difficulty_tier
            )
            status_changed = "cleared"
            msg = f"Xuất sắc! Bạn đã vượt ải cấp độ {difficulty_tier.upper()} thành công (+{earned_exp} EXP)!"
        else:
            await self.student_repo.add_exp_and_stars(student_id, earned_exp, 0)
            await self.student_repo.update_skill_mastery(
                student_id=student_id,
                skill_id=stage_id,
                mastery_prob=new_p_l
            )
            status_changed = "failed"
            msg = "Chưa chính xác! Nhận 10 EXP an ủi. Hãy đọc kỹ phần giải thích chi tiết để phục thù nhé!"

        return {
            "is_correct": is_correct,
            "correct_answer": correct_answer,
            "explanation": question.get("explanation", ""),
            "stage_id": stage_id,
            "skill_id": stage_id,
            "new_mastery": round(new_p_l, 3),
            "status_changed": status_changed,
            "exp_gained": earned_exp,
            "stars_earned": earned_stars,
            "recommended_message": msg,
        }
