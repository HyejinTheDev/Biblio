import pytest
from core.knowledge_tracing.bkt import BKTModel
from core.knowledge_tracing.evaluator import KnowledgeTracingEvaluator


def test_bkt_update_on_correct():
    model = BKTModel(p_l0=0.2, p_transit=0.1, p_guess=0.2, p_slip=0.1)
    p_initial = 0.2
    p_next = model.update(p_initial, is_correct=True)
    # After answering correctly, probability of mastery must increase
    assert p_next > p_initial


def test_bkt_update_on_incorrect():
    model = BKTModel(p_l0=0.5, p_transit=0.1, p_guess=0.2, p_slip=0.1)
    p_initial = 0.5
    p_next = model.update(p_initial, is_correct=False)
    # After answering incorrectly, probability of mastery should drop or stay low
    assert p_next < p_initial


def test_evaluator_metrics():
    y_true = [1, 0, 1, 1, 0, 0, 1]
    y_pred = [0.8, 0.2, 0.9, 0.7, 0.3, 0.4, 0.85]
    metrics = KnowledgeTracingEvaluator.evaluate(y_true, y_pred)
    assert "auc" in metrics
    assert "rmse" in metrics
    assert "accuracy" in metrics
    assert metrics["auc"] > 0.8
