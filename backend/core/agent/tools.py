"""
Tools callable by the Agent during orchestration:
- query_knowledge_graph
- retrieve_textbook_explanations
- fetch_practice_questions
"""
from typing import Dict, Any, List


class AgentTools:
    def __init__(self, graph_query=None, retriever=None, question_repo=None):
        self.graph_query = graph_query
        self.retriever = retriever
        self.question_repo = question_repo

    def inspect_skill_prerequisites(self, skill_id: str) -> List[str]:
        """Returns list of prerequisite skills."""
        if not self.graph_query:
            return []
        return self.graph_query.get_prerequisites(skill_id)

    def retrieve_explanation(self, query: str) -> List[Dict[str, Any]]:
        """Retrieves textbook explanation via RAG."""
        if not self.retriever:
            return []
        return self.retriever.retrieve(query)

    def get_practice_question(self, skill_id: str) -> List[Dict[str, Any]]:
        """Pulls next questions for targeted practice."""
        if not self.question_repo:
            return []
        return self.question_repo.get_by_skill(skill_id)
