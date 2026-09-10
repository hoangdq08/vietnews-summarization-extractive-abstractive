"""Chấm ROUGE. n=100: Lead-3 / TextRank / ViT5. n=500: thêm Lead-1/5, Oracle-3."""

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
    "textrank": "TextRank-3",
    "oracle3": "Oracle-3",
    "vit5": "ViT5",
}


def _preds_for(doc, systems, pred_map):
    sents = doc["sentences"]
    gold = doc["abstract"]
    out = {}
    for name in systems:
        if name.startswith("lead"):
            out[name] = lead_n(sents, int(name.replace("lead", "")))
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


def run(limit: int) -> None:
    if limit not in (100, 500):
        raise SystemExit("limit chỉ 100 (bảng khóa) hoặc 500")
    docs = load_docs(limit, fetch=True)
    pred_map = _load_pred_map(limit)
    if limit == 100 and not pred_map:
        raise SystemExit("thiếu results/preds.json — chạy notebook Kaggle N=100")

    if limit == 100:
        systems = ["lead3", "textrank", "vit5"]
        csv_path = RESULTS / "scores.csv"
        mean_path = RESULTS / "scores_mean.txt"
        header = [
            "ROUGE F1, n=100, cùng id 000001–000100",
            "Tokenizer: thay '_' bằng space rồi split khoảng trắng (cả pred và ref).",
            "Lý do: gold/extractive có dấu '_'; ViT5 sinh lẫn có/không có '_'.",
            "",
        ]
        label_map = {"lead3": "Lead-3", "textrank": "TextRank", "vit5": "ViT5"}
        label_w = 10
    else:
        systems = ["lead1", "lead3", "lead5", "textrank", "oracle3"]
        if pred_map:
            systems.append("vit5")
        csv_path = RESULTS / "scores_500.csv"
        mean_path = RESULTS / "scores_500_mean.txt"
        header = ["ROUGE F1, n=500, id 000001–000500, '_' → space."]
        label_map = LABELS
        label_w = 12

    pairs = {k: [] for k in systems}
    rows = []
    max_sents = 0
    for i, doc in enumerate(docs, 1):
        max_sents = max(max_sents, len(doc["sentences"]))
        gold_n = normalize(doc["abstract"])
        preds = _preds_for(doc, systems, pred_map)
        row = {"id": doc["id"]}
        if limit == 500:
            row["n_sents"] = len(doc["sentences"])
            row["body_words"] = len(doc["body"].split())
        for name, pred in preds.items():
            pred_n = normalize(pred)
            s = rouge_one(pred_n, gold_n)
            pairs[name].append((pred_n, gold_n))
            row[f"{name}_r1"] = round(s["rouge1"], 4)
            row[f"{name}_r2"] = round(s["rouge2"], 4)
            row[f"{name}_rL"] = round(s["rougeL"], 4)
        rows.append(row)
        if limit == 500 and i % 50 == 0:
            print("done", i, "max_sents", max_sents, flush=True)

    if limit == 500:
        header.append(f"max sentences/doc = {max_sents}")
        header.append("")

    csv_path.parent.mkdir(parents=True, exist_ok=True)
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    lines = list(header)
    for name in systems:
        m = rouge_mean(pairs[name])
        extra = f"  n={m['n']}" if limit == 500 else ""
        lines.append(
            f"{label_map[name]:{label_w}} rouge1={m['rouge1']:.4f}  "
            f"rouge2={m['rouge2']:.4f}  rougeL={m['rougeL']:.4f}{extra}"
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
