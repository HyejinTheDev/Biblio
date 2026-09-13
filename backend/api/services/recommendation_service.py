from typing import Dict, Any, Optional
from core.knowledge_graph.graph_query import KnowledgeGraphQuery
from api.db.repository.question_repo import QuestionRepository


class RecommendationService:
    def __init__(self, graph_query: KnowledgeGraphQuery):
        self.graph_query = graph_query
        self.question_repo = QuestionRepository()

    def recommend_next_step(self, mastery_map: Dict[str, float]) -> Dict[str, Any]:
        """
        Determines the next best skill for the student to practice.
        1. Check for ready-to-learn skills.
        2. If none, look for lowest mastered skill and its prerequisite.
        """
        ready_skills = self.graph_query.get_ready_to_learn_skills(mastery_map)

        if ready_skills:
            target_skill = ready_skills[0]
            questions = self.question_repo.get_by_skill(target_skill)
            return {
                "target_skill_id": target_skill,
                "reason": f"Bạn đã hoàn thành đủ điều kiện tiên quyết. Hãy học tiếp kỹ năng: {target_skill}.",
                "available_questions": [q["id"] for q in questions]
            }

        # If all ready skills mastered or none available, find any weak skill
        weak_skills = [s for s, m in mastery_map.items() if m < 0.7]
        if weak_skills:
            weak_skills.sort(key=lambda s: mastery_map.get(s, 0.0))
            weak_skill = weak_skills[0]
            root_cause = self.graph_query.find_root_weakness(weak_skill, mastery_map)
            target = root_cause if root_cause else weak_skill
            return {
                "target_skill_id": target,
                "reason": f"Bạn đang yếu ở {weak_skill}, hệ thống đề xuất củng cố gốc rễ: {target}.",
                "available_questions": [q["id"] for q in self.question_repo.get_by_skill(target)]
            }

        return {
            "target_skill_id": None,
            "reason": "Chúc mừng! Bạn đã nắm vững toàn bộ kiến thức trong chương trình!",
            "available_questions": []
        }
