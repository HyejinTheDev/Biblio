import os
import pandas as pd
from typing import List, Optional, Dict


class QuestionRepository:
    """Accesses question bank from CSV or persistent storage."""

    def __init__(self, data_path: Optional[str] = None):
        if not data_path:
            # Default to math_grade8 question bank
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
            self.data_path = os.path.join(base_dir, "data", "subjects", "math_grade8", "question_bank.csv")
        else:
            self.data_path = data_path
        self._df: Optional[pd.DataFrame] = None

    def _load_data(self) -> pd.DataFrame:
        if self._df is None:
            if os.path.exists(self.data_path):
                self._df = pd.read_csv(self.data_path)
            else:
                self._df = pd.DataFrame(columns=[
                    "id", "skill_id", "question_text", "option_a", "option_b",
                    "option_c", "option_d", "correct_answer", "difficulty", "explanation"
                ])
        return self._df

    def get_by_id(self, question_id: str) -> Optional[Dict]:
        df = self._load_data()
        matched = df[df["id"] == question_id]
        if not matched.empty:
            return matched.iloc[0].to_dict()
        return None

    def get_by_skill(self, skill_id: str) -> List[Dict]:
        df = self._load_data()
        matched = df[df["skill_id"] == skill_id]
        return matched.to_dict(orient="records")
