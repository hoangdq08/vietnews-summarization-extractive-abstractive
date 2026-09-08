Số bài có lệch số (gold vs ViT5): 64 / 100
Cột miss = số trong gold không thấy trong pred. extra = số pred không có trong gold.
Chưa phải lỗi đã xác nhận — đọc tay: results/number_diff_verified.md (7 sai/ảo giác số, 13 sót số then chốt).

## 000001.txt.seg
gold nums: ['25', '2', '1994', '12']
pred nums: ['3.2']
miss: ['25', '2', '1994', '12']  extra: ['3.2']
GOLD: Ngày 25/2 , TAND TP. Đà_Nẵng tuyên_phạt Hồ_Xuân_Huy ( SN 1994 ) , ngụ quận Hải_Châu , 12 năm tù về tội Lừa_đảo chiếm_đoạt tài_sản .
VIT5: Để có tiền sử_dụng cá nhân, sĩ quan công an Bùi Quang Huy ( tức Vũ " nhôm " ) đã lừa và chiếm đoạt 3,2 tỷ đồng của nhiều người.

## 000004.txt.seg
gold nums: ['10', '2', '2']
pred nums: []
miss: ['10', '2', '2']  extra: []
GOLD: Liên_quan đến vụ gây_rối tại trạm thu phí trên đường_cao_tốc TP. HCM - Long_Thành - Dầu_Giây vào chiều 10/2 , VEC tuyên_bố cấm vĩnh_viễn phục_vụ 2 phương_tiện trên các tuyến đường đơn_vị này khai_thác .
VIT5: Liên quan đến việc VEC quyết định từ 'chối vĩnh_viễn hai xe ô tô đi lại trên đường cao tốc TP. HCM - Long_Thành - Dầu_giây gây ùn tắc giao thông cục bộ, LS Trương -Thanh_Đức, công ty Luật BASICO khẳng định đây là việc làm vô cùng 'lý'và nực cười.

## 000005.txt.seg
gold nums: ['9']
pred nums: ['28', '5']
miss: ['9']  extra: ['28', '5']
GOLD: Bà Huỳnh_Ngọc_Bích được mọi người biết đến là “ nữ_hoàng lục_bình ” đã được VKSND tỉnh Sóc_Trăng xin_lỗi công_khai vì đã gây ra oan sai suốt 9 năm .
VIT5: Sáng 28/5, lãnh đạo VKSND tỉnh Sóc_Trăng đã tổ chức xin lỗi công khai đối với bà Huỳnh_Ngọc_Bích, Giám đốc hợp tác xã Ngọc_Bích, người bị buộc tội tham nhũng.

## 000006.txt.seg
gold nums: ['700000']
pred nums: []
miss: ['700000']  extra: []
GOLD: Bằng trả phòng và tính tiền thì xảy ra mâu_thuẩn với chủ nhà_trọ . Sau đó , Bằng đã dùng dao đâm chết nạn_nhân cướp máy_tính bảng rồi mang đi bán 700.000 đồng và bỏ trốn .
VIT5: Đến thuê phòng nghỉ sau đó trả phòng, Bằng cầm dao đâm chết chủ nhà trọ rồi cướp tài sản đi bán lấy tiền.

## 000007.txt.seg
gold nums: ['9', '5', '2']
pred nums: []
miss: ['9', '5', '2']  extra: []
GOLD: Cơ_quan điều_tra xác_định , vụ tai_nạn chìm tàu khiến 9 người thiệt_mạng trên vùng_biển Cần_Giờ 5 năm trước có trách_nhiệm của ông Đảo và Quyết nên đề_nghị truy_tố 2 người này .
VIT5: Vụ chìm tàu xảy ra tại huyện Cần Giờ ( TP. HCM ) là do tàu chở quá số người cho_phép, sử dụng sai công_dụng và đi vào vùng_biển Cần Giờ là vùng không được phép hoạt động.

## 000008.txt.seg
gold nums: ['2', '12', '2', '1']
pred nums: []
miss: ['2', '12', '2', '1']  extra: []
GOLD: Bị_cáo Tuyết bị cấp sơ_thẩm 2 lần tuyên_phạt 12 năm tù . Bị_cáo Tuyết kháng_cáo , nên 2 lần vụ án được đưa ra xét_xử phúc_thẩm và đều có chung 1 kết_quả , huỷ_án …
VIT5: Bị 'cáo'Tuyết kháng cáo kêu oan và được toà đưa ra xét xử theo thủ tục chung, nhưng vẫn chưa  định  được số phận của bị cáo .

## 000010.txt.seg
gold nums: []
pred nums: ['2', '1']
miss: []  extra: ['2', '1']
GOLD: Khi đi thả lưới , người_dân hoảng_hốt phát_hiện thi_thể không đầu , không chân . Ngay sau đó , người_dân trình_báo sự_việc đến cơ_quan_chức_năng .
VIT5: Khi đang thả lưới ở lòng'sông thuỷ 'điện Sông_Tranh 2, người dân hoảng hốt phát hiện thi thể 1 thi thể trơ xương, không có phần đầu và chân.

## 000012.txt.seg
gold nums: ['3']
pred nums: ['03', '21', '45', '26', '8']
miss: ['3']  extra: ['03', '21', '45', '26', '8']
GOLD: Sau khi gây tai_nạn khiến 3 người bị_thương nặng , tài_xế nhanh_chóng bỏ trốn . Những_tưởng manh_mối truy bắt đối_tượng rơi vào ngõ_cụt thế nhưng từ chiếc kia morning đời cũ , Công_an huyện Cẩm_Xuyên đã lần theo được dấu_vết …
VIT5: Dần được xác định là tài_xế đã gây ra vụ tai_nạn giao thông nghiêm trọng, khiến 03 người bị_thương nặng rồi bỏ trốn vào 21h45 tối ngày 26/8.

