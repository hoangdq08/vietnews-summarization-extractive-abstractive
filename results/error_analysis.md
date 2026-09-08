# Phân tích lỗi (đọc tay)

Cách làm: mở http://127.0.0.1:7860 (Docker: `docker start vietnews-demo`) → chọn đúng **id** → điền.  
Chỉ ghi lỗi **nhìn thấy**. Ô trống = chưa đọc hoặc không thấy lỗi. Không bịa.

Cột **Hệ:** `Lead-3` / `TextRank` / `ViT5` / `cả ba`.  
Cột **Loại** (gợi ý, không bắt buộc đúng một trong các mục): cắt ý | sai tên/số | bịa | lặp | lệch gold | không liên quan.

Đã điền sẵn **1 mẫu** (`000001`) vì đã đối chiếu gold.

---

## 000001.txt.seg

- Gold: Hồ Xuân Huy, 12 năm tù, Đà Nẵng.
- ViT5: Bùi Quang Huy / Vũ nhôm, 3,2 tỷ.
- Hệ: ViT5
- Loại: sai tên (ảo giác)
- Dẫn: gold `Hồ_Xuân_Huy` — pred `Bùi Quang Huy`
- Ghi chú: số tiền 3,2 tỷ có trong bài; tên thì sai.

## 000002.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000003.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000006.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000011.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000016.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000021.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000026.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000031.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000036.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000041.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000046.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000051.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000056.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000061.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000066.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000071.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000076.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000081.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

## 000086.txt.seg

- Hệ:
- Loại:
- Dẫn:
- Ghi chú:

---

## Tổng (điền sau khi xong 20 bài)

- Số bài ViT5 sai tên/số:
- Số bài Lead-3 cắt mất ý / lệch abstract:
- Số bài TextRank chọn câu không liên quan:
- Ghi chú khác:
