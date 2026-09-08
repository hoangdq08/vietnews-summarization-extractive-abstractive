"""Ghép ROUGE 3 hệ trên 100 bài. Chuẩn hoá: thay '_' bằng space trước khi tính."""

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from evaluate import rouge_mean, rouge_one
from extractive import lead_n, textrank
from preprocess import load_docs


def norm(text):
    return (text or "").replace("_", " ")


def main():
    preds = json.loads((ROOT / "results" / "preds.json").read_text(encoding="utf-8"))
    pred_map = {r["id"]: r["pred"] for r in preds}
    docs = load_docs(ROOT / "data" / "test_100", ROOT / "data" / "test_ids.txt", limit=100)

    pairs = {"lead3": [], "textrank": [], "vit5": []}
    rows = []
    for doc in docs:
        lead = lead_n(doc["sentences"], 3)
        tr = textrank(doc["sentences"], 3)
        ref = doc["abstract"]
        vit5 = pred_map[doc["id"]]
        row = {"id": doc["id"]}
        for name, pred in (("lead3", lead), ("textrank", tr), ("vit5", vit5)):
            s = rouge_one(norm(pred), norm(ref))
            pairs[name].append((norm(pred), norm(ref)))
            row[f"{name}_r1"] = round(s["rouge1"], 4)
            row[f"{name}_r2"] = round(s["rouge2"], 4)
            row[f"{name}_rL"] = round(s["rougeL"], 4)
        rows.append(row)

    csv_path = ROOT / "results" / "scores.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    lines = [
        "ROUGE F1, n=100, cùng id test_ids.txt",
        "Tokenizer: thay '_' bằng space rồi split khoảng trắng (cả pred và ref).",
        "Lý do: gold/extractive có dấu '_; ViT5 sinh lẫn có/không có '_'.",
        "",
    ]
    for name, label in (("lead3", "Lead-3"), ("textrank", "TextRank"), ("vit5", "ViT5")):
        m = rouge_mean(pairs[name])
        lines.append(
            f"{label:10} rouge1={m['rouge1']:.4f}  rouge2={m['rouge2']:.4f}  rougeL={m['rougeL']:.4f}"
        )
    mean_path = ROOT / "results" / "scores_mean.txt"
    mean_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    print("wrote", csv_path)
    print("wrote", mean_path)


if __name__ == "__main__":
    main()
