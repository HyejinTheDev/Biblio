"""
Deep Knowledge Tracing (DKT) - Piech et al. 2015.
Uses LSTM/RNN to model the sequence of student exercise responses over time.
"""
import torch
import torch.nn as nn
from typing import Tuple


class DKTModel(nn.Module):
    def __init__(self, num_skills: int, hidden_dim: int = 128, num_layers: int = 1):
        super(DKTModel, self).__init__()
        self.num_skills = num_skills
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers

        # Input is one-hot representation of (skill, correctness), size = 2 * num_skills
        self.input_dim = 2 * num_skills
        self.lstm = nn.LSTM(
            input_size=self.input_dim,
            hidden_size=hidden_dim,
            num_layers=num_layers,
            batch_first=True
        )
        self.fc = nn.Linear(hidden_dim, num_skills)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x: torch.Tensor, hidden: Tuple[torch.Tensor, torch.Tensor] = None) -> Tuple[torch.Tensor, Tuple[torch.Tensor, torch.Tensor]]:
        """
        x: Tensor of shape (batch_size, seq_len, input_dim)
        Returns:
            preds: Tensor of shape (batch_size, seq_len, num_skills) with predicted mastery prob
            hidden: next hidden state
        """
        out, hidden = self.lstm(x, hidden)
        logits = self.fc(out)
        preds = self.sigmoid(logits)
        return preds, hidden
