# So sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt

*A Comparative Study of Extractive and Abstractive Summarization for Vietnamese News*

Đồ án CS221 — **Nhóm 14:** Nguyễn Trí Toàn (26410135), Nguyễn Văn Thái (26410108), Đỗ Quốc Hoàng (26410043).

So sánh **Lead-3**, **TextRank** (rút trích) và **ViT5** (tóm lược) trên Vietnews.

Câu hỏi: trên cùng tập test, ba hệ khác nhau thế nào về ROUGE, và khi đọc tay thì mỗi hệ sai kiểu gì?

## Dữ liệu

- Nguồn: https://github.com/ThanhChinhBK/vietnews
- Split: `data/test_tokenized`
- L1: 100 file đầu (`000001.txt.seg` … `000100.txt.seg`) — danh sách `data/test_ids.txt`
- File đã **tách từ sẵn** (dấu `_`). Không gọi lại underthesea trên tập này.
- Kaggle tự kéo file (không upload). Local đã có `data/test_100` / `data/test_500`; nếu thiếu: `python src/fetch_vietnews.py --n 500`.

## Cài đặt

```bash
cd do-an-tom-tat
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Chạy extractive (máy local)

```bash
python src/run_extractive.py --limit 10
python src/run_extractive.py --limit 100
```

Kết quả: `results/extractive_preview.json`, `results/extractive_scores.csv`

## Ghép ROUGE 3 hệ

Cần `results/preds.json` (output Kaggle).

```bash
python src/merge_scores.py
```

Bảng F1 trên 100 bài (thay `_` → space trước khi tính):

| Hệ | ROUGE-1 | ROUGE-2 | ROUGE-L |
|---|---|---|---|
| Lead-3 | 0.2507 | 0.1296 | 0.1841 |
| TextRank | 0.2428 | 0.1100 | 0.1730 |
| ViT5 | 0.2664 | 0.1341 | 0.2084 |

Cùng split, **500 bài** (`000001`–`000500`). Bảng n=100 ở trên **không đổi**. 100 pred đầu của `preds_500.json` trùng `preds.json`.

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

Đối chiếu số ViT5 vs gold (n=100, đọc tay): script `src/check_numbers.py` ra 64/100 bài lệch token số — **không dùng làm tỷ lệ lỗi**. Sau khi lọc ngày/tuổi/`hai` vs `2` và số lấy từ thân bài: **7 bài sai/ảo giác số**, **13 bài sót số then chốt** (án, tiền, số nạn nhân). Chi tiết `results/number_diff_verified.md`.

## Abstractive (Kaggle) — không upload data

ViT5 **chỉ chạy trên Kaggle**. Không Add Dataset, không zip `test_100`/`test_500`.

1. New notebook, **GPU T4 x2**, **Internet On**, Private.
2. Copy `notebooks/kaggle_abstractive.ipynb` (cùng nội dung `kaggle_abstractive_500.ipynb`).
3. Cell 1 (pip `transformers==4.44.2`) → **Restart session** → chạy tiếp. **Đừng Run All.**
4. Cell `N = 500` (đổi `100` nếu cần bản khóa). Notebook tự tải file từ GitHub `ThanhChinhBK/vietnews`.
5. Model: `VietAI/vit5-base-vietnews-summarization`. Generate: `</s>`, `max_length=256`, `early_stopping=True`, `cuda:0`.
6. Tải `/kaggle/working/preds_500.json` (hoặc `preds.json` nếu N=100) về `results/`.

Đã có `results/preds_500.json`. Chấm lại local: `python src/run_eval_500.py`. Session bị kill: chạy lại cell infer — resume từ file trên `/kaggle/working`.

Nhóm **không fine-tune** ViT5. Checkpoint VietAI đã học Vietnews.

## Demo

Local:

```bash
python app/demo.py
```

Docker (cùng giao diện, cổng 7860):

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
