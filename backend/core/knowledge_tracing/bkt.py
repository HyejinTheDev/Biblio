"""
Bayesian Knowledge Tracing (BKT) Implementation.
Standard 4-parameter BKT model:
- p_l0: Initial probability of mastery P(L_0)
- p_transit: Probability of transitioning from unmastered to mastered state P(T)
- p_guess: Probability of guessing correctly given unmastered state P(G)
- p_slip: Probability of slipping (answering incorrectly) given mastered state P(S)
"""


class BKTModel:
    def __init__(self, p_l0: float = 0.1, p_transit: float = 0.2, p_guess: float = 0.2, p_slip: float = 0.1):
        self.p_l0 = p_l0
        self.p_transit = p_transit
        self.p_guess = p_guess
        self.p_slip = p_slip

    def predict_correct(self, p_l: float) -> float:
        """P(C) = P(L) * (1 - P(S)) + (1 - P(L)) * P(G)"""
        return p_l * (1.0 - self.p_slip) + (1.0 - p_l) * self.p_guess

    def update(self, p_l: float, is_correct: bool) -> float:
        """
        Bayesian update step followed by transit step:
        1. Posterior calculation:
           If correct:
             P(L|C) = (P(L) * (1 - P(S))) / P(C)
           If incorrect:
             P(L|incorrect) = (P(L) * P(S)) / (1 - P(C))
        2. Transit step:
           P(L_{t+1}) = P(L|Obs) + (1 - P(L|Obs)) * P(T)
        """
        p_c = self.predict_correct(p_l)

        if is_correct:
            p_posterior = (p_l * (1.0 - self.p_slip)) / max(p_c, 1e-9)
        else:
            p_posterior = (p_l * self.p_slip) / max(1.0 - p_c, 1e-9)

        # Clip posterior to [0, 1]
        p_posterior = min(max(p_posterior, 0.0), 1.0)

        # Transition step
        p_next = p_posterior + (1.0 - p_posterior) * self.p_transit
        return min(max(p_next, 0.0), 1.0)
