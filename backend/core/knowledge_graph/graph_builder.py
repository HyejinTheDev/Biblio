import json
import os
import networkx as nx
from typing import Dict, Any


class KnowledgeGraphBuilder:
    @staticmethod
    def build_from_json(json_path: str) -> nx.DiGraph:
        """
        Builds a directed acyclic graph (DAG) where an edge (A, B) means
        skill A is a prerequisite for skill B.
        """
        if not os.path.exists(json_path):
            raise FileNotFoundError(f"Graph file not found at: {json_path}")

        with open(json_path, "r", encoding="utf-8") as f:
            data: Dict[str, Any] = json.load(f)

        G = nx.DiGraph()
        G.graph["subject"] = data.get("subject", "general")
        G.graph["title"] = data.get("title", "")

        for skill in data.get("skills", []):
            skill_id = skill["id"]
            G.add_node(
                skill_id,
                name=skill.get("name", ""),
                description=skill.get("description", ""),
                difficulty=skill.get("difficulty", 1)
            )

        for skill in data.get("skills", []):
            skill_id = skill["id"]
            for prereq_id in skill.get("prerequisites", []):
                if G.has_node(prereq_id):
                    G.add_edge(prereq_id, skill_id)

        return G
