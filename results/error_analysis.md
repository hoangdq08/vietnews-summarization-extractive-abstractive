# Phân tích lỗi (đọc tay, n=20)

Nguồn: `data/test_100` + `results/preds.json` + Lead-3/TextRank local.  
Chỉ ghi lệch so với **gold** hoặc sai sự thật so với thân bài khi đọc được.

---

## 000001.txt.seg — Bản án giả danh công an lừa đảo

- Gold: TAND Đà Nẵng phạt **Hồ Xuân Huy** 12 năm tù.
- ViT5: **Bùi Quang Huy / Vũ nhôm**, chiếm đoạt 3,2 tỷ — không có bản án.
- Hệ: ViT5. Loại: sai tên (ảo giác). Dẫn: gold `Hồ_Xuân_Huy` vs pred `Bùi Quang Huy`.
- Lead-3 / TextRank: kể thủ đoạn, không có mức án 12 năm → lệch gold (gold là kết quả phiên toà).

## 000002.txt.seg — Nam thanh niên trên xe buýt

- Gold: hành khách giữ người, báo lực lượng chức năng.
- ViT5: “không có hành vi dâm ô”, “đề nghị gia đình bảo về nhà” — đúng hướng điều tra, **không** khớp gold; câu “bảo về nhà” vụng.
- Lead-3: bảo lãnh, từng bị phạt — dài hơn gold, lệch trọng tâm gold.
- Hệ: ViT5 + Lead-3. Loại: lệch gold.

## 000003.txt.seg — Thuốc sinh con theo ý muốn

- Gold: Baby Support / Hello baby, hỏi thực hư.
- ViT5: “Sự thật thì các loại dung dịch này **có chất lượng tốt**, nếu khéo léo tận dụng thì sẽ thành công.” Bài là điều tra nghi ngờ quảng cáo.
- Hệ: ViT5. Loại: bịa / đảo polarity.
- TextRank: có lời tư vấn “không hoàn hảo 100%” — gần hướng điều tra hơn ViT5.

## 000006.txt.seg — Đâm chủ nhà trọ cướp máy tính bảng

- ViT5: có đâm + cướp, **thiếu** bán 700.000 đồng (có trong title/gold).
- Lead-3: đủ bắt giữ, đâm chết, địa danh.
- TextRank: câu cuối “Đối tượng Bằng tại cơ quan công an” giống chú thích ảnh.
- Hệ: ViT5 (cắt ý); TextRank (câu caption).

## 000011.txt.seg — Trộm máy ủi

- Gold: thuê xe chở **máy ủi**, bán, mua dây chuyền vàng.
- ViT5: “trộm được **xe bồn**”, “thuê người đến sửa chữa”, “đối tượng bỗng dưng xuất hiện” — không khớp gold/thân bài.
- Hệ: ViT5. Loại: bịa / sai đối tượng.
- Lead-3: đúng máy ủi Becamex, thiếu đoạn bán.
- TextRank: nhảy vào người mua 120 triệu, thiếu cảnh trộm.

## 000016.txt.seg — Đốt cửa hàng giành nuôi con

- Gold: không đăng ký kết hôn, giành nuôi con không được, mang xăng đốt, đang truy bắt.
- ViT5: lặp “một nam thanh niên … khi một nam thanh niên”; **không** có nguyên nhân nuôi con.
- Lead-3: hiện trường đốt nhà, thiếu động cơ.
- TextRank: có mâu thuẫn / giành nuôi con.
- Hệ: ViT5 (lặp + cắt ý); Lead-3 (cắt động cơ).

## 000021.txt.seg — Siết cổ bạn gái

- Gold: Nguyễn Văn Được, dây dù, Kiến Bình – Tân Thạnh (Long An).
- ViT5: “Nguyễn ‘Văn’ được cho là” — tách nhầm tên **Được**.
- Lead-3: sát gold.
- Hệ: ViT5. Loại: sai/gãy tên.

## 000026.txt.seg — Bắt ông Lê Tấn Hùng (SAGRI)

- Ba hệ đều đúng hướng (khởi tố, SAGRI).
- ViT5 gọn, có tội danh Điều 219.
- Ghi: không thấy lỗi rõ so với gold.

