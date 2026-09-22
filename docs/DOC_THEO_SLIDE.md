# Bài đọc khi thuyết trình

Đọc cùng [CS221-Vietnews-bao-ve.pptx](../slides/CS221-Vietnews-bao-ve.pptx). Mười tám slide. Hết slide tài liệu thì dừng và nhận câu hỏi. Không có slide hỏi đáp.

Cách dùng: nhìn tiêu đề slide, đọc mục **Đọc**. Mục **Nếu được hỏi** chỉ mở khi thầy hỏi. Không đọc mục đó nếu không có câu hỏi.

Thời lượng gợi ý, khoảng 15 phút: slide 1 đến 4 khoảng 3 phút, slide 5 đến 11 khoảng 6 phút, slide 12 đến 14 khoảng 4 phút, slide 15 khoảng 1 phút trên slide rồi chuyển sang máy, slide 16 đến 18 khoảng 1 phút.

## Slide 1. Bìa

**Trên slide:** đề tài, Lead-3, TextRank, ViT5 dùng checkpoint có sẵn, tên ba thành viên nhóm 14.

**Đọc:** Nhóm em trình bày đề tài so sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt. Rút trích là lấy câu có sẵn trong bài. Tóm lược ở đây dùng checkpoint ViT5 đã được công bố. Nhóm không huấn luyện model. Câu hỏi của nhóm là: trên cùng một tập test, ba cách này khác nhau thế nào khi đo ROUGE, và khi đọc lại bài thì mỗi cách sai kiểu gì.

## Slide 2. Vì sao cần tóm tắt

**Trên slide:** bài báo dài, bản ngắn hơn, bản ngắn có thể bỏ ý hoặc thêm ý.

**Đọc:** Một bài báo có thể dài vài trăm từ. Người đọc thường chỉ cần vài câu đúng việc chính. Hệ đọc phần thân bài rồi viết lại thành bản ngắn hơn. Bản ngắn không phải lúc nào cũng an toàn. Nó có thể bỏ mất ý quan trọng, hoặc viết thêm một chi tiết mà bài gốc không nói. Vì vậy nhóm không chỉ tạo ra bản tóm tắt, mà còn phải xem bản đó giữ ý đến đâu.

## Slide 3. Mục tiêu

**Trên slide:** so sánh Lead-3, TextRank và ViT5 trên cùng tập test. Mỗi lần tóm một bài.

**Đọc:** Nhóm chạy ba cách trên dữ liệu Vietnews, chấm bằng ROUGE, rồi đọc một số bài để xem sai chỗ nào. Mỗi lần hệ chỉ tóm một bài. Trong bài giảng có hướng gom nhiều bài lại rồi tóm tắt. Đồ án này không đi hướng đó. Nhóm để từng bài một, để so sánh cho rõ.

**Nếu được hỏi:** “Đóng góp của nhóm là gì?” Nhóm triển khai ba cách trên cùng tập, chấm cùng một thước đo, và chỉ ra lỗi khi đọc bài. Nhóm không xây model mới.

## Slide 4. Đầu vào và đầu ra

**Trên slide:** đầu vào là thân bài, đầu ra là bản tóm tắt, sapo chỉ để chấm.

**Đọc:** Đầu vào là phần thân của một bài tiếng Việt. Tiêu đề chỉ để biết đó là bài nào. Đầu ra là một bản ngắn. Lead-3 và TextRank lấy câu có sẵn trong thân bài. ViT5 viết câu mới. Khi chấm, nhóm so với sapo của bài. Sapo là bản mẫu để tính ROUGE. ViT5 không được đọc sapo. Nếu đưa sapo vào model rồi so lại với chính sapo, hệ đã biết đáp án từ trước. Khi kiểm một câu có đúng việc hay không, nhóm đọc lại thân bài, vì sapo không chứa mọi chi tiết của bài.

## Slide 5. Hai cách

