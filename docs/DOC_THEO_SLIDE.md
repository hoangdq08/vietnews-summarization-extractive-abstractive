# Bài đọc khi thuyết trình

Mở [CS221-Vietnews-bao-ve.pptx](../slides/CS221-Vietnews-bao-ve.pptx), đọc đúng 18 slide. Hết slide tài liệu thì dừng, chờ thầy hỏi. Không có slide hỏi đáp.

Nhìn tiêu đề slide, đọc mục **Đọc**. Mục **Nếu được hỏi** chỉ nói khi thầy hỏi.

Khoảng 15 phút: slide 1 đến 4 chừng 3 phút, slide 5 đến 11 chừng 6 phút, slide 12 đến 14 chừng 4 phút, slide 15 khoảng 1 phút trên slide rồi chuyển sang máy, slide 16 đến 18 chừng 1 phút.

## Slide 1. Bìa

**Trên slide:** đề tài, Lead-3, TextRank, ViT5 dùng checkpoint có sẵn, tên ba thành viên nhóm 14, giáo viên hướng dẫn TS. Đặng Văn Thìn.

**Đọc:** Em chào thầy. Nhóm em làm đề tài so sánh tóm tắt rút trích và tóm lược trên tin tiếng Việt. Phần tóm lược nhóm dùng checkpoint ViT5 có sẵn, không train thêm.

## Slide 2. Vì sao cần tóm tắt

**Trên slide:** bài báo dài, bản ngắn hơn, bản ngắn có thể bỏ ý hoặc thêm ý.

**Đọc:** Bài báo thường dài. Người đọc chỉ cần vài câu nói đúng việc. Bản ngắn có thể bỏ mất ý, cũng có thể viết thêm chi tiết bài gốc không có.

## Slide 3. Mục tiêu

**Trên slide:** so sánh Lead-3, TextRank và ViT5 trên cùng tập test. Mỗi lần tóm một bài.

**Đọc:** Nhóm chạy Lead-3, TextRank và ViT5 trên cùng tập test. Mỗi lần chỉ tóm một bài, để ba cách so được với nhau.

**Nếu được hỏi:** “Đóng góp của nhóm là gì?” Dạ, nhóm chạy ba cách trên cùng một tập, chấm cùng một thước đo, rồi chỉ ra lỗi khi đọc bài. Nhóm không làm model mới.

## Slide 4. Đầu vào và đầu ra

**Trên slide:** đầu vào là thân bài, đầu ra là bản tóm tắt, sapo chỉ để chấm.

**Đọc:** Đầu vào là thân bài. Sapo chỉ dùng để chấm. Nhóm không đưa sapo vào ViT5, vì làm vậy là model đã thấy đáp án.

## Slide 5. Hai cách

**Trên slide:** rút trích giữ câu, tóm lược viết câu mới. Bài 000011: máy ủi thành xe bồn.

**Đọc:** Rút trích giữ nguyên câu trong bài. ViT5 viết câu mới, nên dễ sai việc. Bài 000011 kể thuê xe chở máy ủi. ViT5 lại viết thành trộm xe bồn.

## Slide 6. Dữ liệu và công trình

**Trên slide:** Vietnews, checkpoint ViT5, tập test đã tách từ, 100 bài thử và 500 bài báo cáo.

**Đọc:** Dữ liệu là Vietnews đã công bố. Nhóm chấm 500 bài test đầu. Trong file, từ đã được nối bằng dấu gạch dưới.

**Nếu được hỏi:** “Có trộn tập train không?” Dạ không. Nhóm chỉ lấy phần test có sẵn, đúng thứ tự tên file.

## Slide 7. Cách chạy

**Trên slide:** đọc file, tách câu, lấy câu ViT5 đã lưu, chấm ROUGE.

**Đọc:** Lead-3 và TextRank tính ngay trên máy. ViT5 lấy câu đã sinh sẵn, lúc bảo vệ không chạy model lại.

