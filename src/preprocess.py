"""Đọc file Vietnews đã tách từ. Không gọi tokenizer khác trên gold data."""

from pathlib import Path

from fetch_vietnews import fetch_vietnews
from paths import DATA_DIR, file_ids


def parse_file(path):
    raw = Path(path).read_text(encoding="utf-8")
    parts = [p.strip() for p in raw.split("\n\n") if p.strip()]
    if len(parts) < 3:
        raise ValueError(f"File không đủ title/abstract/body: {path}")
    return {
        "id": Path(path).name,
        "title": parts[0],
        "abstract": parts[1],
        "body": "\n".join(parts[2:]),
    }


def split_sentences(body):
    """Thân bài Vietnews: mỗi câu thường một dòng."""
    sents = []
    buf = []
    for line in body.splitlines():
        line = line.strip()
        if not line:
            continue
        buf.append(line)
        if line.endswith((".", "!", "?")):
            sents.append(" ".join(buf))
            buf = []
    if buf:
        sents.append(" ".join(buf))
    return sents


def load_docs(n: int, fetch: bool = False):
    names = file_ids(n)
    if fetch:
        fetch_vietnews(n=n)
    paths = [DATA_DIR / name for name in names]
    missing = [p for p in paths if not p.exists()]
    if missing:
        raise FileNotFoundError(
            f"thiếu {len(missing)} file trong {DATA_DIR} (ví dụ {missing[0].name}). "
            f"Chạy: python src/fetch_vietnews.py --n {n}"
        )
    docs = []
    for p in paths:
        doc = parse_file(p)
        doc["sentences"] = split_sentences(doc["body"])
        docs.append(doc)
    return docs
