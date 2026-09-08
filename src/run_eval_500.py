"""Lead-1/3/5, TextRank, Oracle-3 trên 500 bài. ViT5 nếu có results/preds_500.json."""

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from evaluate import normalize, rouge_mean, rouge_one
from extractive import lead_n, textrank
from oracle import oracle_n
from preprocess import load_docs


def main():
    docs = load_docs(ROOT / "data" / "test_500", ROOT / "data" / "test_ids_500.txt", limit=500)
    pred_path = ROOT / "results" / "preds_500.json"
    pred_map = {}
    if pred_path.exists():
        pred_map = {r["id"]: r["pred"] for r in json.loads(pred_path.read_text(encoding="utf-8"))}

    systems = ["lead1", "lead3", "lead5", "textrank", "oracle3"]
    if pred_map:
        systems.append("vit5")

    pairs = {k: [] for k in systems}
    rows = []
    max_sents = 0
    for i, doc in enumerate(docs, 1):
        sents = doc["sentences"]
        max_sents = max(max_sents, len(sents))
        gold = doc["abstract"]
        preds = {
            "lead1": lead_n(sents, 1),
            "lead3": lead_n(sents, 3),
            "lead5": lead_n(sents, 5),
            "textrank": textrank(sents, 3),
            "oracle3": oracle_n(sents, gold, 3),
        }
        if pred_map:
            preds["vit5"] = pred_map.get(doc["id"], "")
        row = {"id": doc["id"], "n_sents": len(sents), "body_words": len(doc["body"].split())}
        g = normalize(gold)
        for name, pred in preds.items():
            s = rouge_one(normalize(pred), g)
            pairs[name].append((normalize(pred), g))
            row[f"{name}_r1"] = round(s["rouge1"], 4)
            row[f"{name}_r2"] = round(s["rouge2"], 4)
            row[f"{name}_rL"] = round(s["rougeL"], 4)
        rows.append(row)
        if i % 50 == 0:
            print("done", i, "max_sents", max_sents, flush=True)

    csv_path = ROOT / "results" / "scores_500.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    labels = {
        "lead1": "Lead-1",
        "lead3": "Lead-3",
        "lead5": "Lead-5",
        "textrank": "TextRank-3",
        "oracle3": "Oracle-3",
        "vit5": "ViT5",
    }
    lines = [
        "ROUGE F1, n=500, id 000001–000500, '_' → space.",
        f"max sentences/doc = {max_sents}",
        "",
    ]
    for name in systems:
        m = rouge_mean(pairs[name])
        lines.append(
            f"{labels[name]:12} rouge1={m['rouge1']:.4f}  rouge2={m['rouge2']:.4f}  rougeL={m['rougeL']:.4f}  n={m['n']}"
        )
    if not pred_map:
        lines.append("")
        lines.append("ViT5: chưa có results/preds_500.json — chạy notebooks/kaggle_abstractive_500.ipynb")
    mean_path = ROOT / "results" / "scores_500_mean.txt"
    mean_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    print("wrote", csv_path)
    print("wrote", mean_path)


if __name__ == "__main__":
    main()
