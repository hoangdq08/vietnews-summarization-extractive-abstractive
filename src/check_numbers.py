"""Liệt kê số trong gold không có trong pred ViT5 (và ngược lại).

Chỉ gợi ý. 64/100 ở number_diff_raw.md không phải tỷ lệ lỗi —
ngày, năm sinh, "hai"/"2" đều lọt regex. Bản đọc tay:
results/number_diff_verified.md.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from evaluate import normalize
from preprocess import load_docs


NUM = re.compile(
    r"\d+(?:[.,]\d+)*"
)


def nums(text):
    found = []
    for m in NUM.findall(normalize(text)):
        found.append(m.replace(".", "").replace(",", "."))
    return found


def main():
    from fetch_vietnews import DEFAULT_DEST, file_ids

    docs = {d["id"]: d for d in load_docs(DEFAULT_DEST, names=file_ids(100))}
    preds = json.loads((ROOT / "results" / "preds.json").read_text(encoding="utf-8"))
    rows = []
    for row in preds:
        did = row["id"]
        gold = docs[did]["abstract"]
        pred = row["pred"]
        g, p = nums(gold), nums(pred)
        miss = [x for x in g if x not in p]
        extra = [x for x in p if x not in g]
        if miss or extra:
            rows.append((did, g, p, miss, extra, gold, pred))
    lines = [
        f"Số bài có lệch số (gold vs ViT5): {len(rows)} / 100",
        "Cột miss = số trong gold không thấy trong pred. extra = số pred không có trong gold.",
        "Chưa phải lỗi đã xác nhận — đọc tay ở dưới.",
        "",
    ]
    for did, g, p, miss, extra, gold, pred in rows:
        lines.append(f"## {did}")
        lines.append(f"gold nums: {g}")
        lines.append(f"pred nums: {p}")
        lines.append(f"miss: {miss}  extra: {extra}")
        lines.append(f"GOLD: {gold}")
        lines.append(f"VIT5: {pred}")
        lines.append("")
    out = ROOT / "results" / "number_diff_raw.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"candidates {len(rows)} / 100")
    print("wrote", out)


if __name__ == "__main__":
    main()
