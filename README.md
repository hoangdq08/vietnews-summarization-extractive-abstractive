# Vietnews summarization

So sánh tóm tắt **rút trích** (Lead-n, TextRank) và **tóm lược** (ViT5) trên tin tức tiếng Việt.

Input: thân bài đã tách từ. Output: bản tóm tắt ngắn + ROUGE so với sapo (gold). Demo Gradio ba cột, chạy local hoặc Docker — không cần GPU lúc xem.

Dữ liệu: [Vietnews](https://github.com/ThanhChinhBK/vietnews) `test_tokenized`. Checkpoint: [`VietAI/vit5-base-vietnews-summarization`](https://huggingface.co/VietAI/vit5-base-vietnews-summarization) (off-the-shelf, không fine-tune).

## Quick start

Demo chạy trong Docker, không cần cài Python trên máy.

```bash
docker build -t vietnews-demo .
docker run --rm -p 7860:7860 vietnews-demo
```

Mở http://127.0.0.1:7860

Lúc build, image tự tải 500 file test. Cần Internet một lần. Lúc mở demo, container đọc file đã nằm trong image, không gọi mạng.

Nếu sửa code trên máy, dùng `.venv` rồi `python app/demo.py`. Cách đó không dùng khi bảo vệ.

## Pipeline

| Bước | Chỗ chạy | Lệnh |
|---|---|---|
| Lấy test set | local / Kaggle | `python src/fetch_vietnews.py --n 500` |
| Extractive | local CPU | Lead-n, TextRank trong `src/extractive.py` |
| Abstractive | Kaggle GPU | `notebooks/kaggle_abstractive.ipynb` → `results/preds_500.json` |
| ROUGE | local | `python src/run_eval.py --limit 100` hoặc `--limit 500` |
| Demo | Docker | `docker run --rm -p 7860:7860 vietnews-demo` |

ViT5 cần GPU. Notebook Kaggle: **T4 x2**, **Internet On**, không Add Dataset. Cell 1 cài `transformers==4.44.2` → **Restart session** → chạy tiếp (`N = 500`). Generate: `</s>`, `max_length=256`, `early_stopping=True`, `cuda:0`. Tải `/kaggle/working/preds_500.json` về `results/`. Session bị kill thì chạy lại cell infer (resume).

## Results

ROUGE F1, tokenizer: thay `_` → space rồi split (gold/extractive giữ `_`, ViT5 thì không).

**n = 100** (`000001`–`000100`)

| Hệ | ROUGE-1 | ROUGE-2 | ROUGE-L |
|---|---|---|---|
| Lead-3 | 0.2507 | 0.1296 | 0.1841 |
| TextRank | 0.2428 | 0.1100 | 0.1730 |
| ViT5 | 0.2664 | 0.1341 | 0.2084 |

**n = 500** (`000001`–`000500`). 100 pred đầu trùng n=100.

| Hệ | ROUGE-1 | ROUGE-2 | ROUGE-L |
|---|---|---|---|
| Lead-1 | 0.2719 | 0.1305 | 0.2092 |
| Lead-3 | 0.2569 | 0.1294 | 0.1856 |
| Lead-5 | 0.2256 | 0.1199 | 0.1624 |
| TextRank-3 | 0.2499 | 0.1198 | 0.1815 |
| ViT5 | 0.2784 | 0.1474 | 0.2233 |
| Oracle-3 | 0.4646 | 0.2793 | 0.3410 |

Lead-1 > Lead-3: gold gần câu mở đầu. ViT5 hơn Lead-1 một chút. Oracle-3 ≈ 0.46: extractive còn cửa.

ROUGE-1 theo độ dài thân bài (n=100, ngưỡng 300/500 từ):

| Nhóm | n | Lead-3 | TextRank | ViT5 |
|---|---|---|---|---|
| Ngắn (<300) | 34 | 0.2581 | 0.2672 | 0.2919 |
| Trung (300–499) | 33 | 0.2638 | 0.2409 | 0.2549 |
| Dài (≥500) | 33 | 0.2298 | 0.2194 | 0.2519 |

```bash
python src/run_eval.py --limit 100
python src/run_eval.py --limit 500
python src/scores_by_length.py
```

ROUGE không thay cho đọc tay. Trên 100 bài, ViT5 có **7** trường hợp sai/ảo giác số và **13** bài sót án/tiền/số nạn nhân — không dùng 64/100 của regex. Chi tiết: `results/error_analysis.md`, `results/number_diff_verified.md`.

## Layout

```
src/           fetch, preprocess, extractive, oracle, ROUGE, eval
app/demo.py    Gradio, 500 bài, ViT5 từ preds_500.json
notebooks/     inference ViT5 trên Kaggle
data/          SOURCE.txt; test_tokenized/ do fetch (gitignored)
results/       preds, scores, error analysis
Dockerfile     demo cổng 7860
```

`src/paths.py` là nguồn đường dẫn và id (`000001.txt.seg` …).

## Notes

- Không train lại ViT5 trên Vietnews (checkpoint đã học miền này).
- Không crawl bài mới; không tách từ lại trên gold.
- Demo không gọi Hugging Face lúc runtime.

Nguyễn Trí Toàn, Nguyễn Văn Thái, Đỗ Quốc Hoàng.
