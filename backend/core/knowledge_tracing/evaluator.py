"""
Model evaluation metrics for Knowledge Tracing:
- AUC (Area Under ROC Curve)
- RMSE (Root Mean Squared Error)
- Accuracy
"""
import numpy as np
from sklearn.metrics import roc_auc_score, mean_squared_error, accuracy_score
from typing import Dict, List


class KnowledgeTracingEvaluator:
    @staticmethod
    def evaluate(y_true: List[int], y_pred_prob: List[float]) -> Dict[str, float]:
        """
        y_true: Binary ground truth labels (0 = incorrect, 1 = correct)
        y_pred_prob: Predicted probability of answering correctly [0, 1]
        """
        y_true_arr = np.array(y_true)
        y_pred_arr = np.array(y_pred_prob)

        # In case test batch only contains a single class
        if len(np.unique(y_true_arr)) > 1:
            auc = float(roc_auc_score(y_true_arr, y_pred_arr))
        else:
            auc = 0.5

        rmse = float(np.sqrt(mean_squared_error(y_true_arr, y_pred_arr)))
        y_pred_binary = (y_pred_arr >= 0.5).astype(int)
        acc = float(accuracy_score(y_true_arr, y_pred_binary))

        return {
            "auc": round(auc, 4),
            "rmse": round(rmse, 4),
            "accuracy": round(acc, 4),
        }