## 000013.txt.seg
gold nums: ['2']
pred nums: []
miss: ['2']  extra: []
GOLD: Liên_quan vụ 2 vợ_chồng bị giết ở Hưng_Yên , nghi_phạm Đinh_Công_Tráng đã khai nhận về phút đối_mặt với các nạn_nhân .
VIT5: Trong quá trình bị bắt, nghi phạm Đinh_C Công_Tráng rất ngoan_cố, quanh co, chối tội. Hắn thường xuyên đi lang_thang để xem gia_đình nào sơ hở, không khoá cửa thì đột_nhập vào nhà để trộm đồ_sản. Nếu là lấy cắp được đồ_sản thì đem bán lấy tiền ăn_tiêu.

## 000016.txt.seg
gold nums: []
pred nums: ['10']
miss: []  extra: ['10']
GOLD: Sống với nhau như vợ_chồng nhưng không đăng_ký kết_hôn , đến khi chia_tay , Cường giành quyền nuôi con không được nên đã mang xăng đến cửa_hàng của “ vợ ” để đốt . Đối_tượng đang bị cơ_quan công_an truy bắt .
VIT5: Một nam thanh niên mặc áo "khoác đen ", quần nâu đi giày trắng, đeo khẩu trang đến trước cửa nhà số 10 ngõ Hoàng_Quý, phường Trần_Nguyên_Hãn vô cùng hoảng loạn khi một nam thanh niên đến tẩm xăng rồi châm lửa đốt nhà, thản_nhiên bỏ đi.

## 000019.txt.seg
gold nums: []
pred nums: ['2', '3']
miss: []  extra: ['2', '3']
GOLD: Trong đêm mưa , công_an tiếp_nhận tin trình_báo của một người đàn_ông cho_rằng vừa bị cướp chém đứt gân tay để cướp xe . Vào_cuộc điều_tra , công_an phát_hiện phía sau tin trình_báo trên là một sự_thật đau_lòng .
VIT5: Sau khi bị 2 đối tượng lạ mặt chém đứt gân tay, người đàn ông này cũng khai, bị con trai của đối tượng chém đứt 3 ngón tay.

## 000020.txt.seg
gold nums: []
pred nums: ['1', '2']
miss: []  extra: ['1', '2']
GOLD: Cơ_quan công_an đã sàng_lọc hàng trăm đối_tượng khác nhau , từ những hình_ảnh nhận_dạng của nhân_chứng và hình_ảnh camera an_ninh xung_quanh khu_vực ....
VIT5: Lực_lượng chức_năng Công an tỉnh Bình_Dương đã phát hiện manh mối từ chiếc xe và nhóm nghi " can ", cùng với 1 số máy quay tại hiện trường để tìm 2 thi_thể trong thùng bê_tông.

## 000022.txt.seg
gold nums: ['2', '2', '2']
pred nums: ['2', '108']
miss: []  extra: ['108']
GOLD: Trên đường đi mua kính , 2 cô_gái bất_ngờ gặp nhóm thanh_niên đi xe_máy trêu_ghẹo . Không lâu sau , 2 thanh_niên này gọi thêm người đến đánh 2 cô_gái phải nhập_viện .
VIT5: Thấy 2 thanh_niên đi xe_máy đuổi theo và trêu_ghẹo, hai cô gái dừng xe trước Bệnh viện 108 và lên tiếng chống trả thì bị một nhóm thanh mới lao tới đánh hội 'đồng '.

## 000023.txt.seg
gold nums: ['2']
pred nums: []
miss: ['2']  extra: []
GOLD: Sau khi dùng kéo đâm chết nạn_nhân , Nhựt nhanh_chóng rời khỏi hiện_trường , bỏ trốn và bị cơ_quan công_an phát lệnh truy_nã . Hơn 2 tháng lẩn_trốn , Nhựt bị trinh_sát bắt_giữ .
VIT5: Theo cơ quan điều tra, Nhựt đã bị lực lượng chức năng tỉnh Đồng "Tháp " bắt giữ khi đang lẩn trốn tại thị xã Tân_Hồng.

## 000024.txt.seg
gold nums: ['9']
pred nums: []
miss: ['9']  extra: []
GOLD: Còn có đồng_phạm nào khác trong vụ môi_giới mại_dâm nghìn đô của Kiều_Đại_Dũ ? Theo lời khai của “ tú ông ” 9X dần hé lộ những kẻ môi_giới núp sau hai tài_khoản zalo là “ Thanh_Thanh ” và “ Bảo_Bảo ” .
VIT5: Khai với toà, Kiều_Đại_Dũ nói chỉ có " đào " gái bán_dâm, không chỉ có Á hậu, MC nổi tiếng, mà trong đường'đào'gái bán_dâm của Dũ còn có Á hậu, MC nổi tiếng.

## 000025.txt.seg
gold nums: ['2', '1', '2', '2']
pred nums: []
miss: ['2', '1', '2', '2']  extra: []
GOLD: Tranh giành chiếc xe cầm cố , 2 nhóm đối tượng xảy ra mâu thuẫn dẫn đến đánh nhau khiến 1 nạn nhân bị súng bắn mù 2 mắt , 2 người còn lại bị thương nặng .
VIT5: Khiêp sơ, các nhóm thanh niên lâp trang bị súng điên cao su, súng bắn đạn cao su và tiên thưc xông vào hôn chiên. Vụ viêc xảy ra tại Đức_Thọ, tỉnh Hà Tĩnh.

