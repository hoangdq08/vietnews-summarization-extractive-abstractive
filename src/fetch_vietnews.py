"""Kéo 000001.txt.seg … 000{N}.txt.seg từ GitHub. Không clone train."""

from __future__ import annotations

import argparse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from paths import DATA_DIR, file_ids

RAW_BASE = (
    "https://raw.githubusercontent.com/ThanhChinhBK/vietnews/"
    "master/data/test_tokenized"
)


def _empty(path: Path) -> bool:
    return not path.exists() or path.stat().st_size == 0


def _download_one(name: str, dest: Path) -> None:
    out = dest / name
    if not _empty(out):
        return
    tmp = out.with_suffix(out.suffix + ".part")
    urllib.request.urlretrieve(f"{RAW_BASE}/{name}", tmp)
    tmp.replace(out)


def fetch_vietnews(dest: Path | None = None, n: int = 500, workers: int = 8) -> list[Path]:
    dest = Path(dest) if dest is not None else DATA_DIR
    dest.mkdir(parents=True, exist_ok=True)
    names = file_ids(n)
    pending = [name for name in names if _empty(dest / name)]
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
    missing = [name for name in names if _empty(dest / name)]
    if missing:
        raise RuntimeError(f"thiếu {len(missing)} file, ví dụ {missing[:3]}")
    files = [dest / name for name in names]
    if pending:
        print("n files", len(files), "dir", dest)
    return files


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, default=500)
    ap.add_argument("--dest", default=str(DATA_DIR))
    args = ap.parse_args()
    fetch_vietnews(Path(args.dest), n=args.n)


if __name__ == "__main__":
    main()