## Slide 8. Tiền xử lý

**Trên slide:** dấu gạch dưới có sẵn, cách nối câu, lúc chấm thì đổi dấu thành khoảng trắng.

**Đọc:** Nhóm không tách từ lại. Lúc chấm mới đổi dấu gạch dưới thành khoảng trắng, để so với sapo.

## Slide 9. Lead-3

**Trên slide:** lấy tối đa ba câu đầu. Tin thường nêu việc chính ở câu đầu.

**Đọc:** Lead-3 lấy ba câu đầu. Tin thường nêu việc chính ngay câu mở, nên cách này là mốc để xem hai cách kia có hơn được không.

## Slide 10. TextRank

**Trên slide:** TF-IDF, cosine, PageRank 40 vòng với damping 0.85, lấy ba câu theo thứ tự gốc.

**Đọc:** TextRank chọn câu ngay trong bài đang tóm. Mỗi câu thành vector TF-IDF, đo độ giống bằng cosine, rồi PageRank 40 vòng, damping 0.85. Lấy ba câu điểm cao, giữ đúng thứ tự trong bài.

**Nếu được hỏi:** “TF-IDF là gì, nói ngắn?” Dạ, từ nào hiếm trong bài thì nặng hơn từ nào gặp khắp nơi. Câu được viết bằng các trọng số đó, rồi so với câu khác.

## Slide 11. ViT5

**Trên slide:** checkpoint VietAI, trọng số giữ nguyên, tối đa 1.024 token vào và 256 token ra.

**Đọc:** ViT5 là checkpoint VietAI đã train để tóm tin Vietnews. Nhóm không cập nhật trọng số. Đầu vào tối đa 1.024 token, bản tóm tắt tối đa 256 token.

## Slide 12. Thiết lập

**Trên slide:** 100 bài rồi 500 bài, ba cách cùng danh sách bài, cùng ROUGE, ViT5 sinh một lần trên Kaggle.

**Đọc:** Ba cách nhìn cùng 500 bài và chấm cùng một kiểu ROUGE.

## Slide 13. Kết quả 500 bài

**Trên slide:** Lead-3 0.2569 / 0.1294 / 0.1856. TextRank 0.2499 / 0.1198 / 0.1815. ViT5 0.2784 / 0.1474 / 0.2233. Lead-1 là 0.2719.

**Đọc:** ROUGE-1 của Lead-3 là 0.2569, TextRank là 0.2499, ViT5 là 0.2784. Chỉ lấy một câu đầu thì đã được 0.2719. ViT5 chỉ hơn mức đó một ít. Đây là số nhóm tự tính, không lấy từ bài báo.

**Nếu được hỏi:** “Vì sao TextRank thấp hơn Lead-3?” Dạ, nhóm chỉ thấy điểm trung bình thấp hơn. Ý chính của tin thường nằm ở đầu bài, còn TextRank chọn câu giống nhiều câu khác. Nhóm chưa làm thêm thí nghiệm để chỉ một nguyên nhân.

## Slide 14. Hai bài đọc tay

**Trên slide:** bài 000021 sai tên, ROUGE-1 0.5161 trên bảng 100 bài. Bài 000011 máy ủi thành xe bồn.

**Đọc:** Điểm cao chưa chắc đúng. Bài 000021, tên Nguyễn Văn Được bị ViT5 cắt thành được cho là, mà ROUGE-1 vẫn 0.5161 trên bảng 100 bài. Bài 000011, máy ủi thành xe bồn.

**Nếu được hỏi:** “0.5161 có phải trung bình 500 bài không?” Dạ không. Đó là điểm riêng của bài 000021 trong bảng 100 bài. Trung bình 500 bài của ViT5 là 0.2784.

## Slide 15. Demo

**Trên slide:** ba cột Lead-3, TextRank, ViT5 trên cùng một bài. ViT5 lấy câu đã lưu.

**Đọc:** Ba cột này là cùng một bài. ViT5 lấy câu đã lưu. Em mở demo.