## 000027.txt.seg
gold nums: []
pred nums: ['400']
miss: []  extra: ['400']
GOLD: Khi đang giao_nhận vó bò để làm hàng ăn , ông H. đã bị một đối_tượng tại axit vào người . Ông H. và một người khác đã bị_thương rất nặng .
VIT5: Sáng sớm tập thể_dục, ông H. dậy sớm tập thể_dục. Đi qua khu nhà mình khoảng 400m, ông H. và ông T. bị tạt axit vào người và tử vong sau đó.

## 000028.txt.seg
gold nums: ['5', '3']
pred nums: ['1', '3', '5']
miss: []  extra: ['1']
GOLD: Sau trong 5 giây , thanh_niên đã dùng búa phá tủ kính tiệm vàng cướp đi 3 sợi dây_chuyền .
VIT5: Camera an ninh ghi lại đối tượng cầm theo 1 cây búa đến tiệm vàng, dùng búa đập tủ kính lấy 3 sợi dây_chuyền. Toàn bộ hành trình dùng búa đập và cướp vàng chỉ diễn ra trong khoảng 5 giây.

## 000029.txt.seg
gold nums: []
pred nums: ['8', '10']
miss: []  extra: ['8', '10']
GOLD: Sau khi xảy ra vụ tai_nạn khiến Trung_uý quân_đội tử_vong , cơ_quan công_an đã xác_định được tài_xế điều_khiển ô_tô liên_quan đến vụ_việc .
VIT5: Liên quan đến vụ tai_nạn trên đường Hồ Chí Minh, đoạn qua Buôn Ma Thuột ( Đắk Lắk ), sáng 8/10, Công an thị xã Buôn Ma Thuột đã trích xuất dữ liệu từ camera an ninh để truy tìm phương tiện gây tai nạn và làm rõ nguyên nhân.

## 000030.txt.seg
gold nums: ['6']
pred nums: []
miss: ['6']  extra: []
GOLD: Trong cái nắng oi_ả một ngày cuối tháng 6 , cặp đôi “ song Tú ” bị TAND TP. Hà_Nội đưa ra xét_xử về tội Cướp tài_sản .
VIT5: Để có tiền tiêu xài, Đặng_Tú đã rủ Nguyễn_Tú lên kế hoạch đi cướp taxi của anh Thái. Sau đó, chúng sẽ dùng bình xịt hơi cay xịt vào mặt tài xế xế taxi để cướp xe.

## 000032.txt.seg
gold nums: ['2018', '300', '32', '5']
pred nums: ['5']
miss: ['2018', '300', '32']  extra: []
GOLD: Những ngày cuối năm 2018 , gần 300 cán_bộ chiến_sĩ Công_an TP. Thanh_Hoá đã tiến_hành vây_ráp 32 cơ_sở kinh_doanh tín_dụng đen trên địa_bàn tỉnh , bắt tạm giam 5 đối_tượng cầm_đầu để phục_vụ công_tác điều_tra .
VIT5: Công an TP. Thanh_Hoá, tỉnh Thanh_Hoá vừa khởi tố vụ án, khởi tố bị can và ra lệnh bắt tạm giam với 5 nghi phạm liên quan đến hành vi tín dụng đen trên địa bàn.

## 000034.txt.seg
gold nums: ['2', '2', '2']
pred nums: []
miss: ['2', '2', '2']  extra: []
GOLD: Chỉ trong 2 ngày , Vĩnh và Hải đã thực_hiện 2 vụ đột_nhập vào nhà dân ăn_trộm gây hoang_mang dư_luận địa_phương . Đặc_biệt , lợi_dụng sơ_hở của gia_chủ , 2 đối_tượng này gây án “ nhanh như chớp ” .
VIT5: Hai vụ đột_nhập vào nhà trộm tài_sản liên tiếp xảy ra ở Quảng_Bình, tỉnh Quảng Tây, khiến người dân hoang mang, lo lắng.

## 000036.txt.seg
gold nums: ['7000', '1.1']
pred nums: ['27', '1750000']
miss: ['7000', '1.1']  extra: ['27', '1750000']
GOLD: Không thừa_nhận được “ trùm ” cờ_bạc tặng đồng_hồ Rolex 7.000 USD , ông Phan_Văn_Vĩnh khai rằng trả tiền mua chiếc đồng_hồ này với giá 1,1 tỷ đồng , nhưng sau đó đã làm mất .
VIT5: Theo cáo trạng truy vấn, ông Phan_Văn_Vĩnh đã khai cho ông Vĩnh 27 tỷ đồng và 1.750.000 USD. Tuy nhiên, do có sự mâu thuẫn về lời khai của ông Vĩnh nên cơ quan An_ninh điều tra đã tách hành vi của ông Phan_Văn_Vĩnh và ông Vĩnh.

## 000037.txt.seg
gold nums: []
pred nums: ['17', '25']
miss: []  extra: ['17', '25']
GOLD: Trong vai tú_bà chuyên môi_giới bán mại_dâm cho người nước_ngoài , Nghĩa lừa_đảo cả tình lẫn tiền_của nhiều cô_gái trẻ đẹp .
VIT5: Thông qua hình ảnh trên mạng internet, Nghĩa giới thiệu nhiều thiếu nữ đẹp có tuổi từ 17 đến 25 tuổi tìm đến một điểm bán " tú bà " thu mua bán "dâm " giá cao.

