# A/B input ViT5: giữ dấu nối từ hay thay bằng khoảng trắng?

## Thiết kế và tái lập

Ngày 21/09/2026. Chạy `experiments/vit5_input_ab.py`, smoke-test 1 bài rồi chạy 20 bài, cả hai exit 0. Chọn trước ID 1,26,...,476 từ 500 bài, không chọn theo điểm đầu ra. Đây là phân tích khám phá trên test, không phải tập dev để tối ưu tham số.

A: body nguyên gốc chứa `_`. B: chỉ thay `_` bằng space. Cả hai thêm `</s>`, input tối đa 1024 token, output max_length256, greedy (num_beams1, do_sampleFalse), CPU float32, seed0. Dùng cùng project whitespace ROUGE, không đổi tokenizer chấm điểm.

Checkpoint revision: `a54febd011c0a39ce49ceacd9225e63ef3a73ad3`. Chi tiết phiên bản, generation defaults và ID nằm trong `../results/vit5_input_ab_20/metadata.json`. Prediction, token lengths, hashes input và điểm từng bài nằm trong `predictions.json` cùng thư mục.

Lệnh chạy từ thư mục project, chọn output mới vì runner từ chối ghi đè:

```bash
HF_HOME="$JCODE_SCRATCH_DIR/vietnews-hf-cache" \
  "$JCODE_SCRATCH_DIR/vietnews-vit5-ab-venv/bin/python" \
  experiments/vit5_input_ab.py --limit 20 --output results/vit5_input_ab_new
```

Môi trường inference riêng trong scratch, không thay dependency của demo. Runner dùng source preprocess/evaluate hiện tại. Không train, không đổi notebook hay baseline cũ.

## Kết quả đo

| Chỉ số | A: giữ `_` | B: khoảng trắng |
|---|---:|---:|
| ROUGE-1 F1 | 0.1766 | 0.2944 |
| ROUGE-2 F1 | 0.0830 | 0.1527 |
| ROUGE-L F1 | 0.1388 | 0.2294 |
| Token input trung bình trước cắt | 790.4 | 566.9 |
| Bài vượt 1024 token | 6/20 | 2/20 |

B tăng ROUGE-1 trên 18 bài, giảm trên 2 bài, không hòa. Prediction A khớp chính xác prediction lịch sử của cả 20 ID trong `preds_500.json`, là kiểm tra tái lập quan trọng. Không so điểm trung bình 20 bài này trực tiếp với điểm 100/500 bài.

Input representation thay đổi cả token và phần nội dung còn lại sau truncation. Trong 14 bài không bị cắt ở cả hai nhánh, R1 vẫn tăng 0.2037 → 0.3289, R2 0.1062 → 0.1798, RL 0.1640 → 0.2731. Điều này cho thấy kết quả tăng không chỉ xuất hiện ở các bài được giảm truncation, nhưng chưa định lượng riêng đóng góp của từng yếu tố trên toàn mẫu. Hai prediction smoke-test cũng khớp chính xác khi chạy lại trong batch 20 bài. Đây không phải bằng chứng model đã được cải thiện bằng huấn luyện.

## Kiểm tra thủ công: điểm tăng chưa đồng nghĩa đúng sự thật

### 000001.txt.seg: ROUGE tăng nhưng B vẫn sai nghiêm trọng

Đối chiếu `data/test_tokenized/000001.txt.seg` và hai prediction trong artifact:

- Gold ghi Hồ Xuân Huy, ngày 25/2, 12 năm tù.
- A sinh Bùi Quang Huy và gán là Vũ “nhôm”, không được body hỗ trợ.
- B sinh Phan Phú Huy, ngày 4/4, 40 tuổi, chung thân. Các chi tiết này không được body hỗ trợ và mâu thuẫn gold.
- R1 tăng từ 0.1515 lên 0.5352, nhưng không được gọi đó là bản tóm tắt chính xác hơn.
- Body bắt đầu bằng lời khai của “Huy”, không chứa đầy đủ các chi tiết ở gold. Phải phân biệt hallucination trong output với thông tin reference vốn không hiện diện trong input body.

### 000326.txt.seg: B giảm ROUGE

R1 B giảm khoảng 0.0820. B dùng tên “Mai” và kể chi tiết xe máy/đi trộm, trong khi gold tóm tắt khái quát việc bắt một thanh niên trộm tài sản. Không thể chỉ từ ROUGE thấp hơn kết luận B sai hơn. Cách nối thời gian “Khi bị ... phát hiện ...” cũng cần xem xét, không tự chứng nhận factuality từ trùng từ.

## Kết luận và bước tiếp theo

Có bằng chứng trên mẫu này rằng thay `_` bằng space tăng overlap với gold và giảm lượng input bị cắt. Chưa đủ bằng chứng để đưa ra kết luận về factuality hoặc toàn bộ Vietnews. Chưa đổi pipeline chính.

Đề xuất tiếp: chấm factuality theo rubric trên các bài cố định, kiểm tra gold có được body hỗ trợ và xác nhận kết quả trên tập đánh giá độc lập trước khi chốt preprocessing. Không chọn tham số để tối đa điểm của 20 bài này.

Cảnh báo runtime còn thấy: LibreSSL/urllib3, tokenizer T5 legacy, early_stopping không có tác dụng với num_beams1. Giữ early_stopping để khớp notebook, không tắt cảnh báo. Git diff/status vẫn bị Xcode license trên máy; không commit.
