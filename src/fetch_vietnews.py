"""Kéo file test Vietnews từ GitHub. Không upload dataset, không clone train.

Chỉ lấy 000001.txt.seg … 000{N}.txt.seg trong data/test_tokenized.
Nguồn: https://github.com/ThanhChinhBK/vietnews
"""

from __future__ import annotations

import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_BASE = (
    "https://raw.githubusercontent.com/ThanhChinhBK/vietnews/"
    "master/data/test_tokenized"
)
DEFAULT_DEST = ROOT / "data" / "test_tokenized"


def file_ids(n: int) -> list[str]:
    if n < 1:
        raise ValueError("n >= 1")
    return [f"{i:06d}.txt.seg" for i in range(1, n + 1)]


def _download_one(name: str, dest: Path) -> str:
    out = dest / name
    if out.exists() and out.stat().st_size > 0:
        return name
    url = f"{RAW_BASE}/{name}"
    tmp = out.with_suffix(out.suffix + ".part")
    urllib.request.urlretrieve(url, tmp)
    tmp.replace(out)
    return name


def fetch_vietnews(dest: Path | None = None, n: int = 500, workers: int = 8) -> list[Path]:
    dest = Path(dest) if dest is not None else DEFAULT_DEST
    dest.mkdir(parents=True, exist_ok=True)
    names = file_ids(n)
    pending = [
        name
        for name in names
        if not (dest / name).exists() or (dest / name).stat().st_size == 0
    ]
    if pending:
        print(f"tải {len(pending)}/{n} file → {dest}")
        with ThreadPoolExecutor(max_workers=workers) as pool:
            futs = [pool.submit(_download_one, name, dest) for name in pending]
            done = 0
            for fut in as_completed(futs):
                fut.result()
                done += 1
                if done % 50 == 0 or done == len(pending):
                    print("downloaded", done, "/", len(pending))
    missing = [
        name
        for name in names
        if not (dest / name).exists() or (dest / name).stat().st_size == 0
    ]
    if missing:
        raise RuntimeError(f"thiếu {len(missing)} file, ví dụ {missing[:3]}")
    files = [dest / name for name in names]
    assert files[0].name == "000001.txt.seg"
    print("n files", len(files), "dir", dest)
    return files


def main() -> None:
    import argparse

    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, default=500)
    ap.add_argument("--dest", default=str(DEFAULT_DEST))
    args = ap.parse_args()
    fetch_vietnews(Path(args.dest), n=args.n)


if __name__ == "__main__":
    main()