**Trên slide:** rút trích giữ câu, tóm lược viết câu mới. Bài 000011: máy ủi thành xe bồn.

**Đọc:** Rút trích giữ nguyên câu trong bài, nên ít bịa chữ mới, nhưng câu lấy ra có thể cụt hoặc lệch sapo. Tóm lược viết câu mới, đọc có thể trôi hơn, nhưng có thể sai tên, sai số, hoặc đảo người làm việc. Trong tập test, bài 000011 kể việc thuê xe chở máy ủi. Cách rút trích giữ nguyên câu ấy. ViT5 đổi thành trộm xe bồn. Đây là một bài thật, không phải ví dụ nhóm tự đặt.

## Slide 6. Dữ liệu và công trình

**Trên slide:** Vietnews, checkpoint ViT5, tập test đã tách từ, 100 bài thử và 500 bài báo cáo.

**Đọc:** Nhóm dùng bộ Vietnews đã công bố, trên GitHub ThanhChinhBK/vietnews. Model là checkpoint VietAI vit5-base-vietnews-summarization, đi cùng bài báo NAACL 2022. Phần nhóm chấm là tập test. Trong file, từ đã được tách bằng dấu gạch dưới, ví dụ học_sinh. Nhóm làm thử trên 100 bài đầu. Số đưa vào báo cáo là 500 bài đầu, lấy theo thứ tự tên file, từ 000001 đến 000500.

**Nếu được hỏi:** “Có trộn tập train không?” Không. Nhóm chỉ lấy phần test có sẵn, đúng thứ tự tên file.

## Slide 7. Cách chạy

**Trên slide:** đọc file, tách câu, lấy câu ViT5 đã lưu, chấm ROUGE.

**Đọc:** Từ một file bài báo đến một điểm ROUGE có bốn bước. Trước hết đọc file, lấy tiêu đề, sapo và thân bài. Sau đó tách câu. Lead-3 và TextRank tính trên máy từ các câu đó. ViT5 dùng câu đã viết sẵn và lưu lại, nên lúc bảo vệ không chạy model lại. Cuối cùng so bản tóm tắt với sapo bằng ROUGE-1, ROUGE-2 và ROUGE-L.

## Slide 8. Tiền xử lý

**Trên slide:** dấu gạch dưới có sẵn, cách nối câu, lúc chấm thì đổi dấu thành khoảng trắng.

**Đọc:** Nhóm không tách từ lại. Trong file Vietnews, học_sinh đã là một từ. Mỗi dòng thường là một câu. Nếu dòng chưa hết câu, nhóm nối tiếp đến khi gặp dấu chấm. Lúc chấm, dấu gạch dưới ở cả bản tóm tắt và sapo được đổi thành khoảng trắng, rồi tách theo khoảng trắng. Làm vậy để chữ của ViT5 và chữ của sapo so được với nhau.

## Slide 9. Lead-3

**Trên slide:** lấy tối đa ba câu đầu. Tin thường nêu việc chính ở câu đầu.

**Đọc:** Lead-3 lấy tối đa ba câu đứng đầu thân bài. Bài chỉ có hai câu thì giữ hai câu. Nhóm không sắp xếp lại và không chấm câu nào quan trọng hơn. Tin thường nêu việc chính ngay câu đầu, nên cách này có thể điểm khá cao dù rất đơn giản. Nhóm dùng nó làm mốc, để xem TextRank và ViT5 có hơn cách đơn giản này hay không.

## Slide 10. TextRank

**Trên slide:** TF-IDF, cosine, PageRank 40 vòng với damping 0.85, lấy ba câu theo thứ tự gốc.

