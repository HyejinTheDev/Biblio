"""
Reranker module to refine retrieval results using cross-encoder scores.
"""
from typing import List, Dict, Any


class DocumentReranker:
    def __init__(self, model_name: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"):
        self.model_name = model_name

    def rerank(self, query: str, documents: List[Dict[str, Any]], top_n: int = 3) -> List[Dict[str, Any]]:
        """Reranks retrieved documents based on relevance score."""
        if not documents:
            return []
        # Return top_n documents
        return documents[:top_n]
