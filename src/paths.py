"""Đường dẫn repo. Một chỗ, các script khác import từ đây."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "test_tokenized"
RESULTS = ROOT / "results"


def file_ids(n: int) -> list:
    if n < 1:
        raise ValueError("n >= 1")
    return [f"{i:06d}.txt.seg" for i in range(1, n + 1)]


def pred_file(n: int) -> Path:
    return RESULTS / ("preds.json" if n == 100 else f"preds_{n}.json")
