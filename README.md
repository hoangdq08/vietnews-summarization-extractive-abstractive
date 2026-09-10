# So sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt

*A Comparative Study of Extractive and Abstractive Summarization for Vietnamese News*

Đồ án CS221 — **Nhóm 14:** Nguyễn Trí Toàn (26410135), Nguyễn Văn Thái (26410108), Đỗ Quốc Hoàng (26410043).

So sánh **Lead-3**, **TextRank** (rút trích) và **ViT5** (tóm lược) trên Vietnews.

Câu hỏi: trên cùng tập test, ba hệ khác nhau thế nào về ROUGE, và khi đọc tay thì mỗi hệ sai kiểu gì?

## Dữ liệu

- Nguồn: https://github.com/ThanhChinhBK/vietnews — `data/test_tokenized`
- Local: `python src/fetch_vietnews.py --n 500` → `data/test_tokenized/` (không commit file `.seg`)
- Kaggle: notebook tự tải, **không upload dataset**
- 100 file đầu = bảng khóa; 500 file đầu = bảng mở rộng. Cùng thứ tự tên `000001.txt.seg` …
- File đã **tách từ sẵn** (dấu `_`). Không gọi lại underthesea.

## Cài đặt

```bash
cd vietnews-summarization-extractive-abstractive
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python src/fetch_vietnews.py --n 500
```

## Chấm ROUGE (máy local)

```bash
python src/run_eval.py --limit 100
python src/run_eval.py --limit 500
python src/scores_by_length.py
```

Cần `results/preds.json` (n=100) và `results/preds_500.json` (n=500) từ Kaggle.

Bảng F1 trên 100 bài (thay `_` → space trước khi tính):

| Hệ | ROUGE-1 | ROUGE-2 | ROUGE-L |
|---|---|---|---|
| Lead-3 | 0.2507 | 0.1296 | 0.1841 |
| TextRank | 0.2428 | 0.1100 | 0.1730 |
| ViT5 | 0.2664 | 0.1341 | 0.2084 |

Cùng split, **500 bài** (`000001`–`000500`). Bảng n=100 **không đổi**. 100 pred đầu của `preds_500.json` trùng `preds.json`.

| Hệ | ROUGE-1 | ROUGE-2 | ROUGE-L |
|---|---|---|---|
| Lead-1 | 0.2719 | 0.1305 | 0.2092 |
| Lead-3 | 0.2569 | 0.1294 | 0.1856 |
| Lead-5 | 0.2256 | 0.1199 | 0.1624 |
| TextRank-3 | 0.2499 | 0.1198 | 0.1815 |
| ViT5 | 0.2784 | 0.1474 | 0.2233 |
| Oracle-3 | 0.4646 | 0.2793 | 0.3410 |

Lead-1 > Lead-3: gold gần câu mở đầu. ViT5 (0.2784) hơn Lead-1 (0.2719) một chút. Oracle-3 ≈ 0.46: extractive còn cửa.

ROUGE-1 theo độ dài thân bài (n=100, ngưỡng 300/500 từ, ~33 bài/nhóm):

| Nhóm | n | Lead-3 | TextRank | ViT5 |
|---|---|---|---|---|
| Ngắn (<300) | 34 | 0.2581 | 0.2672 | 0.2919 |
| Trung (300–499) | 33 | 0.2638 | 0.2409 | 0.2549 |
| Dài (≥500) | 33 | 0.2298 | 0.2194 | 0.2519 |

Đối chiếu số ViT5 vs gold (n=100, đọc tay): script `src/check_numbers.py` ra 64/100 bài lệch token số — **không dùng làm tỷ lệ lỗi**. Sau khi lọc: **7 bài sai/ảo giác số**, **13 bài sót số then chốt**. Chi tiết `results/number_diff_verified.md`.

## Abstractive (Kaggle) — không upload data

ViT5 **chỉ chạy trên Kaggle**. Không Add Dataset.

1. New notebook, **GPU T4 x2**, **Internet On**, Private.
2. Copy `notebooks/kaggle_abstractive.ipynb` (trùng `kaggle_abstractive_500.ipynb`).
3. Cell pip `transformers==4.44.2` → **Restart session** → chạy tiếp. **Đừng Run All.**
4. `N = 500` (đổi `100` nếu cần bản khóa). Tự tải file từ GitHub `ThanhChinhBK/vietnews`.
5. Model: `VietAI/vit5-base-vietnews-summarization`. Generate: `</s>`, `max_length=256`, `early_stopping=True`, `cuda:0`.
6. Tải `/kaggle/working/preds_500.json` (hoặc `preds.json` nếu N=100) về `results/`.

Đã có pred. Chấm lại: `python src/run_eval.py --limit 500`. Session bị kill: chạy lại cell infer (resume).

Nhóm **không fine-tune** ViT5. Checkpoint VietAI đã học Vietnews.

## Demo

Cần đã `fetch_vietnews --n 100` (hoặc 500). Demo **không** gọi GitHub lúc mở.

```bash
python app/demo.py
```

Docker (build máy có mạng — image tự kéo 100 bài):

```bash
docker build -t vietnews-demo .
docker run --rm -p 7860:7860 vietnews-demo
```

Mở http://127.0.0.1:7860

## Nộp

- Slide 15–20 trang
- Báo cáo PDF
- GitHub (README + requirements) — public hoặc add thầy trước khi nộp
- Demo 15 phút (chạy local, không phụ thuộc Kaggle lúc bảo vệ)
