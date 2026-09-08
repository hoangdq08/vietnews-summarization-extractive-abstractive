"""Oracle extractive: chọn n câu tối đa ROUGE-1 F1 so với gold."""

from itertools import combinations
from math import comb

from evaluate import normalize, rouge_one


def oracle_n(sentences, gold, n=3, max_comb=30000):
    if not sentences:
        return ""
    if len(sentences) <= n:
        return " ".join(sentences)
    gold_n = normalize(gold)
    n_s = len(sentences)
    if comb(n_s, n) > max_comb:
        return _greedy(sentences, gold_n, n)
    best_score = -1.0
    best_idx = None
    for idx in combinations(range(n_s), n):
        pred = normalize(" ".join(sentences[i] for i in idx))
        score = rouge_one(pred, gold_n)["rouge1"]
        if score > best_score:
            best_score = score
            best_idx = idx
    return " ".join(sentences[i] for i in best_idx)


def _greedy(sentences, gold_n, n):
    chosen = []
    remain = list(range(len(sentences)))
    for _ in range(n):
        best_score = -1.0
        best_i = remain[0]
        for i in remain:
            pred = normalize(" ".join(sentences[j] for j in sorted(chosen + [i])))
            score = rouge_one(pred, gold_n)["rouge1"]
            if score > best_score:
                best_score = score
                best_i = i
        chosen.append(best_i)
        remain.remove(best_i)
    return " ".join(sentences[i] for i in sorted(chosen))
