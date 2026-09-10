"""Liệt kê số gold vs ViT5. Chỉ gợi ý — bản đọc tay: results/number_diff_verified.md."""

import json
import re

from evaluate import normalize
from paths import RESULTS
from preprocess import load_docs

NUM = re.compile(r"\d+(?:[.,]\d+)*")


def nums(text):
    return [m.replace(".", "").replace(",", ".") for m in NUM.findall(normalize(text))]


def main():
    docs = {d["id"]: d for d in load_docs(100)}
    preds = json.loads((RESULTS / "preds.json").read_text(encoding="utf-8"))
    rows = []
    for row in preds:
        gold, pred = docs[row["id"]]["abstract"], row["pred"]
        g, p = nums(gold), nums(pred)
        miss = [x for x in g if x not in p]
        extra = [x for x in p if x not in g]
        if miss or extra:
            rows.append((row["id"], g, p, miss, extra, gold, pred))
    lines = [
        f"Số bài có lệch số (gold vs ViT5): {len(rows)} / 100",
        "Cột miss = số trong gold không thấy trong pred. extra = số pred không có trong gold.",
        "Chưa phải lỗi đã xác nhận — đọc tay: results/number_diff_verified.md.",
        "",
    ]
    for did, g, p, miss, extra, gold, pred in rows:
        lines += [
            f"## {did}",
            f"gold nums: {g}",
            f"pred nums: {p}",
            f"miss: {miss}  extra: {extra}",
            f"GOLD: {gold}",
            f"VIT5: {pred}",
            "",
        ]
    out = RESULTS / "number_diff_raw.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"candidates {len(rows)} / 100")
    print("wrote", out)


if __name__ == "__main__":
    main()