**Đọc:** TextRank chọn câu trong chính bài đó, không học tham số từ bài khác. Mỗi câu thành một vector TF-IDF. Cosine cho biết hai câu giống nhau đến đâu. PageRank chạy 40 vòng, damping 0.85, để câu nào giống nhiều câu khác thì được điểm cao. Nhóm lấy ba câu điểm cao và giữ đúng thứ tự chúng xuất hiện trong bài. Đây vẫn là rút trích. Nhóm chưa thêm bước phạt hai câu trùng ý.

**Nếu được hỏi:** “TF-IDF là gì, nói ngắn?” Một từ hiếm trong bài thì nặng hơn một từ xuất hiện khắp nơi. Câu được biểu diễn bằng các trọng số đó, rồi so độ giống với câu khác.

## Slide 11. ViT5

**Trên slide:** checkpoint VietAI, trọng số giữ nguyên, tối đa 1.024 token vào và 256 token ra.

**Đọc:** ViT5 ở đây là checkpoint VietAI/vit5-base-vietnews-summarization. Checkpoint này đã được huấn luyện để tóm tắt Vietnews. Việc của nhóm là cho model đọc bài và viết tóm tắt. Trọng số giữ nguyên, nhóm không cập nhật thêm. Đầu vào là thân bài, thêm ký hiệu kết thúc, dài tối đa 1.024 token. Mỗi bản tóm tắt dài tối đa 256 token. 256 là giới hạn token khi gọi model, không phải 256 từ tiếng Việt.

## Slide 12. Thiết lập

**Trên slide:** 100 bài rồi 500 bài, ba cách cùng danh sách bài, cùng ROUGE, ViT5 sinh một lần trên Kaggle.

**Đọc:** Nhóm cho ba cách nhìn cùng các bài test và chấm cùng một cách. Tập 100 là bài 000001 đến 000100, chạy trước. Tập 500 là bài 000001 đến 000500, trong đó có cả 100 bài kia. Điểm báo cáo là F1 của ROUGE-1, ROUGE-2 và ROUGE-L. Câu của ViT5 được sinh một lần trên Kaggle rồi lưu thành file. Lúc bảo vệ nhóm đọc file đó.

## Slide 13. Kết quả 500 bài

**Trên slide:** Lead-3 0.2569 / 0.1294 / 0.1856. TextRank 0.2499 / 0.1198 / 0.1815. ViT5 0.2784 / 0.1474 / 0.2233. Lead-1 là 0.2719.

**Đọc:** Trên 500 bài, ViT5 cao hơn Lead-3 và TextRank ở cả ba cột. ROUGE-1 của Lead-3 là 0.2569, TextRank là 0.2499, ViT5 là 0.2784. TextRank không cao hơn cách lấy ba câu đầu. Nếu chỉ lấy một câu đầu, ROUGE-1 đã là 0.2719. ViT5 chỉ hơn mức đó một ít. Đây là số nhóm tính trên tập của nhóm. Bài báo chấm theo cách khác, nên nhóm không đặt bảng của bài báo cạnh bảng này.

**Nếu được hỏi:** “Vì sao TextRank thấp hơn Lead-3?” Nhóm chỉ thấy điểm trung bình thấp hơn. Ý chính của tin thường nằm ở đầu bài, còn TextRank chọn câu giống các câu khác. Nhóm chưa làm thêm thí nghiệm để chứng minh một nguyên nhân duy nhất.

## Slide 14. Hai bài đọc tay

**Trên slide:** bài 000021 sai tên, ROUGE-1 0.5161 trên bảng 100 bài. Bài 000011 máy ủi thành xe bồn.

**Đọc:** Bảng điểm chưa đủ. Nhóm đọc thân bài. Ở bài 000021, trong bài Nguyễn Văn Được dùng dây dù siết cổ bạn gái. ViT5 viết thành Nguyễn “Văn” được cho là đã dùng dây dù. Tên Được bị tách thành “được cho là”. Bài này vẫn đạt ROUGE-1 bằng 0.5161 trên bảng 100 bài, vì nhiều chữ khác vẫn trùng. Ở bài 000011, thân bài nói Nguyễn Văn Tú thuê xe chở máy ủi đem bán. ViT5 viết trộm được xe bồn. Xe bồn không có trong thân bài. Hai lỗi này đối chiếu với bài gốc, không chỉ với sapo.