## 000031.txt.seg — Đốt xe CSGT

- Gold: tẩm xăng đốt ô tô Đại uý CSGT trước trụ sở, tẩu thoát.
- ViT5: “mang theo **dao và khẩu súng dài (như súng hơi)**” — không có trong gold; Lead-3/TextRank cũng không kể súng/dao.
- Hệ: ViT5. Loại: bịa chi tiết vũ khí.
- Lead-3 / TextRank: đúng đốt xe Kia Morning.

## 000036.txt.seg — Đồng hồ Rolex Phan Văn Vĩnh

- Gold: Vĩnh không nhận được tặng Rolex 7.000 USD; khai mua 1,1 tỷ rồi mất.
- ViT5: “ông Phan Văn Vĩnh đã khai **cho ông Vĩnh** 27 tỷ đồng và 1.750.000 USD” — gán nhầm lời **Nguyễn Văn Dương**, câu tự mâu thuẫn.
- Lead-3: liệt kê quà của Dương, lệch trọng tâm Rolex.
- TextRank: Vĩnh không thừa nhận 27 tỷ — gần gold hơn.
- Hệ: ViT5 (sai người khai); Lead-3 (lệch gold).

## 000041.txt.seg — Súng và ma tuý đá

- Gold: súng Rulo, 21 viên đạn, 1 bịch ma tuý đá, nam 9X.
- ViT5: đúng tên Nguyễn Quốc Dũng, ma tuý + súng, **thiếu** 21 viên / Rulo.
- Lead-3: 3 câu đầu chưa tới tang vật.
- TextRank: có Rulo, 21 đạn, ma tuý.
- Hệ: Lead-3 (cắt tang vật); ViT5 (thiếu số liệu, không bịa).

## 000046.txt.seg — Bán em họ 14 tuổi

- Gold: Lang Thị Liên bán M. 14 tuổi sang Trung Quốc lấy chồng.
- ViT5: “cúi đầu thừa nhận tội … người buôn bán trẻ em” — generic, **không** nói bán em sang TQ.
- Lead-3: mới tới rủ trông con.
- TextRank: có bán cho người đàn ông Trung Quốc.
- Hệ: ViT5 + Lead-3 (cắt ý chính).

## 000051.txt.seg — Micro karaoke nổ

- Gold: công an Tân Phú điều tra nghi thuốc nổ trong micro, hai mẹ con bị thương.
- Lead-3: chỉ tạm trú vợ chồng anh N. — **gần như không có vụ nổ**.
- TextRank: Grab gửi micro, chưa nổ.
- ViT5: nổ khi sạc, bỏng mẹ và con 3 tuổi — khớp sự việc hơn gold ngắn.
- Hệ: Lead-3 (cắt ý nặng); TextRank (thiếu hậu quả).

## 000056.txt.seg — Giám đốc khách sạn Công đoàn đầu thú

- Gold: Phan Ngọc Khuê **ra đầu thú** sau khi bị truy nã.
- ViT5: chỉ nói lạm dụng chức vụ chiếm đoạt; **không** có đầu thú / truy nã. Chữ “giư chưc” lỗi.
- Lead-3 / TextRank: có đầu thú.
- Hệ: ViT5. Loại: cắt ý chính (đầu thú).

## 000061.txt.seg — Bác sĩ Hoàng Công Lương

- Gold: Lương phủ nhận mình là nguyên nhân chết bệnh nhân; đổ tồn dư hoá chất hệ thống RO.
- Lead-3: sát gold.
- ViT5: phủ nhận trách nhiệm nguồn nước, câu cắt “...” — đúng hướng, thiếu “tồn dư hoá chất”.
- TextRank: tranh luận trưởng khoa vs phòng vật tư — lệch gold.
- Hệ: TextRank (lệch gold); ViT5 (cắt, không bịa tên).

## 000066.txt.seg — An ninh 24h (nhiều tin)