## 000039.txt.seg
gold nums: ['2100']
pred nums: []
miss: ['2100']  extra: []
GOLD: Phiên_toà liên_quan đến vụ ly_hôn của vợ_chồng “ vua cà_phê ” Trung_Nguyên vẫn chưa có hồi kết , bởi những khúc_mắc liên_quan đến số tài_sản trong ngân_hàng trị_giá trên 2.100 tỷ đồng của cặp vợ_chồng này .
VIT5: Ông Đặng_Lê_Nguyên_Vũ cho biết ông không mong muốn mọi chuyện kéo dài như_vậy, chỉ mong sớm kết thúc mọi chuyện, để_dành thời gian phát triển Trung_Nguyên.

## 000041.txt.seg
gold nums: ['9', '21', '1']
pred nums: ['1994', '10']
miss: ['9', '21', '1']  extra: ['1994', '10']
GOLD: Công_an TP. HCM tạm giữ nam thanh_niên 9X do có hành_vi tàng_trữ khẩu súng Rulo , 21 viên đạn và vận_chuyển 1 bịch ma_tuý đá .
VIT5: Cơ quan CSĐT Công_an TP. HCM thông tin, đang tạm giữ Nguyễn_Quốc_Dũng ( SN 1994, ngụ quận 10, TP. HCM ) do có hành vi vận chuyển ma_tuý đá và tàng trữ súng, đạn.

## 000042.txt.seg
gold nums: ['31']
pred nums: ['12', '6', '16', '16']
miss: ['31']  extra: ['12', '6', '16', '16']
GOLD: Cơ_quan CSĐT CAQ Hoàng_Mai , Hà_Nội vừa bắt_giữ được đối_tượng Bùi_Thị_Ngọc_Anh , 31 tuổi , trú tại phường Hồng_Hà , thành_phố Hạ_Long , tỉnh Quảng_Ninh trốn truy_nã về hành_vi lừa_đảo chiếm_đoạt tài_sản .
VIT5: Theo thông tin mới nhất, ngày 12/6, Công an tỉnh Quảng Ninh và Công an tỉnh Quảng Nam đã bắt được nạn nhân Bùi Thị Ngọc " tin ". Trước đó, nạn nhân đã bị đối tượng lừa " chiếm " 16 tỷ đồng trong tổng số tiền 16 tỷ đồng.

## 000043.txt.seg
gold nums: ['3', '7', '2', '1']
pred nums: ['30', '35']
miss: ['3', '7', '2', '1']  extra: ['30', '35']
GOLD: Sáng mùng 3 tết ( 7/2 ) người_dân huyện Krông_Nô ( Đắk_Nông ) không khỏi hãi_hùng khi tìm thấy 1 thi_thể nữ_giới trôi_dạt trên sông .
VIT5: Bước_đầu xác_thể nạn nhân là nữ, khoảng 30-35 tuổi, chưa rõ tung_tích, trên người không có giấy tờ tuỳ thân.

## 000044.txt.seg
gold nums: ['20', '20']
pred nums: []
miss: ['20', '20']  extra: []
GOLD: Mới bước sang tuổi 20 nhưng Việt_Anh đang phải thụ_án 20 năm tù vì tội Giết người . Phải trả_giá cho tội_ác bằng nhiều năm tù khi còn quá trẻ , nam phạm_nhân luôn cắn_rứt lương_tâm với nỗi hối_hận chất chồng .
VIT5: Trong số các phạm nhân bị kết án tù tại trại_giam Đắk_Plao ( tỉnh Đắk Nông ), có một phạm nhân khá đặc biệt : Việt Anh. Bởi, nhìn thấy vết sẹo trên đầu, Việt Anh buồn_đớn và luôn tìm cách xin mẹ tha thứ.

## 000045.txt.seg
gold nums: []
pred nums: ['7', '11']
miss: []  extra: ['7', '11']
GOLD: Liên_quan vụ nữ_sinh giao gà bị giết , đối_tượng Vì Văn_Toán - kẻ được cho là cầm_đầu vụ án đã khai rằng , sau khi bắt_giữ nữ_sinh Cao_Mỹ_D. , nhóm đối_tượng này có liên_lạc với mẹ nạn_nhân .
VIT5: Sau khi cơ quan tố tụng tỉnh Điện Biên và bộ Công an có quyết định khởi tố vụ án nữ sinh giao gà bị giết, sáng nay ( 7/11 ), các tình_tiết của vụ án đã dần sáng rõ.

## 000046.txt.seg
gold nums: ['14']
pred nums: []
miss: ['14']  extra: []
GOLD: Vì hám_lợi , Lang_Thị_Liên nhẫn_tâm bán cả M. , em_gái họ 14 tuổi sang Trung_Quốc để lấy chồng .
VIT5: Tại phiên_toà, bị_cáo Lang_Thị_Liên đã cúi đầu thừa nhận tội, đồng thời khai nhận toàn bộ hành vi của mình với người buôn bán trẻ_em

## 000048.txt.seg
gold nums: []
pred nums: ['11', '3']
miss: []  extra: ['11', '3']
GOLD: Qua quá_trình điều_tra , cơ_quan điều_tra xác_định chị H. giết Trung là do phòng_vệ chính_đáng .
VIT5: Cơ quan chức năng xác định, Trung đôt nhâp vào nhà chị H. đêm ngày 11/3 không có mục đích trôm tài sản mà chỉ có ý định duy nhât là giêt ngươi.

