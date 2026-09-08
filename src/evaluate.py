"""ROUGE F1. Caller nên gọi normalize() trước khi so extractive với ViT5."""

from rouge_score.rouge_scorer import RougeScorer
from rouge_score.tokenizers import Tokenizer


class WhitespaceTokenizer(Tokenizer):
    def tokenize(self, text):
        return text.split()


def normalize(text):
    """Gold/extractive dùng dấu '_'; ViT5 thì không. Gỡ '_' trước ROUGE."""
    return (text or "").replace("_", " ")


def rouge_one(pred, ref):
    scorer = RougeScorer(
        ["rouge1", "rouge2", "rougeL"],
        use_stemmer=False,
        tokenizer=WhitespaceTokenizer(),
    )
    scores = scorer.score(ref, pred)
    return {
        "rouge1": scores["rouge1"].fmeasure,
        "rouge2": scores["rouge2"].fmeasure,
        "rougeL": scores["rougeL"].fmeasure,
    }


def rouge_mean(pairs):
    if not pairs:
        return {"rouge1": 0.0, "rouge2": 0.0, "rougeL": 0.0, "n": 0}
    acc = {"rouge1": 0.0, "rouge2": 0.0, "rougeL": 0.0}
    for pred, ref in pairs:
        s = rouge_one(pred, ref)
        for k in acc:
            acc[k] += s[k]
    n = len(pairs)
    return {k: acc[k] / n for k in acc} | {"n": n}