- Gold: 4 tin (trộm 10.000 USD; bác sĩ Chiêm Quốc Thái; dụ bé gái; đôi bạn trộm thóc).
- ViT5: gần dạng bản tin, **lặp** “đôi bạn nghiện trộm cả thóc”; thiếu tin dụ bé gái.
- Lead-3: kẹt ở tin 1, câu đứt “Bà Ph. Th. Hele.”
- TextRank: trộn tin Thái + đoạn “Nghưu đau bụng / xoa bụng” từ tin khác.
- Hệ: cả ba. Loại: cắt / lặp / trộn tin (đặc thù gold là bản tin tổng hợp).

## 000071.txt.seg — Đâm đồng nghiệp karaoke Đắk Lắk

- Gold: cán bộ phòng Kinh tế hạ tầng đâm chết cán bộ quỹ đất trong quán karaoke.
- ViT5: “gây ra cái chết cho một cán bộ…” — mơ hồ, không nói karaoke / đâm.
- Lead-3: tạm giữ Nguyễn Minh Hải, chưa tới cú đâm (câu 3 mới vào quán).
- TextRank: có mâu thuẫn, đánh nhau, đầu thú.
- Hệ: ViT5 (cắt hành vi); Lead-3 (chưa tới ý gold).

## 000076.txt.seg — Thủ đoạn trùm ma tuý

- Gold: nhiều chuyên án (Lào Cai, Hà Tĩnh, Bắc Kạn, TP.HCM).
- ViT5: “Vụ án ma ma tuý nghi do người Việt cầm đầu thu giữ được công khai” — vụng, không địa danh.
- Lead-3: chỉ Lào Cai 329 bánh.
- TextRank: trộn số liệu Hà Tĩnh / Bắc Kạn.
- Hệ: ViT5 (vụng/bịa mờ); extractive (một chuyên án hoặc trộn).

## 000081.txt.seg — Lừa vào nhà nghỉ trộm vàng

- Gold: Công an Cà Mau điều tra cướp tại U Minh, cuối tháng 3/2019; nguồn chiều 5/4.
- ViT5: “Sáng 28/3… Tuổi Trẻ… hơn 1 lượng vàng” — lệch thời điểm/nguồn so với gold.
- Lead-3: mới quen Zalo, chưa tới trộm.
- TextRank: vào nhà trọ, vàng — gần chuyện hơn.
- Hệ: Lead-3 (cắt); ViT5 (lệch mốc thời gian/nguồn).

## 000086.txt.seg — Cướp túi 250 triệu

- Gold: Tư và Thức cướp 250 triệu, chia nhau, sắm xe, bị bắt.
- ViT5: “cướp tài sản **của vợ**” — sai (cướp túi vợ nạn nhân, không phải vợ bị can); không có 250 triệu / tên.
- Lead-3: đủ tên, 250 triệu, ép xe.
- TextRank: nghiêng tiền án Tư, ít hiện trường cướp.
- Hệ: ViT5 (sai quan hệ “vợ”); TextRank (lệch gold).

---

## Tổng (20 bài)

| Hiện tượng | Số bài (ước, theo ghi trên) | Hệ |
|---|---|---|
| Sai tên / gãy tên / gán nhầm người | 4 | ViT5: 000001, 000021, 000036; (000011 đối tượng) |
| Bịa hoặc đảo sự thật | 4 | ViT5: 000003, 000011, 000031, 000036 |
| Cắt mất ý gold | nhiều | Lead-3: 000051, 000066, 000081, 000046; ViT5: 000006, 000056, 000071 |
| Lặp / câu vụng | 3 | ViT5: 000016, 000066, 000076 |
| Trộn nhiều tin / caption | 3 | TextRank: 000066, 000076, 000006 |
| Không thấy lỗi rõ so với gold | 1 | 000026 |

**Rút ra (cho slide, không phóng đại):**

1. ROUGE ViT5 cao hơn một chút trên 100 bài **không** bảo đảm đúng tên/số — 000001, 000011, 000036 là ví dụ.
2. Lead-3 an toàn về sự thật (câu lấy từ bài) nhưng hay **lệch gold** vì gold là sapo/kết luận, 3 câu đầu thân bài là diễn biến.
3. TextRank đôi khi nhảy giữa đoạn hoặc trộn tin trong bài tổng hợp (000066).
4. Gold dạng “an ninh 24h” (nhiều tin một bài) cả ba hệ đều yếu.
