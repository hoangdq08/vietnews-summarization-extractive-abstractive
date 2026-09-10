"""Chấm ROUGE: Lead / TextRank / ViT5. n=500 thêm Lead-1/5 và Oracle-3."""

from __future__ import annotations

import argparse
import csv
import json

from evaluate import normalize, rouge_mean, rouge_one
from extractive import lead_n, textrank
from oracle import oracle_n
from paths import RESULTS, pred_file
from preprocess import load_docs

LABELS = {
    "lead1": "Lead-1",
    "lead3": "Lead-3",
    "lead5": "Lead-5",
    "textrank": "TextRank",
    "oracle3": "Oracle-3",
    "vit5": "ViT5",
}


def _preds_for(doc, systems, pred_map):
    sents, gold = doc["sentences"], doc["abstract"]
    out = {}
    for name in systems:
        if name.startswith("lead"):
            out[name] = lead_n(sents, int(name[4:]))
        elif name == "textrank":
            out[name] = textrank(sents, 3)
        elif name == "oracle3":
            out[name] = oracle_n(sents, gold, 3)
        elif name == "vit5":
            out[name] = pred_map.get(doc["id"], "")
    return out


def _load_pred_map(n: int) -> dict:
    path = pred_file(n)
    if not path.exists():
        return {}
    return {r["id"]: r["pred"] for r in json.loads(path.read_text(encoding="utf-8"))}


def run(n: int) -> None:
    docs = load_docs(n, fetch=True)
    pred_map = _load_pred_map(n)
    if n == 100 and not pred_map:
        raise SystemExit("thiếu results/preds.json — chạy notebooks/kaggle_abstractive.ipynb")

    systems = ["lead3", "textrank"]
    if n >= 500:
        systems = ["lead1", "lead3", "lead5", "textrank", "oracle3"]
    if pred_map:
        systems.append("vit5")

    pairs = {k: [] for k in systems}
    rows = []
    max_sents = 0
    for i, doc in enumerate(docs, 1):
        max_sents = max(max_sents, len(doc["sentences"]))
        gold_n = normalize(doc["abstract"])
        row = {
            "id": doc["id"],
            "n_sents": len(doc["sentences"]),
            "body_words": len(doc["body"].split()),
        }
        for name, pred in _preds_for(doc, systems, pred_map).items():
            pred_n = normalize(pred)
            s = rouge_one(pred_n, gold_n)
            pairs[name].append((pred_n, gold_n))
            row[f"{name}_r1"] = round(s["rouge1"], 4)
            row[f"{name}_r2"] = round(s["rouge2"], 4)
            row[f"{name}_rL"] = round(s["rougeL"], 4)
        rows.append(row)
        if n >= 500 and i % 50 == 0:
            print("done", i, "max_sents", max_sents, flush=True)

    csv_path = RESULTS / ("scores.csv" if n == 100 else f"scores_{n}.csv")
    mean_path = RESULTS / ("scores_mean.txt" if n == 100 else f"scores_{n}_mean.txt")
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    lines = [
        f"ROUGE F1, n={n}, id 000001–{n:06d}, '_' → space.",
        f"max sentences/doc = {max_sents}",
        "",
    ]
    for name in systems:
        m = rouge_mean(pairs[name])
        lines.append(
            f"{LABELS[name]:12} rouge1={m['rouge1']:.4f}  "
            f"rouge2={m['rouge2']:.4f}  rougeL={m['rougeL']:.4f}  n={m['n']}"
        )
    if "vit5" not in systems:
        lines += ["", f"ViT5: chưa có {pred_file(n)}"]
    mean_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    print("wrote", csv_path)
    print("wrote", mean_path)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=100)
    args = ap.parse_args()
    if args.limit < 1:
        raise SystemExit("--limit >= 1")
    run(args.limit)


if __name__ == "__main__":
    main()
