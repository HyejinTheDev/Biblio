"""
Document ingestion pipeline for RAG: chunking text and embedding into vector store (Qdrant).
"""
from typing import List, Dict, Any
import uuid


class DocumentIngestion:
    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_text(self, text: str, metadata: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """Splits long text into overlapping chunks."""
        chunks = []
        words = text.split()
        metadata = metadata or {}

        step = self.chunk_size - self.chunk_overlap
        for i in range(0, len(words), max(1, step)):
            chunk_words = words[i: i + self.chunk_size]
            chunk_str = " ".join(chunk_words)
            if chunk_str:
                chunks.append({
                    "id": str(uuid.uuid4()),
                    "text": chunk_str,
                    "metadata": metadata
                })
        return chunks
