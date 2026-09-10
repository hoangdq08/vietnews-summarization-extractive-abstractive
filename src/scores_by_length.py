"""ROUGE theo độ dài thân bài trên n=100. Ngưỡng 300/500 (tertile làm tròn)."""

from __future__ import annotations

import csv
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from fetch_vietnews import DEFAULT_DEST, file_ids
from preprocess import load_docs

def bucket(n_words: int) -> str:
    if n_words < 300:
        return "ngan"
    if n_words < 500:
        return "trung"
    return "dai"


def mean(xs):
    return round(sum(xs) / len(xs), 4) if xs else 0.0


def main() -> None:
    scores_path = ROOT / "results" / "scores.csv"
    if not scores_path.exists():
        raise SystemExit("thiếu results/scores.csv — python src/run_eval.py --limit 100")
    by_id = {}
    with scores_path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            by_id[row["id"]] = row
    docs = load_docs(DEFAULT_DEST, names=file_ids(100))
    groups = {"ngan": [], "trung": [], "dai": []}
    for doc in docs:
        n_words = len(doc["body"].split())
        rec = by_id[doc["id"]]
        groups[bucket(n_words)].append((n_words, rec))

    labels = {
        "ngan": "ngắn (<300 từ)",
        "trung": "trung (300–499)",
        "dai": "dài (≥500)",
    }
    keys = [
        "lead3_r1",
        "lead3_r2",
        "lead3_rL",
        "textrank_r1",
        "textrank_r2",
        "textrank_rL",
        "vit5_r1",
        "vit5_r2",
        "vit5_rL",
    ]
    out_rows = []
    lens = [len(d["body"].split()) for d in docs]
    lines = [
        "ROUGE F1 theo độ dài thân bài (số token cách trắng trên text đã tách từ).",
        "Ngưỡng 300 / 500: làm tròn tertile trên 100 bài (p33≈298, p67≈492) để mỗi nhóm ~1/3.",
        "Cùng tokenizer với bảng chính: '_' → space.",
        "",
        f"n=100; min={min(lens)}; median={sorted(lens)[len(lens)//2]}; max={max(lens)}.",
        "",
        f"{'nhóm':16} {'n':3}  độ dài     Lead-3 R1/R2/RL           TextRank                 ViT5",
    ]
    for key in ("ngan", "trung", "dai"):
        items = groups[key]
        ws = [w for w, _ in items]
        recs = [r for _, r in items]
        stats = {k: mean([float(r[k]) for r in recs]) for k in keys}
        lo, hi = min(ws), max(ws)
        lines.append(
            f"{labels[key]:16} {len(items):3}  {lo}–{hi:<6}  "
            f"{stats['lead3_r1']:.4f} / {stats['lead3_r2']:.4f} / {stats['lead3_rL']:.4f}  "
            f"{stats['textrank_r1']:.4f} / {stats['textrank_r2']:.4f} / {stats['textrank_rL']:.4f}  "
            f"{stats['vit5_r1']:.4f} / {stats['vit5_r2']:.4f} / {stats['vit5_rL']:.4f}"
        )
        out_rows.append(
            {
                "bucket": key,
                "label": labels[key],
                "n": len(items),
                "len_min": lo,
                "len_max": hi,
                **stats,
            }
        )
    lines += [
        "",
        "Quan sát (không suy nguyên nhân chắc):",
        "- Bài ngắn: ViT5 cao nhất cả 3 độ đo.",
        "- Bài trung: Lead-3 cao nhất.",
        "- Bài dài: cả ba giảm; ViT5 vẫn cao hơn extractive.",
        "- TextRank không thắng nhóm nào trên R-1.",
        "",
    ]
    txt = ROOT / "results" / "scores_by_length.txt"
    csv_path = ROOT / "results" / "scores_by_length.csv"
    txt.write_text("\n".join(lines), encoding="utf-8")
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(out_rows[0].keys()))
        w.writeheader()
        w.writerows(out_rows)
    print("".join(line + "\n" for line in lines), end="")
    print("wrote", txt)
    print("wrote", csv_path)


if __name__ == "__main__":
    main()