**Vừa làm vừa nói:** Sang tab http://127.0.0.1:7860. Ô Bài test, gõ 000011. "Đây là bài thuê xe chở máy ủi. Ô tóm tắt mẫu là sapo. Lead-3 và TextRank vẫn nói máy ủi, vì lấy câu có trong bài. ViT5 viết trộm xe bồn. Xe bồn không có trong bài." Nếu còn giờ, mở mục Thí nghiệm A/B, chọn 000011, bấm Xem đối chiếu A/B. "Bản A giữ dấu gạch dưới. Bản B đổi thành khoảng trắng. Cả hai đều sinh sẵn. Điểm của B có thể cao hơn, nhưng em không nói B đúng việc hơn." Quay lại slide.

## Slide 16. Kết luận

**Trên slide:** ViT5 cao hơn về chữ trùng. Lead-3 vẫn là mốc mạnh. Đọc tay vẫn thấy sai tên và sai đồ vật. Nhóm mới đọc khoảng 100 bài.

**Đọc:** Trên 500 bài, ViT5 trùng chữ với sapo nhiều hơn hai cách kia, nhưng so với một câu đầu thì chỉ hơn một ít. Đọc tay 100 bài, ViT5 vẫn sai tên và sai đồ vật. ROUGE chỉ đo chữ trùng, không đo câu có đúng việc hay không.

## Slide 17. Nếu làm tiếp

**Trên slide:** đọc thêm bài, xử lý sapo gom nhiều tin, nếu train sau thì không dùng bài đang chấm.

**Đọc:** Nếu làm tiếp, nhóm muốn đọc thêm và đếm lỗi. Có sapo gom nhiều tin, nên tách ra trước khi tóm. Nếu sau này có train, các bài đang dùng để chấm phải để riêng.

## Slide 18. Tài liệu

**Trên slide:** Vietnews, bài ViT5 trên ACL Anthology, checkpoint Hugging Face, repo của nhóm.

**Đọc:** Bốn nguồn này để thầy đối chiếu: dữ liệu Vietnews, bài báo ViT5, checkpoint và code của nhóm. Em xin dừng phần trình bày ở đây ạ.

## Câu hỏi và đáp án

Chỉ nói khi thầy hỏi. Không đọc hết mục này trong bài.

