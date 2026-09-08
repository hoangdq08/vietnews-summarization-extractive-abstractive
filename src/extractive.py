"""Lead-3 và TextRank (TF-IDF + cosine + PageRank)."""

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer


def lead_n(sentences, n=3):
    if not sentences:
        return ""
    return " ".join(sentences[:n])


def textrank(sentences, n=3, damping=0.85, iters=40):
    if not sentences:
        return ""
    if len(sentences) <= n:
        return " ".join(sentences)

    vec = TfidfVectorizer()
    x = vec.fit_transform(sentences)
    sim = (x * x.T).toarray()
    np.fill_diagonal(sim, 0.0)
    row_sum = sim.sum(axis=1, keepdims=True)
    row_sum[row_sum == 0] = 1.0
    trans = sim / row_sum

    scores = np.ones(len(sentences)) / len(sentences)
    teleport = (1.0 - damping) / len(sentences)
    for _ in range(iters):
        scores = damping * trans.T.dot(scores) + teleport

    top = sorted(scores.argsort()[::-1][:n])
    return " ".join(sentences[i] for i in top)
