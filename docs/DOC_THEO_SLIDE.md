# Bài đọc khi thuyết trình

Mở [CS221-Vietnews-bao-ve.pptx](../slides/CS221-Vietnews-bao-ve.pptx), đọc đúng 18 slide. Hết slide tài liệu thì dừng, chờ thầy hỏi. Không có slide hỏi đáp.

Nhìn tiêu đề slide, đọc mục **Đọc**. Mục **Nếu được hỏi** chỉ nói khi thầy hỏi.

Khoảng 15 phút: slide 1 đến 4 chừng 3 phút, slide 5 đến 11 chừng 6 phút, slide 12 đến 14 chừng 4 phút, slide 15 khoảng 1 phút trên slide rồi chuyển sang máy, slide 16 đến 18 chừng 1 phút.

## Slide 1. Bìa

**Trên slide:** đề tài, Lead-3, TextRank, ViT5 dùng checkpoint có sẵn, tên ba thành viên nhóm 14.

**Đọc:** Em chào thầy và các bạn. Nhóm em làm đề tài so sánh tóm tắt rút trích và tóm lược trên tin tiếng Việt. Rút trích là lấy câu có sẵn trong bài. Tóm lược thì nhóm dùng checkpoint ViT5 đã có sẵn, không train thêm. Nhóm muốn xem trên cùng tập test, ba cách này điểm ROUGE khác nhau thế nào, và mở bài ra thì mỗi cách sai ra sao.

## Slide 2. Vì sao cần tóm tắt

**Trên slide:** bài báo dài, bản ngắn hơn, bản ngắn có thể bỏ ý hoặc thêm ý.

**Đọc:** Bài báo thường dài vài trăm từ. Người đọc nhiều khi chỉ cần vài câu nói đúng việc chính. Chương trình lấy thân bài rồi viết lại cho ngắn. Bản ngắn không phải lúc nào cũng đúng ý. Có bài bị mất ý quan trọng. Có bài bị thêm chi tiết mà bài gốc không nói. Ra được bản tóm tắt chưa đủ. Nhóm còn phải xem nó giữ ý đến đâu.

## Slide 3. Mục tiêu

**Trên slide:** so sánh Lead-3, TextRank và ViT5 trên cùng tập test. Mỗi lần tóm một bài.

**Đọc:** Nhóm chạy ba cách trên dữ liệu Vietnews, chấm bằng ROUGE, rồi đọc một số bài xem sai chỗ nào. Mỗi lần chỉ tóm một bài. Bài giảng có hướng gom nhiều bài rồi tóm chung. Đồ án này không đi hướng đó. Nhóm để từng bài một cho dễ so.

**Nếu được hỏi:** “Đóng góp của nhóm là gì?” Dạ, nhóm chạy ba cách trên cùng một tập, chấm cùng một thước đo, rồi chỉ ra lỗi khi đọc bài. Nhóm không làm model mới.

## Slide 4. Đầu vào và đầu ra

**Trên slide:** đầu vào là thân bài, đầu ra là bản tóm tắt, sapo chỉ để chấm.

**Đọc:** Đầu vào là thân một bài tiếng Việt. Tiêu đề chỉ để biết đang nói bài nào. Đầu ra là bản ngắn. Lead-3 với TextRank lấy câu có sẵn trong thân bài. ViT5 viết câu mới. Lúc chấm, nhóm so với sapo. Sapo chỉ là bản mẫu để tính ROUGE, không đưa vào ViT5. Đưa sapo vào rồi so lại với chính sapo thì model đã thấy đáp án trước. Muốn biết một câu có đúng việc không thì đọc lại thân bài, vì sapo không ghi hết chi tiết.

## Slide 5. Hai cách

**Trên slide:** rút trích giữ câu, tóm lược viết câu mới. Bài 000011: máy ủi thành xe bồn.

**Đọc:** Rút trích giữ nguyên câu trong bài, nên ít bịa chữ mới. Đổi lại, câu lấy ra có thể cụt, hoặc không sát sapo. Tóm lược viết câu mới, nghe xuôi hơn, nhưng dễ sai tên, sai số, hoặc đảo người làm việc. Trong tập test, bài 000011 kể việc thuê xe chở máy ủi. Câu rút trích vẫn giữ ý đó. ViT5 viết thành trộm xe bồn.

## Slide 6. Dữ liệu và công trình

**Trên slide:** Vietnews, checkpoint ViT5, tập test đã tách từ, 100 bài thử và 500 bài báo cáo.

**Đọc:** Nhóm dùng bộ Vietnews đã công bố, GitHub ThanhChinhBK/vietnews. Model là checkpoint VietAI vit5-base-vietnews-summarization, đi cùng bài NAACL 2022. Phần nhóm chấm là tập test. Trong file, từ đã tách sẵn bằng gạch dưới, ví dụ học_sinh. Nhóm thử trước 100 bài đầu. Số đưa vào báo cáo là 500 bài đầu, theo thứ tự tên file, từ 000001 đến 000500.