## 000049.txt.seg
gold nums: ['3', '1']
pred nums: ['2']
miss: ['3', '1']  extra: ['2']
GOLD: Phát_hiện một đối_tượng mang hàng xâm_nhập biên_giới trái_phép , tổ công_tác đồn Biên_phòng Bát_Mọt ( Thanh_Hoá ) tổ_chức kiểm_tra , bắt_giữ . Bất_ngờ , đồng_bọn của kẻ này đã bắn nhiều phát đạn về phía đội_hình khiến 3 sỹ quan trúng đạn , 1 thiếu_tá đã hi_sinh .
VIT5: Trong khi tuần tra kiểm soát vùng biên giới, một thiếu niên thuộc bộ 'Chỉ 'huy bộ_đội Biên_phòng tỉnh Thanh, Mỹ và 2 chiến_sĩ bị trúng đạn.

## 000050.txt.seg
gold nums: ['4']
pred nums: []
miss: ['4']  extra: []
GOLD: 4 đối_tượng không nghề_nghiệp ổn_định , rủ nhau xuống TP. Huế thuê nhà_nghỉ rồi cắt trộm cáp viễn_thông bán lấy tiền tiêu_xài .
VIT5: Lợi dụng đêm tối, các đối_tượng đã thực hiện hàng loạt vụ trộm, gây thiệt hại hàng trăm triệu đồng.

## 000051.txt.seg
gold nums: []
pred nums: ['3']
miss: []  extra: ['3']
GOLD: Công_an quận Tân_Phú , TP. HCM đang phối_hợp các đơn_vị nghiệp_vụ Công_an điều_tra làm rõ nghi_án đặt thuốc_nổ trong micro hát karaoke khiến hai mẹ_con bị_thương .
VIT5: Một chiếc micro hát karaoke được gửi đến cho vợ chồng anh N., sau đó chị cắm vào ổ điện để sạc pin thì bất ngờ phát nổ. Vụ nổ khiến chị T. bị cháy quần áo, bỏng hai bên đùi, hai tay và con gái 3 tuổi.

## 000052.txt.seg
gold nums: ['16', '4', '4', '10']
pred nums: ['7', '4']
miss: ['16', '10']  extra: ['7']
GOLD: Cô_gái 16 tuổi được cho là bạn gái của hung_thủ đâm chết anh Mai_Xuân_Lan hôm 4/4 bất_ngờ xuất_hiện tại đám_tang , đưa có gia_đình 10 triệu đồng và đòi ghi_âm việc vợ anh L. có nhận của thiếu_nữ số tiền này
VIT5: Liên quan đến vụ thiếu nữ đâm chết người vì nhắc_niên vượt đèn đỏ, sáng 7/4, nguồn tin mới nhất cho hay, thiếu nữ này đã lên gặp vợ nạn nhân và có hành vi đáng ngờ.

## 000053.txt.seg
gold nums: []
pred nums: ['31', '2', '21']
miss: []  extra: ['31', '2', '21']
GOLD: Sau khi tiến_hành đấu_tranh , Đinh_Thị V.A . thừa_nhận sinh con trong nhà_vệ_sinh xong nhưng bé đã chết nên đã vứt qua khe cửa_sổ xuống đất .
VIT5: Liên quan đến vụ bé sơ_sinh rơi từ tầng 31 chung cư HH2A, khu vực đô thị Linh_Đàm, quận Hoàng_Mai, Hà 'Nội. được xác định là Đinh_Thị V.A. ( 21 tuổi, quê tại Quảng Bình ). khai nhận sau khi sinh con, nhận_nhận bé trai đã tử_vong nên đã ném con xuống đất qua cửa sổ nhà vệ sinh.

## 000054.txt.seg
gold nums: ['16']
pred nums: ['7', '4', '16']
miss: []  extra: ['7', '4']
GOLD: Liên_quan vụ nguyên Phó viện trưởng VKSND TP. Đà_Nẵng sàm_sỡ bé gái trong thang_máy , theo Thượng_tá Nguyễn_Xuân_Hùng , hành_vi của ông Linh có dấu_hiệu phạm_tội Dâm_ô với người dưới 16 tuổi .
VIT5: Thượng_tá Nguyễn_Xuân_Hùng cho rằng, hành vi của người đàn ông ôm hôn bé gái 7 tuổi trong thang_máy của một chung_cư ở quận 4, TP. HCM có dấu hiệu của hành vi Dâm ô với người dưới 16 tuổi.

## 000055.txt.seg
gold nums: ['50']
pred nums: ['2']
miss: ['50']  extra: ['2']
GOLD: Đôi nam_nữ cầm_đầu tổ_chức tín_dụng đen hơn 50 chi_nhánh trong cả nước đang bị Công_an TP. Thanh_Hoá ra quyết_định truy_nã .
VIT5: Phùng_Ngọc_Huy và Trần_Thị_Diệp là 2 đối tượng nằm trong nhóm tội_phạm chuyên cho vay nặng_lãi núp dưới bóng Công ty tài chính Tín_Nghĩa.

