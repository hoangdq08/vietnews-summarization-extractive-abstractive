# Đối chiếu số: gold vs ViT5 (n=100, đọc tay)

Script `src/check_numbers.py` liệt kê **64 / 100** bài có token số lệch. **Không dùng 64/100 làm tỷ lệ lỗi.**

Regex bắt mọi chữ số: ngày `25/2`, năm sinh `1994`, `9X`, `hai` vs `2`, `03` vs `3`, số nhà. Nhiều “extra” lấy từ thân bài, gold (sapo) không ghi.

Cách lọc: đọc gold + pred + thân bài. Số pred có trong body = lấy từ bài, không tính ảo giác số. Chỉ ghi khi số **sai sự kiện**, **gán nhầm vụ/người**, hoặc **sót số then chốt của sapo**.

---

## A. Sai / ảo giác số — 7 bài

Dùng khi bảo vệ. Không phóng đại thành “64 bài”.

| ID | Gold | ViT5 | Vì sao tính |
|---|---|---|---|
| 000036 | Rolex 7.000 USD; Vĩnh khai mua 1,1 tỷ rồi mất | Vĩnh “khai cho ông Vĩnh” 27 tỷ và 1.750.000 USD | Số có trong bài nhưng là lời **Nguyễn Văn Dương** — gán nhầm người |
| 000042 | Bùi Thị Ngọc Anh, 31 tuổi, lừa thuê căn hộ (title: 110 triệu) | Bắt “nạn nhân”, chiếm **16 tỷ** | 16 tỷ là **vụ khác** cùng bài (VnExpress); pred gán vào vụ 110 triệu |
| 000069 | Trộm 200 cây vàng (gold không ghi mức án) | Hai bị cáo cùng **14 năm tù**, tên lặp | Body: Cửu **20 năm**, Hoan 14 năm — sao chép một mức án |
| 000075 | Ngày **14/5/2019**, Samsung Display Bắc Ninh | Ngày **2/10**, “làng quê Việt Nam” | `2/10` **không có** trong bài |
| 000079 | Nhóm sinh viên dàn cảnh cướp | Cầm đầu “chưa đến **18** tuổi” | Body: cầm đầu SN 1999 (~20); không có số 18 |
| 000081 | Chiều 5/4, nguồn PV; vụ cuối tháng 3/2019 | Sáng **28/3**, nguồn Tuổi Trẻ, 1 lượng vàng | `28/3` không có (body 27/3); 1 lượng thì có trong title |
| 000082 | Nhà **2 tầng**, Duy Tân, Hải Châu | Nhà **3 tầng**, 1.500 m², Hòa Xuân / Liên Chiểu | `3` tầng và `1500` **không có** trong bài |

Cùng kiểu nhưng **không** đếm vào cột số: 000001 (3,2 tỷ **đúng** thân bài; lỗi là tên Vũ nhôm); 000027 (400 m đúng body; lỗi là bịa “tử vong”).

---

## B. Sót số then chốt so với gold — 13 bài

Pred không bịa số; cắt án / tiền / số nạn nhân mà sapo nêu.

| ID | Số gold bị sót | Pred làm gì |
|---|---|---|
| 000001 | **12 năm** tù | Kể 3,2 tỷ, sai tên |
| 000006 | Bán máy tính **700.000** đồng | Có đâm + cướp, không có giá |
| 000007 | **9** người chết | Kể nguyên nhân chìm tàu, không đếm nạn nhân |
| 000008 | **12 năm** tù | Kháng cáo, không mức án |
| 000032 | **300** cán bộ, **32** cơ sở | Giữ “5 nghi phạm” |
| 000039 | **2.100 tỷ** | Trung Nguyên, không số tài sản |
| 000044 | **20 năm** tù (và tuổi 20) | Kể hối hận, không mức án |
| 000046 | Em họ **14 tuổi** | “Buôn bán trẻ em”, không tuổi |
| 000057 | **30.000 tỷ** | Chiếm tài sản, không số |
| 000080 | **6** cô trò, **1** người chết | Giữ “4 tháng” + lớp 3,4,5 từ body |
| 000086 | **250 triệu** | “Cướp của vợ”, không số |
| 000087 | Hơn **2 tỷ** thuốc nhập lậu | “Hàng nghìn sản phẩm”, không tiền |
| 000099 | Hơn **200 triệu** | Đánh bạc mạng, không số thu giữ |

---

## C. Extra có trong thân bài — không tính lỗi số

Gold ngắn; pred lấy ngày/địa điểm/tuổi/số nhà từ body.

000005 28/5; 000010 Sông Tranh 2; 000012 21h45 26/8 (và `03` = `3` người); 000016 nhà số 10; 000019 “2 đối tượng” + “3 ngón” (lời khai / hiện trường — gold là tin trình báo giả); 000022 BV 108; 000028 “1 cây búa”; 000029 8/10; 000037 17–25 tuổi; 000041 SN 1994, quận 10; 000043 30–35 tuổi; 000048 11/3; 000051 con 3 tuổi; 000053 tầng 31, 21 tuổi; 000054 bé 7 tuổi, quận 4 (đúng body); 000065 2 gói; 000067 “V 3”; 000068 8 vụ; 000083 lớp 1; 000096 50 đối tượng; 000100 tổ 29.

---

## D. Nhiễu regex — không đọc là lỗi

- Ngày/tháng/năm sinh: 000004 10/2, 000030 tháng 6, 000045 `7/11` (không có trong body — ngày bịa, không đổi sự kiện), 000064 5/4, 000072 SN 1963, 000098 25 tuổi vs SN 1994.
- `hai` viết chữ vs `2`: 000004, 000013, 000034, 000058, 000088, 000092.
- `9X` vs năm: 000024.
- Đếm nhỏ không then chốt: 000023 “2 tháng”, 000050 “4 đối tượng”, 000055 “2 đối tượng”.

---

## Số công bố (n=100, ViT5 vs gold)

| | Số bài |
|---|---|
| Script lệch token số | 64 |
| **Sai / ảo giác số (nhóm A)** | **7** |
| **Sót số then chốt (nhóm B)** | **13** |
| Extra lấy từ body hoặc nhiễu | phần còn lại của 64 |

Không cộng A+B thành “20 bài lỗi số”: một bài có thể vừa sót vừa lấy số khác (000001). A và B là hai hiện tượng.

Lead-3 / TextRank không chạy script này: câu lấy từ bài nên ít bịa số; dễ sót số vì gold là sapo.

File thô: `results/number_diff_raw.md`.
