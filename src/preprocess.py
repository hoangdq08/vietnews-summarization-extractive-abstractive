"""Đọc file Vietnews đã tách từ. Không gọi tokenizer khác trên gold data."""

from pathlib import Path


def parse_file(path):
    raw = Path(path).read_text(encoding="utf-8")
    parts = [p.strip() for p in raw.split("\n\n") if p.strip()]
    if len(parts) < 3:
        raise ValueError(f"File không đủ title/abstract/body: {path}")
    title = parts[0]
    abstract = parts[1]
    body = "\n".join(parts[2:])
    return {"id": Path(path).name, "title": title, "abstract": abstract, "body": body}


def split_sentences(body):
    """Thân bài Vietnews: mỗi câu thường một dòng."""
    sents = []
    buf = []
    for line in body.splitlines():
        line = line.strip()
        if not line:
            continue
        buf.append(line)
        if line.endswith(".") or line.endswith("!") or line.endswith("?"):
            sents.append(" ".join(buf))
            buf = []
    if buf:
        sents.append(" ".join(buf))
    return sents


def load_docs(data_dir, id_file=None, limit=None):
    data_dir = Path(data_dir)
    if id_file:
        names = [
            line.strip()
            for line in Path(id_file).read_text(encoding="utf-8").splitlines()
            if line.strip()
        ]
        if limit:
            names = names[:limit]
        paths = [data_dir / name for name in names]
    else:
        paths = sorted(data_dir.iterdir())
        if limit:
            paths = paths[:limit]
    docs = []
    for p in paths:
        doc = parse_file(p)
        doc["sentences"] = split_sentences(doc["body"])
        docs.append(doc)
    return docs
