import networkx as nx
from typing import Dict, List, Optional, Tuple


class KnowledgeGraphQuery:
    def __init__(self, graph: nx.DiGraph, mastery_threshold: float = 0.7):
        self.graph = graph
        self.mastery_threshold = mastery_threshold

    def get_prerequisites(self, skill_id: str) -> List[str]:
        """Returns direct prerequisite skill IDs."""
        if not self.graph.has_node(skill_id):
            return []
        return list(self.graph.predecessors(skill_id))

    def find_root_weakness(self, skill_id: str, mastery_map: Dict[str, float]) -> Optional[str]:
        """
        If a student is struggling with skill_id, traverses ancestor nodes
        to find unmastered prerequisite skills that are causing the weakness.
        """
        ancestors = nx.ancestors(self.graph, skill_id)
        weak_ancestors = [
            anc for anc in ancestors
            if mastery_map.get(anc, 0.0) < self.mastery_threshold
        ]
        if not weak_ancestors:
            return None
        # Return ancestor with lowest mastery
        weak_ancestors.sort(key=lambda s: mastery_map.get(s, 0.0))
        return weak_ancestors[0]

    def get_ready_to_learn_skills(self, mastery_map: Dict[str, float]) -> List[str]:
        """
        Returns skills that are not yet mastered, but all their prerequisites ARE mastered.
        """
        ready_skills = []
        for node in nx.topological_sort(self.graph):
            prob = mastery_map.get(node, 0.0)
            if prob >= self.mastery_threshold:
                continue

            prereqs = list(self.graph.predecessors(node))
            all_prereqs_met = all(
                mastery_map.get(p, 0.0) >= self.mastery_threshold for p in prereqs
            )
            if all_prereqs_met:
                ready_skills.append(node)

        return ready_skills