## 000057.txt.seg
gold nums: ['96', '30000']
pred nums: []
miss: ['96', '30000']  extra: []
GOLD: Ông Nguyễn_Chấn , 96 tuổi , chồng cố doanh_nhân Tư_Hường từng tổ_chức họp_báo tố_cáo chính con_trai là ông Nguyễn_Quốc_Toàn - Chủ_tịch HĐQT ngân_hàng Nam_Á và một_số cá_nhân khác tìm cách chiếm_đoạt gia_sản có giá_trị khoảng 30.000 tỷ .
VIT5: Theo lời ông Nguyễn_Chấn, với sự cấu_kết, tiếp tay của một_số cá nhân, người con_trai thứ của ông đã chiếm_giữ hết tài_sản của vợ_chồng ông Chấn  bà Tư_Hường.

## 000058.txt.seg
gold nums: ['2']
pred nums: []
miss: ['2']  extra: []
GOLD: 2 đối_tượng tên Hiếu cùng rủ nhau hỏ học rồi từ tỉnh Quảng_Nam ra TP. Đà_Nẵng cướp_giật tài_sản và bị bắt_giữ .
VIT5: Hai đối tượng này khai nhận đã bỏ học từ khi bắt đầu đến TP. Đà_Nẵng kiếm việc làm. Việc chưa tìm được thì họ đã cùng nhau cướp tài_sản và bị sa lưới.

## 000062.txt.seg
gold nums: ['12', '11']
pred nums: ['12', '11', '2']
miss: []  extra: ['2']
GOLD: Ông Phan_Văn_Vĩnh đã tự_nguyện viết đơn xin về trại để tham_dự phiên_toà xét_xử diễn ra vào ngày 12/11 của TAND tỉnh Phú_Thọ .
VIT5: Phiên xét xử ông Phan_Văn_Vĩnh sẽ diễn ra vào ngày 12/11 tới đây. Tuy 'lại'hơn 2 tháng qua nhưng các phiên xử đã được diễn ra.

## 000064.txt.seg
gold nums: ['5', '4']
pred nums: ['4']
miss: ['5']  extra: []
GOLD: Ngày 5/4 , Công_an thị_xã Lagi , tỉnh Bình_Thuận cho biết , đang lấy lời khai , điều_tra vụ một thanh_niên dùng dao và xăng doạ đốt người_yêu .
VIT5: Sau khi bị nhóm đối tượng bắt giữ, lực lượng chức năng đã truy tìm ra đối tượng còn lại, đang thủ sẵn 4 con dao và một chai xăng để tự vệ.

## 000065.txt.seg
gold nums: []
pred nums: ['2']
miss: []  extra: ['2']
GOLD: Có người đặt mua ma_tuý , Sơn đã liên_hệ với người đàn_ông Lào để lấy " hàng " . Khi đang giao_dịch cho khách hắn bị lực_lượng chức_năng bắt_giữ .
VIT5: Khi đang ở nhà thì một người đàn_ " cao thủ " đã liều mình đi lấy ma_tuý về bán kiếm lời bất chính. Khi đang giao dịch hàng, đối tượng này bị lực lượng chức năng bắt giữ cùng 2 gói ma_tuý hồng phiến.

## 000067.txt.seg
gold nums: ['7', '68000', '1121']
pred nums: ['3', '7', '68000', '1121']
miss: []  extra: ['3']
GOLD: VKSND Tối_cao vừa có quyết_định truy_tố 7 bị_can về hành_vi lừa_đảo hơn 68.000 bị hại để chiếm_đoạt trên 1.121 tỷ đồng . Trong đó có đối_tượng Lê_Xuân_Giang , " trùm đa_cấp " của công_ty lừa_đảo Liên_Kết_Việt .
VIT5: VKSTC - V 3 vừa kết thúc điều tra vụ án " Lừa_đảo chiếm_đoạt tài_sản " xảy ra tại Công_ty Liên_Kết_Việt. Trong đó, VKSND Tối_cao đã truy_tố 7 bị_can về hành vi lừa_đảo hơn 68.000 bị hại để chiếm_đoạt trên 1.121 tỷ đồng.

## 000068.txt.seg
gold nums: []
pred nums: ['8', '8', '1']
miss: []  extra: ['8', '8', '1']
GOLD: Để có tiền tiêu_xài , hai đối_tượng lên kế_hoạch đi cướp tài_sản của người_dân . Cả hai chuyên điều_khiển xe_máy với tốc_độ cao , áp sát người đi đường rồi cướp tài_sản của các nạn_nhân .
VIT5: Sau nhiều ngày gây ra 8 vụ trộm_cắp tài_sản trên địa bàn các quận Gò_Vấp và quận Gò_Vấp, TP. HCM, hai đối tượng khai nhận tổng cộng 8 vụ trộm_cắp tài_sản, cướp_giật tài_sản, trong đó chỉ có 1 vụ bị hại đến công an trình báo.

## 000069.txt.seg
gold nums: ['2', '200']
pred nums: ['200', '2', '14']
miss: []  extra: ['14']
GOLD: Sau khi đột_nhập vào căn biệt_thự của gia_đình ông Đinh_Quang_Minh ở khu_phố Kim_Đa , phường Ninh_Khánh ( TP. Ninh_Bình ) , Cửu châm lửa hút xì_gà . Đối_tượng tiếp_tục lẻn lên tầng 2 , dùng xà_cầy phá két sắt , lấy trộm 200 cây vàng rồi bỏ trốn .
VIT5: Trong phiên xử vụ trộm 200 cây vàng, TAND tỉnh Ninh_Bình đã tuyên phạt 2 bị cáo Nguyễn "Công " và Nguyễn "Công "Hoan 14 năm tù.

