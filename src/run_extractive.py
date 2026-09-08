"""Chạy Lead-3 + TextRank trên tập test_100. Mặc định in 10 bài."""

import argparse
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from extractive import lead_n, textrank
from evaluate import rouge_mean, rouge_one
from preprocess import load_docs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data_dir", default=str(ROOT / "data" / "test_100"))
    ap.add_argument("--id_file", default=str(ROOT / "data" / "test_ids.txt"))
    ap.add_argument("--limit", type=int, default=10)
    ap.add_argument("--n_sents", type=int, default=3)
    ap.add_argument("--out_json", default=str(ROOT / "results" / "extractive_preview.json"))
    ap.add_argument("--out_csv", default=str(ROOT / "results" / "extractive_scores.csv"))
    args = ap.parse_args()

    docs = load_docs(args.data_dir, args.id_file, limit=args.limit)
    rows = []
    preview = []
    lead_pairs, tr_pairs = [], []

    for doc in docs:
        lead = lead_n(doc["sentences"], args.n_sents)
        tr = textrank(doc["sentences"], args.n_sents)
        ref = doc["abstract"]
        r_lead = rouge_one(lead, ref)
        r_tr = rouge_one(tr, ref)
        lead_pairs.append((lead, ref))
        tr_pairs.append((tr, ref))
        rows.append(
            {
                "id": doc["id"],
                "n_sents": len(doc["sentences"]),
                "abs_words": len(ref.split()),
                "body_words": len(doc["body"].split()),
                "lead3_r1": round(r_lead["rouge1"], 4),
                "lead3_r2": round(r_lead["rouge2"], 4),
                "lead3_rL": round(r_lead["rougeL"], 4),
                "textrank_r1": round(r_tr["rouge1"], 4),
                "textrank_r2": round(r_tr["rouge2"], 4),
                "textrank_rL": round(r_tr["rougeL"], 4),
            }
        )
        preview.append(
            {
                "id": doc["id"],
                "title": doc["title"],
                "abstract": ref,
                "lead3": lead,
                "textrank": tr,
                "n_sents": len(doc["sentences"]),
            }
        )

    Path(args.out_json).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out_json).write_text(
        json.dumps(preview, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    with open(args.out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    print(f"n={len(docs)}")
    print("Lead-3 ", rouge_mean(lead_pairs))
    print("TextRank", rouge_mean(tr_pairs))
    print("wrote", args.out_json)
    print("wrote", args.out_csv)
    print("\n--- 3 bài đầu (cắt ngắn) ---")
    for p in preview[:3]:
        print("\nID", p["id"], "|", p["title"])
        print("GOLD:", p["abstract"][:240])
        print("LEAD:", p["lead3"][:240])
        print("TR  :", p["textrank"][:240])


if __name__ == "__main__":
    main()
