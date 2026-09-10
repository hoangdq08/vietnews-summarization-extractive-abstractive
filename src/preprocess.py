"""Đọc file Vietnews đã tách từ. Không gọi tokenizer khác trên gold data."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "test_tokenized"


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


def load_docs(data_dir=None, id_file=None, limit=None, names=None):
    data_dir = Path(data_dir) if data_dir is not None else DATA_DIR
    if names is None:
        if id_file:
            names = [
                line.strip()
                for line in Path(id_file).read_text(encoding="utf-8").splitlines()
                if line.strip()
            ]
            if limit:
                names = names[:limit]
        else:
            found = sorted(p.name for p in data_dir.glob("*.txt.seg"))
            if limit:
                found = found[:limit]
            names = found
    paths = [data_dir / name for name in names]
    missing = [p for p in paths if not p.exists()]
    if missing:
        raise FileNotFoundError(
            f"thiếu {len(missing)} file trong {data_dir} (ví dụ {missing[0].name}). "
            f"Chạy: python src/fetch_vietnews.py --n {len(paths)}"
        )
    docs = []
    for p in paths:
        doc = parse_file(p)
        doc["sentences"] = split_sentences(doc["body"])
        docs.append(doc)
    return docs