## 000072.txt.seg
gold nums: ['1963']
pred nums: []
miss: ['1963']  extra: []
GOLD: Người_ta thường nói “ Hổ dữ không ăn thịt con ” , thế_nhưng Nguyễn_Thị_Huế ( SN 1963 , ở thị_trấn Quang_Minh , huyện Mê_Linh , Hà_Nội ) lại đang tâm đoạt mạng chính con_đẻ của mình .
VIT5: Trong quá trình truy vấn, toà án tại Hà Nội đã mở phiên_toà sơ_thẩm xét_xử Nguyễn Thị_Thị_Huế về tội Giết người.

## 000075.txt.seg
gold nums: ['14', '5', '2019']
pred nums: ['2', '10']
miss: ['14', '5', '2019']  extra: ['2', '10']
GOLD: Ngày 14/5/2019 , TAND Tỉnh_Bắc_Ninh xét_xử vụ án trộm_cắp tài_sản “ khủng ” tại công_ty TNHH Samsung_Display Việt_Nam .
VIT5: Ngày 2/10, TAND tỉnh Bắc Ninh mở phiên xét xử sơ thẩm vụ án trộm_cắp tài sản xảy ra tại làng quê Việt Nam. Đến nay, vụ việc vẫn chưa được làm rõ.

## 000078.txt.seg
gold nums: ['5', '18']
pred nums: []
miss: ['5', '18']  extra: []
GOLD: Phiên_toà dự_kiến vào đầu tháng 5 để xét_xử kỹ_sư David_Xu vì đã âm_thầm đầu_độc nữ đồng_nghiệp trong suốt 18 tháng qua nguồn nước .
VIT5: Cô Rong_Yuan đã phát hiện nhiều dấu hiệu bị nhiễm độc cadimi, gây ảnh hưởng đến sức khoẻ khiến cả ba người đều gặp vấn đề sức khoẻ nghiêm trọng.

## 000079.txt.seg
gold nums: []
pred nums: ['18']
miss: []  extra: ['18']
GOLD: Mâu_thuẫn nhau trong quán bar , nhóm thanh_niên đa_phần là sinh_viên bị đánh thương_tích nên lên kế_hoạch trả_thù . Chúng vờ đặt mua hàng của một thanh_niên trong nhóm “ đối_thủ ” , khi thanh_niên này giao hàng đến thì chúng bao_vây , đánh hội_đồng rồi “ lột sạch ” tài_sản .
VIT5: Nhóm nghi - can cầm đầu vụ dàn cảnh cướp tài_sản trước siêu thị Lotte ở TP. HCM đang bị công an tạm giữ. Đáng chú ý, nghi phạm " cầm đầu " nhóm này còn rất trẻ, độ tuổi chưa đến 18...

## 000080.txt.seg
gold nums: ['6', '1']
pred nums: ['4', '3.4.5']
miss: ['6', '1']  extra: ['4', '3.4.5']
GOLD: Cơ_quan CSĐT Công_an tỉnh Thanh_Hoá vừa khởi_tố bị_can , bắt tạm giam nghi_phạm đâm_chém 6 cô trò , khiến 1 người chết ở Thanh_Hoá về tội Giết người .
VIT5: Cơ quan công_an tỉnh Thanh Hoá vừa khởi tố vụ án, khởi tố bị can, ra lệnh bắt tạm giam 4 tháng với Đỗ_Mãnh_Chiểu_Minh, kẻ đã đâm, chém loạn xạ học sinh các lớp 3,4,5.

## 000081.txt.seg
gold nums: ['5', '4', '3', '2019']
pred nums: ['28', '3', '1']
miss: ['5', '4', '2019']  extra: ['28', '1']
GOLD: Chiều_tối 5/4 , nguồn_tin của PV cho biết , Công_an tỉnh Cà_Mau đang điều_tra vụ cướp tài_sản xảy ra tại huyện U_Minh vào cuối tháng 3/2019.
VIT5: Sáng 28/3, nguồn tin của Tuổi Trẻ cho biết cơ quan công an đang điều tra vụ người phụ nữ bị lừa vào nhà lấy hơn 1 lượng vàng.

## 000082.txt.seg
gold nums: ['2']
pred nums: ['3', '1500', '2']
miss: []  extra: ['3', '1500']
GOLD: Căn nhà 2 tầng nằm trên đường Duy_Tân , phường Hoà_Thuận_Tây , quận Hải_Châu ( Đà_Nẵng ) bỗng bốc cháy ngùn_ngụt sau tiếng nổ lớn .
VIT5: Vụ hoả_hoạn tại căn nhà 3 tầng rộng hơn 1.500 m2 ở phường Hoà Xuân, quận Liên Chiểu, TP. Đà Nẵng đã thiêu rụi nhiều đồ đạc, tài sản.

## 000083.txt.seg
gold nums: []
pred nums: ['1']
miss: []  extra: ['1']
GOLD: Viện_kiểm_sát nhân_dân quận Cầu_Giấy vừa phê_chuẩn quyết_định khởi_tố bị_can đối_với tài_xế Doãn_Quý_Phiến để điều_tra , làm rõ về tội " Vô_ý làm chết người " .
VIT5: Ông Doãn_Quý_Phiến  người đưa đón học sinh lớp 1, trường Gateway bị khởi 'tố'hành vi'vô luật vô vô vô vô vô vô vô vô vô vô vô vô vô vô vô vô_ý làm chết người

