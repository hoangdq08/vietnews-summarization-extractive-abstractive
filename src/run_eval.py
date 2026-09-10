"""Chấm ROUGE local. n=100: Lead-3 / TextRank / ViT5. n=500: thêm Lead-1/5, Oracle-3.

python src/run_eval.py --limit 100
python src/run_eval.py --limit 500
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from evaluate import normalize, rouge_mean, rouge_one
from extractive import lead_n, textrank
from fetch_vietnews import DEFAULT_DEST, fetch_vietnews, file_ids
from oracle import oracle_n
from preprocess import load_docs

LABELS = {
    "lead1": "Lead-1",
    "lead3": "Lead-3",
    "lead5": "Lead-5",
    "textrank": "TextRank-3",
    "oracle3": "Oracle-3",
    "vit5": "ViT5",
}


def ensure_docs(limit: int):
    dest = DEFAULT_DEST
    names = file_ids(limit)
    missing = [n for n in names if not (dest / n).exists() or (dest / n).stat().st_size == 0]
    if missing:
        fetch_vietnews(dest, n=limit)
    return load_docs(dest, names=names)


def load_pred_map(limit: int) -> dict:
    name = "preds.json" if limit == 100 else f"preds_{limit}.json"
    path = ROOT / "results" / name
    if not path.exists():
        return {}
    return {r["id"]: r["pred"] for r in json.loads(path.read_text(encoding="utf-8"))}


def run(limit: int) -> None:
    if limit not in (100, 500):
        raise SystemExit("limit chỉ 100 (bảng khóa) hoặc 500")
    docs = ensure_docs(limit)
    pred_map = load_pred_map(limit)
    if limit == 100 and not pred_map:
        raise SystemExit("thiếu results/preds.json — chạy notebook Kaggle N=100")

    if limit == 100:
        systems = ["lead3", "textrank", "vit5"]
    else:
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
        g = normalize(gold)
        preds = {}
        if "lead1" in systems:
            preds["lead1"] = lead_n(sents, 1)
        if "lead3" in systems:
            preds["lead3"] = lead_n(sents, 3)
        if "lead5" in systems:
            preds["lead5"] = lead_n(sents, 5)
        if "textrank" in systems:
            preds["textrank"] = textrank(sents, 3)
        if "oracle3" in systems:
            preds["oracle3"] = oracle_n(sents, gold, 3)
        if "vit5" in systems:
            preds["vit5"] = pred_map.get(doc["id"], "")
        row = {"id": doc["id"]}
        if limit == 500:
            row["n_sents"] = len(sents)
            row["body_words"] = len(doc["body"].split())
        for name, pred in preds.items():
            s = rouge_one(normalize(pred), g)
            pairs[name].append((normalize(pred), g))
            row[f"{name}_r1"] = round(s["rouge1"], 4)
            row[f"{name}_r2"] = round(s["rouge2"], 4)
            row[f"{name}_rL"] = round(s["rougeL"], 4)
        rows.append(row)
        if limit == 500 and i % 50 == 0:
            print("done", i, "max_sents", max_sents, flush=True)

    if limit == 100:
        csv_path = ROOT / "results" / "scores.csv"
        mean_path = ROOT / "results" / "scores_mean.txt"
        lines = [
            "ROUGE F1, n=100, cùng id 000001–000100",
            "Tokenizer: thay '_' bằng space rồi split khoảng trắng (cả pred và ref).",
            "Lý do: gold/extractive có dấu '_'; ViT5 sinh lẫn có/không có '_'.",
            "",
        ]
        label_w = 10
        label_map = {"lead3": "Lead-3", "textrank": "TextRank", "vit5": "ViT5"}
    else:
        csv_path = ROOT / "results" / "scores_500.csv"
        mean_path = ROOT / "results" / "scores_500_mean.txt"
        lines = [
            "ROUGE F1, n=500, id 000001–000500, '_' → space.",
            f"max sentences/doc = {max_sents}",
            "",
        ]
        label_w = 12
        label_map = LABELS

    csv_path.parent.mkdir(parents=True, exist_ok=True)
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    for name in systems:
        m = rouge_mean(pairs[name])
        lab = label_map[name]
        extra = f"  n={m['n']}" if limit == 500 else ""
        lines.append(
            f"{lab:{label_w}} rouge1={m['rouge1']:.4f}  rouge2={m['rouge2']:.4f}  rougeL={m['rougeL']:.4f}{extra}"
        )
    if limit == 500 and "vit5" not in systems:
        lines += ["", "ViT5: chưa có results/preds_500.json — chạy notebooks/kaggle_abstractive.ipynb"]
    mean_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    print("wrote", csv_path)
    print("wrote", mean_path)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=100, choices=(100, 500))
    args = ap.parse_args()
    run(args.limit)


if __name__ == "__main__":
    main()