1. Đề tài làm gì? Dạ, nhóm so sánh hai cách tóm một bài tin tiếng Việt. Rút trích lấy câu có sẵn. Tóm lược dùng checkpoint ViT5 có sẵn. Nhóm xem điểm ROUGE và xem mỗi cách sai kiểu gì.
2. Khác bài giảng đa văn bản thế nào? Đồ án này mỗi lần chỉ tóm một bài. Không gom nhiều bài, không dùng BERT và K-Means.
3. Vì sao không train? Nhóm đang so checkpoint VietAI đã công bố, không xây model mới. Trọng số giữ nguyên.
4. Số trên slide có phải số của bài báo không? Không. Đó là số nhóm tự chấm trên 500 bài test đầu, từ 000001 đến 000500. Bài báo chấm theo cách khác, nên nhóm không đặt hai bảng cạnh nhau.
5. Đóng góp của nhóm là gì? Chạy Lead-3, TextRank và ViT5 trên cùng tập, chấm cùng một cách, rồi chỉ ra hai bài sai khi đọc thân bài. Nhóm không làm model mới.
6. Lead-3 hoạt động ra sao? Lấy tối đa ba câu đầu thân bài. Bài chỉ có hai câu thì lấy hai câu. Không học gì. Tin thường nêu việc chính ở câu đầu, nên nhóm lấy cách này làm mốc.
7. TextRank chọn câu thế nào? Trong từng bài, mỗi câu thành vector TF-IDF. Cosine đo hai câu giống nhau. PageRank chạy 40 vòng, damping 0.85. Lấy ba câu điểm cao, giữ đúng thứ tự trong bài. Vẫn là rút trích. Nhóm chưa phạt hai câu trùng ý.
8. TF-IDF là gì? Từ nào hiếm trong bài thì nặng hơn từ nào gặp khắp nơi. Câu được viết bằng các trọng số đó rồi đem so với câu khác.
9. ViT5 nhóm dùng thế nào? Checkpoint VietAI/vit5-base-vietnews-summarization. Đầu vào là thân bài, tối đa 1.024 token. Đầu ra tối đa 256 token. 256 là giới hạn lúc gọi model, không phải 256 từ. Câu đã sinh một lần trên Kaggle, lưu trong results/preds_500.json. Lúc bảo vệ không chạy model lại.
10. Sapo dùng để làm gì? Sapo chỉ để chấm ROUGE. Không đưa vào ViT5. Đưa sapo vào rồi so lại với chính sapo thì model đã thấy đáp án. Muốn biết câu có đúng việc không thì đọc thân bài.
11. ROUGE-1, ROUGE-2, ROUGE-L khác nhau thế nào? Nhóm báo F1. ROUGE-1 đếm từ đơn trùng sapo. ROUGE-2 đếm cặp từ liền nhau. ROUGE-L lấy chuỗi con chung dài nhất. Trước khi chấm, nhóm đổi dấu gạch dưới thành khoảng trắng rồi tách theo khoảng trắng. ROUGE cao không có nghĩa câu đúng sự thật.
12. Đọc ba số ROUGE-1 trên 500 bài. Lead-3 là 0.2569. TextRank là 0.2499. ViT5 là 0.2784. Chỉ lấy một câu đầu thì ROUGE-1 đã là 0.2719. ViT5 chỉ hơn mức đó một ít.
13. Vì sao TextRank thấp hơn Lead-3? Nhóm chỉ thấy điểm trung bình thấp hơn. Ý chính của tin thường ở đầu bài, còn TextRank chọn câu giống nhiều câu khác. Nhóm chưa làm thêm thí nghiệm để chỉ một nguyên nhân.
14. 0.5161 là số gì? Đó là ROUGE-1 của riêng bài 000021 trong bảng 100 bài, không phải trung bình 500 bài. Trung bình 500 bài của ViT5 là 0.2784. Trong bài, Nguyễn Văn Được dùng dây dù siết cổ bạn gái. ViT5 viết thành được cho là. Nhiều chữ khác vẫn trùng sapo nên điểm vẫn cao.
15. Bài 000011 sai gì? Thân bài nói Nguyễn Văn Tú thuê xe chở máy ủi đem bán. ViT5 viết trộm được xe bồn. Xe bồn không có trong thân bài.
16. Demo có chạy model không? Không. Lead-3 và TextRank tính trong container. ViT5 lấy câu đã lưu. Mở bằng docker run --rm -p 7860:7860 vietnews-demo, vào http://127.0.0.1:7860.
17. Oracle là gì? Oracle-3 được nhìn sapo rồi chọn ba câu trong thân bài cho ROUGE-1 cao nhất. Trên 500 bài, ROUGE-1 của Oracle-3 là 0.4646. Đây là trần của cách rút trích, không phải hệ nhóm mang đi dùng.
18. Vì sao không bỏ gạch dưới trước khi đưa vào ViT5? Nhóm có thử trên 100 bài khác. ROUGE-1 tăng từ 0.3007 lên 0.3243, nhưng 44 bài giảm. Bài 000402, bản bỏ gạch dưới đổi người tát từ học sinh sang cô giáo. Điểm chữ tăng không chứng minh câu đúng hơn, nên pipeline chính vẫn giữ gạch dưới.
19. Đã có người chấm độc lập chưa? Chưa. Nhóm mới đọc khoảng 100 bài. Phiếu hai người còn để trống. Nhóm không gọi đó là human evaluation.
20. Nếu train sau thì làm sao? Các bài đang dùng để chấm phải để riêng, không đưa vào lúc cập nhật model.