## 000086.txt.seg
gold nums: ['250']
pred nums: []
miss: ['250']  extra: []
GOLD: Sau cướp 250 triệu đồng của nạn_nhân , Tư và Thức chia nhau tiêu_xài , sắm xe mới rồi bỏ trốn . Qua truy_xét , hai kẻ_cướp đã phải tra tay vào còng .
VIT5: Thực hiện hành vi cướp tài sản của vợ, hai đối tượng đang bị ngành chức năng điều tra, làm rõ.

## 000087.txt.seg
gold nums: ['1', '11', '2']
pred nums: []
miss: ['1', '11', '2']  extra: []
GOLD: Ập vào căn nhà tại địa_chỉ số 1 đường Quân_Sự , quận 11 ( TP. HCM ) , cơ_quan_chức_năng phát_hiện lô thuốc trị bệnh tim , xương khớp nhập lậu hơn 2 tỷ đồng .
VIT5: Hàng nghìn sản phẩm tân_dược nhập lậu từ Trung Quốc vừa bị lực lượng quản lý thị trường ập vào triệt phá.

## 000088.txt.seg
gold nums: ['1']
pred nums: []
miss: ['1']  extra: []
GOLD: Trong lúc đi thăm lúa , người_dân phát_hiện vật lạ dưới suối . Lại gần kiểm_tra thì tá_hoả thấy thi_thể 1 người phụ_nữ không mặc quần_áo , nên vội_vàng tri hô những người xung_quanh .
VIT5: Đi thăm ruộng lúa và hái măng, người đàn_ông phát hiện thi thể người phụ nữ đang trong quá trình phân huỷ mạnh. Hoảng_sợ, người đàn_ông liền vứt đồ_nghề lấy măng tại hiện trường.

## 000092.txt.seg
gold nums: ['2']
pred nums: []
miss: ['2']  extra: []
GOLD: Anh T. và chị M. mới ở trong giai_đoạn tìm_hiểu , yêu_đương . Việc cả 2 tử_vong trong căn nhà khiến gia_đình và chính_quyền hết_sức ngỡ_ngàng .
VIT5: Trước khi vụ việc đau lòng xảy ra, người nhà nạn nhân bàng hoàng phát hiện chị M. và anh T. chết trong tình trạng khoả thân.

## 000095.txt.seg
gold nums: []
pred nums: ['2']
miss: []  extra: ['2']
GOLD: Khi các đối_tượng đang vận_chuyển ma_tuý trên đường thì bị tổ tuần_tra của CLB Phòng_chống tội_phạm phát_hiện . Ngay sau đó , các đối_tượng đã tìm cách phi_tang vật_chứng , tuy_nhiên hành_vi này đã không qua mắt được tổ tuần_tra .
VIT5: 2 đối_tượng có hành vi Tàng_trữ trái phép chất ma_tuý. Sau khi bị phát hiện và bắt giữ, các đối_tượng đã bị lực lượng công an bắt giữ.

## 000096.txt.seg
gold nums: []
pred nums: ['50']
miss: []  extra: ['50']
GOLD: Khi các “ dân_chơi ” đang bay , lắc trong tiếng nhạc chát_chúa , lực_lượng Cảnh_sát Hình_sự Công_an TP. Hải_Phòng đã tiến_hành đột_kích , bắt_giữ hàng chục đối_tượng .
VIT5: Cơ quan công an vừa phối hợp với Công an TP. Hải Phòng triệt phá một " động lắc " khủng ở Hải Phòng. Qua xét nghiệm, phát hiện 50 đối tượng dương tính với các chất ma tuý.

## 000098.txt.seg
gold nums: ['25']
pred nums: ['1', '4', '1994']
miss: ['25']  extra: ['1', '4', '1994']
GOLD: Nữ nhân_viên tên M. đã có đơn gửi đến Công_an quận Hoàn_Kiếm , đề_nghị không xem_xét xử_lý hình_sự vụ_việc đối_với nam đồng_nghiệp 25 tuổi bị tố có hành_vi sờ ngực , bóp_cổ và đánh mình .
VIT5: Liên quan đến nghi vấn sàm sỡ cô gái trong nhà_hàng ở phố Ngô_Thì_Nhậm, quận Hoàn_Kiếm, TP. Hà 'Nội ), sáng ngày 1/4, lãnh đạo Công... phường Hàng_Bài cho biết đang làm việc với nam nhân_viên sinh năm 1994.

## 000099.txt.seg
gold nums: ['200']
pred nums: []
miss: ['200']  extra: []
GOLD: Các đối_tượng dùng tài_khoản đã có trên trang đánh_bạc nước_ngoài , truy_cập trực_tuyến các trận đá gà và tổ_chức cho nhóm con_bạc cá_cược ăn_thua bằng tiền quy_mô lớn , thu_giữ hơn 200 triệu đồng .
VIT5: Nhóm đối_tượng đánh_cược bằng tiền quy_mô lớn qua mạng vừa bị ngành chức năng bắt giữ.

## 000100.txt.seg
gold nums: ['17', '4', '18']
pred nums: ['29', '1']
miss: ['17', '4', '18']  extra: ['29', '1']
GOLD: Chiều_tối ngày 17/4 , PV báo Người Đưa_Tin có_mặt tại ngôi nhà nơi giam_giữ , hành_hung cô_gái 18 tuổi đến sảy thai . Ngôi nhà đóng kín cửa . Người_dân đều ngao_ngán khi nhắc đến người thuê trọ tại đây .
VIT5: Những ngày gần đây, người dân ở tổ 29, ấp 1B, xã Vĩnh_Lộc B, huyện Bình_Chính, TP. HCM rất bức xúc về vụ cô gái bị hành_hung đến sảy thai.
