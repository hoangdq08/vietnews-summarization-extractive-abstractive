#!/usr/bin/env python3
"""Báo cáo PDF CS221 — cùng số liệu với slide và results/."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).resolve().parent / "CS221-Vietnews-bao-cao.pdf"

FONT_REG = "/Library/Fonts/Arial Unicode.ttf"
if not Path(FONT_REG).exists():
    FONT_REG = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
pdfmetrics.registerFont(TTFont("ArialUni", FONT_REG))

INK = colors.HexColor("#1A1A1A")
MUTED = colors.HexColor("#5C574C")
ACCENT = colors.HexColor("#B8432A")
RULE = colors.HexColor("#C8C0AE")
CREAM = colors.HexColor("#F7F3E8")
DARK = colors.HexColor("#0B0B0B")
WARM = colors.HexColor("#F2E5D0")


def styles():
    base = getSampleStyleSheet()
    s = {
        "cover_kicker": ParagraphStyle(
            "cover_kicker", fontName="ArialUni", fontSize=10, textColor=MUTED,
            tracking=1, spaceAfter=8, alignment=TA_CENTER,
        ),
        "cover_title": ParagraphStyle(
            "cover_title", fontName="ArialUni", fontSize=20, leading=26,
            textColor=INK, alignment=TA_CENTER, spaceAfter=10,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub", fontName="ArialUni", fontSize=11, leading=16,
            textColor=ACCENT, alignment=TA_CENTER, spaceAfter=12,
        ),
        "cover_names": ParagraphStyle(
            "cover_names", fontName="ArialUni", fontSize=11, leading=17,
            textColor=INK, alignment=TA_CENTER, spaceAfter=8,
        ),
        "h1": ParagraphStyle(
            "h1", fontName="ArialUni", fontSize=14, leading=18,
            textColor=INK, spaceBefore=14, spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "h2", fontName="ArialUni", fontSize=12, leading=16,
            textColor=ACCENT, spaceBefore=10, spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body", fontName="ArialUni", fontSize=10.5, leading=15,
            textColor=INK, alignment=TA_JUSTIFY, spaceAfter=8,
        ),
        "bullet": ParagraphStyle(
            "bullet", fontName="ArialUni", fontSize=10.5, leading=15,
            textColor=INK, leftIndent=14, spaceAfter=4,
        ),
        "caption": ParagraphStyle(
            "caption", fontName="ArialUni", fontSize=9, leading=12,
            textColor=MUTED, spaceBefore=4, spaceAfter=10, alignment=TA_LEFT,
        ),
        "cell": ParagraphStyle(
            "cell", fontName="ArialUni", fontSize=9, leading=12, textColor=INK,
        ),
        "cell_h": ParagraphStyle(
            "cell_h", fontName="ArialUni", fontSize=9, leading=12, textColor=colors.white,
        ),
        "footer": ParagraphStyle(
            "footer", fontName="ArialUni", fontSize=8, textColor=MUTED,
        ),
    }
    return s


def P(text, st):
    return Paragraph(text, st)


def make_table(rows, col_widths, header=True):
    data = []
    for i, row in enumerate(rows):
        st = S["cell_h"] if header and i == 0 else S["cell"]
        data.append([P(c, st) for c in row])
    t = Table(data, colWidths=col_widths, repeatRows=1 if header else 0)
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("BACKGROUND", (0, 1), (-1, -1), CREAM),
    ]
    if header:
        cmds.append(("BACKGROUND", (0, 0), (-1, 0), DARK))
    t.setStyle(TableStyle(cmds))
    return t


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(MUTED)
    canvas.setFont("ArialUni", 8)
    canvas.drawString(2 * cm, 1.2 * cm, "CS221 · So sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt")
    canvas.drawRightString(A4[0] - 2 * cm, 1.2 * cm, str(doc.page))
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(2 * cm, 1.55 * cm, A4[0] - 2 * cm, 1.55 * cm)
    canvas.restoreState()


S = styles()


def story():
    st = []
    st += [
        Spacer(1, 3.2 * cm),
        P("ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH<br/>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN", S["cover_kicker"]),
        Spacer(1, 8),
        P("BÁO CÁO ĐỒ ÁN MÔN HỌC", S["cover_kicker"]),
        P("CS221 — Xử lý ngôn ngữ tự nhiên", S["cover_kicker"]),
        Spacer(1, 18),
        P("So sánh tóm tắt rút trích và tóm lược<br/>trên tin tức tiếng Việt", S["cover_title"]),
        P("A comparative study of extractive and abstractive summarization on Vietnews", S["cover_sub"]),
        P("Lead-3 · TextRank · ViT5 (checkpoint VietAI, không fine-tune)<br/>100 bài test đầu · ROUGE-1/2/L · đọc tay 20 bài", S["cover_sub"]),
        Spacer(1, 24),
        P("Nhóm 14", S["cover_kicker"]),
        P(
            "Nguyễn Trí Toàn — 26410135<br/>"
            "Nguyễn Văn Thái — 26410108<br/>"
            "Đỗ Quốc Hoàng — 26410043",
            S["cover_names"],
        ),
        P("GitHub: github.com/hoangdq08/vietnews-summarization-extractive-abstractive", S["caption"]),
        PageBreak(),
    ]

    st += [
        P("1. Tóm tắt", S["h1"]),
        P(
            "Báo cáo so sánh ba hệ tóm tắt tin tức tiếng Việt trên 100 bài đầu của "
            "tập test Vietnews (test_tokenized): Lead-3, TextRank, và checkpoint "
            "<font color='#B8432A'>VietAI/vit5-base-vietnews-summarization</font>. "
            "Nhóm không fine-tune ViT5. Độ đo là ROUGE-1/2/L (F1) sau khi thay dấu gạch dưới "
            "bằng khoảng trắng trên cả bản tóm tắt và gold. ViT5 đạt ROUGE cao hơn một chút "
            "(R-1 = 0,2664) so với Lead-3 (0,2507) và TextRank (0,2428). Đọc tay 20 bài cho "
            "thấy ViT5 vẫn sai tên, đảo polarity và bịa chi tiết; Lead-3 ít bịa nhưng hay lệch gold.",
            S["body"],
        ),
        P("2. Đặt vấn đề", S["h1"]),
        P(
            "Tin điện tử dài. Người đọc và tòa soạn cần bản ngắn. Máy làm theo hai hướng: "
            "<b>rút trích</b> (chọn câu có sẵn) và <b>tóm lược</b> (sinh câu mới). "
            "Câu hỏi nghiên cứu: trên cùng tập test tiếng Việt, ba hệ khác nhau thế nào về ROUGE, "
            "và khi đọc tay thì mỗi hệ sai kiểu gì?",
            S["body"],
        ),
        P(
            "Phạm vi cố ý không làm: fine-tune lại ViT5 trên Vietnews (trùng miền pretrain); "
            "tóm tắt đa văn bản BERT+K-Means (trùng bài giảng 8); crawl dữ liệu mới.",
            S["body"],
        ),
        P("3. Bài toán", S["h1"]),
        P("<b>Input.</b> Thân bài tiếng Việt đã tách từ (dấu “_”).", S["bullet"]),
        P("<b>Output.</b> Bản tóm tắt ngắn: Lead-3 và TextRank lấy 3 câu; ViT5 sinh văn bản.", S["bullet"]),
        P("<b>Gold.</b> Trường abstract trong file Vietnews (tách khỏi thân bằng dòng trống).", S["bullet"]),
        P("<b>Độ đo.</b> ROUGE-1, ROUGE-2, ROUGE-L (F1), cùng 100 id.", S["bullet"]),
        P("4. Dữ liệu", S["h1"]),
        P(
            "Nguồn: https://github.com/ThanhChinhBK/vietnews, thư mục data/test_tokenized. "
            "Mỗi file: tiêu đề, abstract, thân bài. Nhóm lấy 100 file đầu theo tên "
            "(000001.txt.seg … 000100.txt.seg), danh sách trong data/test_ids.txt. "
            "Không tự xáo train/test. Không gọi lại underthesea trên gold — corpus đã tách từ.",
            S["body"],
        ),
        P("5. Phương pháp", S["h1"]),
        P("5.1. Lead-3", S["h2"]),
        P(
            "Ba câu đầu của thân bài. Baseline phổ biến cho tin tức (ý chính thường nằm ở đầu). Không học.",
            S["body"],
        ),
        P("5.2. TextRank", S["h2"]),
        P(
            "Biểu diễn câu bằng TF-IDF (sklearn), ma trận cosine, PageRank 40 vòng, hệ số 0,85. "
            "Lấy 3 câu điểm cao, sắp lại theo thứ tự xuất hiện trong bài.",
            S["body"],
        ),
        P("5.3. ViT5", S["h2"]),
        P(
            "Checkpoint VietAI/vit5-base-vietnews-summarization (Phan et al., 2022). "
            "Theo model card: không prefix vietnews:, thêm &lt;/s&gt; vào cuối input, "
            "generate max_length=256. Chạy inference trên Kaggle (2× Tesla T4, một GPU cuda:0). "
            "Phiên transformers 5 trên Kaggle lỗi Unigram (KeyError: 0); nhóm gỡ bản 5, cài "
            "transformers==4.44.2 và T5Tokenizer. Nhóm không fine-tune.",
            S["body"],
        ),
        P("5.4. ROUGE", S["h2"]),
        P(
            "Thư viện rouge-score, F1, không stemmer. Tokenizer: thay “_” bằng space rồi split khoảng trắng "
            "trên cả pred và ref. Lý do: gold và extractive giữ cá_nhân; ViT5 sinh lẫn “cá nhân”. "
            "Giữ dấu “_” sẽ trừ oan ViT5. Số trong báo cáo là bản đã chuẩn hoá. Không đối sánh với bảng paper "
            "(tokenizer paper không kiểm được từ model card).",
            S["body"],
        ),
        P("6. Kết quả thực nghiệm", S["h1"]),
        P("Bảng 1. ROUGE F1 trên 100 bài test đầu (cùng id).", S["caption"]),
    ]

    st.append(
        make_table(
            [
                ["Hệ", "ROUGE-1", "ROUGE-2", "ROUGE-L"],
                ["Lead-3", "0,2507", "0,1296", "0,1841"],
                ["TextRank", "0,2428", "0,1100", "0,1730"],
                ["ViT5", "0,2664", "0,1341", "0,2084"],
            ],
            [4.2 * cm, 3.5 * cm, 3.5 * cm, 3.5 * cm],
        )
    )
    st += [
        Spacer(1, 8),
        P(
            "ViT5 cao hơn một chút trên tập này. Lead-3 ≥ TextRank. "
            "Lead-3 không thấp hơn TextRank là hợp lý với tin tức: gold gần sapo, "
            "trong khi TextRank có thể nhảy vào đoạn giữa bài. Không kết luận SOTA.",
            S["body"],
        ),
        P("6.1. Theo độ dài bài", S["h2"]),
        P(
            "Chia 100 bài thành ba nhóm gần bằng nhau theo số token thân bài "
            "(ngưỡng 300 và 500: làm tròn tertile p33≈298, p67≈492). Cùng tokenizer với bảng 1.",
            S["body"],
        ),
        P("Bảng 1b. ROUGE-1 theo độ dài thân bài.", S["caption"]),
        make_table(
            [
                ["Nhóm", "n", "Lead-3", "TextRank", "ViT5"],
                ["Ngắn (<300 từ)", "34", "0,2581", "0,2672", "0,2919"],
                ["Trung (300–499)", "33", "0,2638", "0,2409", "0,2549"],
                ["Dài (≥500 từ)", "33", "0,2298", "0,2194", "0,2519"],
            ],
            [4.0 * cm, 1.8 * cm, 3.0 * cm, 3.0 * cm, 3.0 * cm],
        ),
        Spacer(1, 8),
        P(
            "Bài ngắn: ViT5 cao nhất. Bài trung: Lead-3 cao nhất. Bài dài: cả ba giảm, ViT5 vẫn hơn extractive. "
            "TextRank không thắng nhóm nào trên R-1. Đây là quan sát trên 100 bài, không suy nguyên nhân chắc.",
            S["body"],
        ),
        P("7. Phân tích lỗi (20 bài đọc tay)", S["h1"]),
        P(
            "Đối chiếu gold với ba hệ trên 20 id rải trong test-100 "
            "(gồm 000001–000003 và các id cách đều). Chi tiết: results/error_analysis.md.",
            S["body"],
        ),
        P("Bảng 2. Ba ví dụ ViT5 sai sự thật dù ROUGE có thể không thấp.", S["caption"]),
    ]
    st.append(
        make_table(
            [
                ["Id", "Gold", "ViT5", "Lỗi"],
                [
                    "000001",
                    "Hồ Xuân Huy, 12 năm tù (Đà Nẵng).",
                    "Bùi Quang Huy / Vũ nhôm, 3,2 tỷ.",
                    "Sai tên",
                ],
                [
                    "000011",
                    "Trộm máy ủi, bán, mua dây chuyền.",
                    "“Xe bồn”, thuê sửa chữa.",
                    "Bịa đối tượng",
                ],
                [
                    "000036",
                    "Vĩnh chối Rolex 7.000 USD.",
                    "Vĩnh “khai cho ông Vĩnh” 27 tỷ.",
                    "Gán nhầm lời Dương",
                ],
            ],
            [2.2 * cm, 4.6 * cm, 4.6 * cm, 3.3 * cm],
        )
    )
    st += [
        Spacer(1, 8),
        P(
            "Ngoài ra: 000003 ViT5 đảo polarity (“dung dịch chất lượng tốt” trong bài điều tra quảng cáo); "
            "000031 bịa dao/súng khi gold là đốt xe; 000051 Lead-3 gần như không nêu vụ nổ micro; "
            "000066 (bản tin 24h, nhiều tin/bài) cả ba hệ đều cắt, lặp hoặc trộn tin. "
            "Lead-3 ít bịa vì lấy câu sẵn có, nhưng hay lệch gold khi gold là kết luận phiên toà hoặc sapo. "
            "TextRank đôi khi lấy câu chú thích ảnh hoặc nhảy chuyên án.",
            S["body"],
        ),
        P(
            "Hệ quả cho bảo vệ: ROUGE ViT5 cao hơn không chứng minh bản tóm tắt đúng tên và số. "
            "Đọc tay là bắt buộc.",
            S["body"],
        ),
        P("8. Demo", S["h1"]),
        P(
            "Ứng dụng Gradio ba cột (Lead-3 | TextRank | ViT5) trên 100 bài, kèm ROUGE từng bài. "
            "ViT5 lấy từ results/preds.json, không gọi GPU lúc demo. "
            "Chạy local: python app/demo.py. Chạy Docker: docker run --rm -p 7860:7860 vietnews-demo. "
            "Địa chỉ: http://127.0.0.1:7860.",
            S["body"],
        ),
        P("9. Kết luận và hạn chế", S["h1"]),
        P(
            "Trên 100 bài test đầu Vietnews, ViT5 (checkpoint sẵn) có ROUGE cao hơn Lead-3 và TextRank một chút. "
            "Đọc tay cho thấy abstractive vẫn ảo giác. Extractive an toàn hơn về chữ, dễ lệch sapo.",
            S["body"],
        ),
        P("Hạn chế: chỉ 100 bài, không phải toàn bộ test paper; ViT5 đã học Vietnews nên không tách được "
          "khả năng mô hình với việc đã thấy miền này; chưa đo thời gian sinh câu; chưa mở 500 bài.", S["body"]),
        P(
            "Nếu làm tiếp: đếm sai tên/số có hệ thống trên nhiều bài hơn; tách các bài “an ninh 24h”; "
            "không fine-tune trùng Vietnews.",
            S["body"],
        ),
        P("10. Tài liệu", S["h1"]),
        P("1. Vietnews / VNDS: https://github.com/ThanhChinhBK/vietnews", S["bullet"]),
        P(
            "2. Phan et al. (2022). ViT5: Pretrained Text-to-Text Transformer for Vietnamese. NAACL SRW. "
            "Checkpoint: VietAI/vit5-base-vietnews-summarization",
            S["bullet"],
        ),
        P("3. Lin, C.-Y. (2004). ROUGE: A package for automatic evaluation of summaries.", S["bullet"]),
        P("4. Mihalcea, R. &amp; Tarau, P. TextRank.", S["bullet"]),
        P(
            "5. Repo nhóm: https://github.com/hoangdq08/vietnews-summarization-extractive-abstractive",
            S["bullet"],
        ),
        Spacer(1, 16),
        P(
            "Phụ lục số liệu: results/scores.csv, results/scores_mean.txt, results/preds.json, "
            "results/error_analysis.md. Slide: slides/CS221-Vietnews-tom-tat.pptx.",
            S["caption"],
        ),
    ]
    return st


def main():
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=1.8 * cm,
        bottomMargin=2.0 * cm,
        title="So sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt",
        author="CS221 UIT",
    )
    doc.build(story(), onFirstPage=on_page, onLaterPages=on_page)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