**Nếu được hỏi:** “Có trộn tập train không?” Dạ không. Nhóm chỉ lấy phần test có sẵn, đúng thứ tự tên file.

## Slide 7. Cách chạy

**Trên slide:** đọc file, tách câu, lấy câu ViT5 đã lưu, chấm ROUGE.

**Đọc:** Từ file bài báo đến một điểm ROUGE, nhóm đi bốn bước. Đọc file, lấy tiêu đề, sapo và thân bài. Rồi tách câu. Lead-3 và TextRank tính luôn trên máy từ các câu đó. ViT5 lấy câu đã viết sẵn, lưu trong file, lúc bảo vệ không chạy model lại. Cuối cùng so với sapo bằng ROUGE-1, ROUGE-2 và ROUGE-L.

## Slide 8. Tiền xử lý

**Trên slide:** dấu gạch dưới có sẵn, cách nối câu, lúc chấm thì đổi dấu thành khoảng trắng.

**Đọc:** Nhóm không tách từ lại. File Vietnews đã ghi học_sinh là một từ. Mỗi dòng thường là một câu. Dòng nào chưa hết câu thì nối đến khi gặp dấu chấm. Lúc chấm, nhóm đổi gạch dưới ở cả bản tóm tắt lẫn sapo thành khoảng trắng, rồi tách theo khoảng trắng. Làm vậy thì chữ của ViT5 và chữ của sapo so được với nhau.

## Slide 9. Lead-3

**Trên slide:** lấy tối đa ba câu đầu. Tin thường nêu việc chính ở câu đầu.

**Đọc:** Lead-3 lấy tối đa ba câu đầu thân bài. Bài có hai câu thì lấy hai câu. Không xếp lại, cũng không chấm câu nào quan trọng hơn. Tin thường nêu việc chính ngay câu đầu, nên cách này điểm khá cao dù rất đơn giản. Nhóm lấy nó làm mốc, xem TextRank và ViT5 có hơn được không.

## Slide 10. TextRank

**Trên slide:** TF-IDF, cosine, PageRank 40 vòng với damping 0.85, lấy ba câu theo thứ tự gốc.

**Đọc:** TextRank chọn câu ngay trong bài đang tóm, không học tham số từ bài khác. Mỗi câu là một vector TF-IDF. Cosine đo hai câu giống nhau đến đâu. PageRank chạy 40 vòng, damping 0.85. Câu nào giống nhiều câu khác thì điểm cao. Nhóm lấy ba câu điểm cao và giữ đúng thứ tự trong bài. Vẫn là rút trích. Nhóm chưa phạt hai câu trùng ý.

**Nếu được hỏi:** “TF-IDF là gì, nói ngắn?” Dạ, từ nào hiếm trong bài thì nặng hơn từ nào gặp khắp nơi. Câu được viết bằng các trọng số đó, rồi so với câu khác.

## Slide 11. ViT5

**Trên slide:** checkpoint VietAI, trọng số giữ nguyên, tối đa 1.024 token vào và 256 token ra.

**Đọc:** ViT5 ở đây là checkpoint VietAI/vit5-base-vietnews-summarization. Checkpoint này đã được train để tóm tắt tin Vietnews. Nhóm chỉ đưa bài vào và lấy câu tóm tắt ra. Trọng số giữ nguyên, không cập nhật thêm. Đầu vào là thân bài, thêm ký hiệu kết thúc, dài tối đa 1.024 token. Bản tóm tắt dài tối đa 256 token. Số 256 là giới hạn lúc gọi model, không phải 256 từ tiếng Việt.

## Slide 12. Thiết lập

**Trên slide:** 100 bài rồi 500 bài, ba cách cùng danh sách bài, cùng ROUGE, ViT5 sinh một lần trên Kaggle.

**Đọc:** Ba cách nhìn cùng các bài test, và chấm cùng một kiểu. Tập 100 là bài 000001 đến 000100, nhóm chạy trước. Tập 500 là bài 000001 đến 000500, trong đó có cả 100 bài kia. Điểm báo cáo là F1 của ROUGE-1, ROUGE-2 và ROUGE-L. Câu ViT5 sinh một lần trên Kaggle rồi lưu file. Lúc đứng bảo vệ, nhóm chỉ đọc file đó.

## Slide 13. Kết quả 500 bài

**Trên slide:** Lead-3 0.2569 / 0.1294 / 0.1856. TextRank 0.2499 / 0.1198 / 0.1815. ViT5 0.2784 / 0.1474 / 0.2233. Lead-1 là 0.2719.