**Nếu được hỏi:** “0.5161 có phải trung bình 500 bài không?” Không. Đó là điểm của riêng bài 000021 trong bảng 100 bài. Trung bình 500 bài của ViT5 là 0.2784.

## Slide 15. Demo

**Trên slide:** ba cột Lead-3, TextRank, ViT5 trên cùng một bài. ViT5 lấy câu đã lưu.

**Đọc:** Demo đặt ba bản trên cùng một bài. Lead-3 là ba câu đầu. TextRank là ba câu được chọn trong thân bài. ViT5 là câu viết mới, lấy từ kết quả đã lưu.

**Việc làm trên máy, không đọc thành các bước:** trong thư mục project chạy `docker run --rm -p 7860:7860 vietnews-demo`, mở http://127.0.0.1:7860, chọn một bài, đọc thân bài, rồi chỉ một chỗ ViT5 khác bài. Image phải được build trước bằng `docker build -t vietnews-demo .`. Không cài Python trên máy bảo vệ.

## Slide 16. Kết luận

**Trên slide:** ViT5 cao hơn về chữ trùng. Lead-3 vẫn là mốc mạnh. Đọc tay vẫn thấy sai tên và sai đồ vật. Nhóm mới đọc khoảng 20 bài.

**Đọc:** Trên 500 bài, ViT5 có ROUGE cao hơn Lead-3 và TextRank, nhưng chỉ hơn cách lấy một câu đầu một ít. Lead-3 vẫn là mốc mạnh vì ý của tin thường ở đầu bài. Khi đọc tay, ViT5 vẫn sai tên và sai đồ vật. ROUGE chỉ đo phần chữ trùng với sapo. Nhóm mới đọc khoảng 20 bài, chưa đọc hết 500 bài. Cách chấm trong bài báo khác cách nhóm chấm, nên hai bảng không đặt cạnh nhau.

## Slide 17. Nếu làm tiếp

**Trên slide:** đọc thêm bài, xử lý sapo gom nhiều tin, nếu train sau thì không dùng bài đang chấm.

**Đọc:** Nếu làm tiếp, nhóm muốn đọc thêm bài và đếm lỗi tên, số, đồ vật. Hiện mới đọc khoảng 20 bài. Một số sapo gom vài sự việc trong một bản. Những bài đó cần tách tin trước khi tóm. Nếu sau này có train, các bài đang dùng để chấm sẽ để riêng, không đưa vào lúc cập nhật model. Ba việc này nằm ngoài phần nhóm đã làm hôm nay.

## Slide 18. Tài liệu

**Trên slide:** Vietnews, bài ViT5 trên ACL Anthology, checkpoint Hugging Face, repo của nhóm.

**Đọc:** Bốn nguồn này để đối chiếu lại. Dữ liệu Vietnews ở github.com/ThanhChinhBK/vietnews. Bài báo ViT5 ở aclanthology.org/2022.naacl-srw.18. Checkpoint ở huggingface.co/VietAI/vit5-base-vietnews-summarization. Code của nhóm ở github.com/hoangdq08/vietnews-summarization-extractive-abstractive. Nhóm xin dừng phần trình bày ở đây.

## Ba câu nên trả lời được

1. Vì sao không train? Vì nhóm so sánh checkpoint đã có, không xây model mới.
2. Vì sao ViT5 hơn mà vẫn chưa đủ? Vì điểm ROUGE chỉ hơn một ít so với một câu đầu, và khi đọc bài vẫn sai tên, sai đồ vật.
3. Đóng góp là gì? Chạy ba cách trên cùng tập, chấm cùng một cách, và đưa ra hai bài đọc được từ thân bài.
