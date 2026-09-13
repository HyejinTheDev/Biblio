import networkx as nx
from core.knowledge_graph.graph_query import KnowledgeGraphQuery


def test_knowledge_graph_query_ready_skills():
    G = nx.DiGraph()
    # Topology: A -> B -> C
    G.add_edge("SKILL_A", "SKILL_B")
    G.add_edge("SKILL_B", "SKILL_C")

    # Case 1: Student has no mastered skills -> SKILL_A is ready
    mastery_empty = {"SKILL_A": 0.1, "SKILL_B": 0.0, "SKILL_C": 0.0}
    query = KnowledgeGraphQuery(G, mastery_threshold=0.7)
    ready = query.get_ready_to_learn_skills(mastery_empty)
    assert ready == ["SKILL_A"]

    # Case 2: Student has mastered A -> SKILL_B is ready
    mastery_a = {"SKILL_A": 0.85, "SKILL_B": 0.2, "SKILL_C": 0.0}
    ready = query.get_ready_to_learn_skills(mastery_a)
    assert ready == ["SKILL_B"]


def test_find_root_weakness():
    G = nx.DiGraph()
    # Topology: Fraction -> LinearEq
    G.add_edge("SKILL_FRAC", "SKILL_EQ1")

    # Student fails EQ1 and also weak in FRAC
    mastery = {"SKILL_FRAC": 0.3, "SKILL_EQ1": 0.2}
    query = KnowledgeGraphQuery(G, mastery_threshold=0.7)
    root = query.find_root_weakness("SKILL_EQ1", mastery)
    assert root == "SKILL_FRAC"