**Đọc:** Trên 500 bài, ViT5 cao hơn Lead-3 và TextRank ở cả ba cột. ROUGE-1 của Lead-3 là 0.2569, TextRank là 0.2499, ViT5 là 0.2784. TextRank không cao hơn cách lấy ba câu đầu. Chỉ lấy một câu đầu thì ROUGE-1 đã là 0.2719. ViT5 chỉ hơn mức đó một ít. Đây là số nhóm tự tính. Bài báo chấm theo cách khác, nên nhóm không kéo bảng của bài báo ra đặt cạnh.

**Nếu được hỏi:** “Vì sao TextRank thấp hơn Lead-3?” Dạ, nhóm chỉ thấy điểm trung bình thấp hơn. Ý chính của tin thường nằm ở đầu bài, còn TextRank chọn câu giống nhiều câu khác. Nhóm chưa làm thêm thí nghiệm để chỉ một nguyên nhân.

## Slide 14. Hai bài đọc tay

**Trên slide:** bài 000021 sai tên, ROUGE-1 0.5161 trên bảng 100 bài. Bài 000011 máy ủi thành xe bồn.

**Đọc:** Nhìn bảng chưa đủ. Nhóm mở thân bài ra đọc. Bài 000021, trong bài Nguyễn Văn Được dùng dây dù siết cổ bạn gái. ViT5 viết thành Nguyễn “Văn” được cho là đã dùng dây dù. Tên Được bị cắt thành “được cho là”. Bài này vẫn có ROUGE-1 bằng 0.5161 trên bảng 100 bài, vì nhiều chữ khác vẫn trùng. Bài 000011, thân bài nói Nguyễn Văn Tú thuê xe chở máy ủi đem bán. ViT5 viết trộm được xe bồn. Xe bồn không có trong thân bài. Hai chỗ này nhóm đối với bài gốc, không chỉ nhìn sapo.

**Nếu được hỏi:** “0.5161 có phải trung bình 500 bài không?” Dạ không. Đó là điểm riêng của bài 000021 trong bảng 100 bài. Trung bình 500 bài của ViT5 là 0.2784.

## Slide 15. Demo

**Trên slide:** ba cột Lead-3, TextRank, ViT5 trên cùng một bài. ViT5 lấy câu đã lưu.

**Đọc:** Demo để ba bản cạnh nhau, cùng một bài. Lead-3 là ba câu đầu. TextRank là ba câu được chọn trong thân bài. ViT5 là câu viết mới, lấy từ kết quả đã lưu.

**Khi đứng máy, không đọc thành lời:** trong thư mục project chạy `docker run --rm -p 7860:7860 vietnews-demo`, mở http://127.0.0.1:7860, chọn một bài, đọc thân bài, rồi chỉ một chỗ ViT5 khác bài. Image build trước bằng `docker build -t vietnews-demo .`. Máy bảo vệ không cần cài Python.

## Slide 16. Kết luận

**Trên slide:** ViT5 cao hơn về chữ trùng. Lead-3 vẫn là mốc mạnh. Đọc tay vẫn thấy sai tên và sai đồ vật. Nhóm mới đọc khoảng 100 bài.

**Đọc:** Trên 500 bài, ViT5 trùng chữ với sapo nhiều hơn Lead-3 và TextRank. So với một câu đầu thì chỉ hơn một ít. Lead-3 vẫn là mốc mạnh, vì tin hay để ý chính ở đầu bài. Đọc tay thì ViT5 vẫn sai tên và sai đồ vật. ROUGE chỉ đo phần chữ trùng với sapo. Nhóm mới đọc khoảng 100 bài, chưa đọc hết 500. Cách bài báo chấm khác cách nhóm chấm, nên hai bảng không đặt cạnh nhau.

## Slide 17. Nếu làm tiếp

**Trên slide:** đọc thêm bài, xử lý sapo gom nhiều tin, nếu train sau thì không dùng bài đang chấm.

**Đọc:** Nếu làm tiếp, nhóm muốn đọc thêm bài và đếm lỗi tên, lỗi số, lỗi đồ vật. Hiện mới khoảng 100 bài. Có sapo gom vài sự việc vào một đoạn. Những bài đó nên tách tin trước khi tóm. Nếu sau này có train, các bài đang dùng để chấm sẽ để riêng, không đưa vào lúc cập nhật model. Ba việc này nhóm chưa làm trong phần hôm nay.

## Slide 18. Tài liệu

**Trên slide:** Vietnews, bài ViT5 trên ACL Anthology, checkpoint Hugging Face, repo của nhóm.

**Đọc:** Bốn nguồn này để thầy và các bạn đối chiếu. Dữ liệu Vietnews ở github.com/ThanhChinhBK/vietnews. Bài ViT5 ở aclanthology.org/2022.naacl-srw.18. Checkpoint ở huggingface.co/VietAI/vit5-base-vietnews-summarization. Code nhóm ở github.com/hoangdq08/vietnews-summarization-extractive-abstractive. Em xin dừng phần trình bày ở đây ạ.

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
