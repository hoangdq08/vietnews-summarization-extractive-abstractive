const path = require("path");
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pres.layout = "WIDE";
pres.title = "So sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt";
pres.author = "Nhóm 14 · CS221 · UIT";
pres.subject = "Bài bảo vệ đồ án";

const C = {
  bg: "F0ECE0",
  cardLight: "F7F3E8",
  cardWarm: "F2E5D0",
  ink: "1A1A1A",
  dark: "0B0B0B",
  body: "2B2B2B",
  muted: "8A8578",
  mutedSoft: "B5AFA0",
  rule: "C8C0AE",
  accent: "B8432A",
  onDark: "EFE8D6",
};
const FONT = { serif: "Georgia", sans: "Calibri" };

function header(slide, num, leftLabel, rightLabel) {
  slide.addText(`${num}   ${leftLabel}`, {
    x: 0.55, y: 0.28, w: 8, h: 0.28,
    fontFace: FONT.sans, fontSize: 12, color: C.muted, margin: 0, charSpacing: 1.2,
  });
  slide.addText(rightLabel, {
    x: 7.3, y: 0.28, w: 5.5, h: 0.28,
    fontFace: FONT.sans, fontSize: 13, color: C.muted, align: "right", margin: 0,
  });
}

function footer(slide, page) {
  slide.addText("CS221 · UIT · Nhóm 14", {
    x: 0.55, y: 7.1, w: 8, h: 0.22,
    fontFace: FONT.sans, fontSize: 11, color: C.mutedSoft, margin: 0,
  });
  slide.addText(String(page), {
    x: 11.4, y: 7.1, w: 1.4, h: 0.22,
    fontFace: FONT.sans, fontSize: 11, color: C.muted, align: "right", margin: 0,
  });
}

function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fill || C.cardLight },
    line: { color: C.rule, width: 0.75 },
  });
}

function title(slide, text) {
  slide.addText(text, {
    x: 0.55, y: 0.64, w: 12.2, h: 0.55,
    fontFace: FONT.serif, fontSize: 28, color: C.ink, margin: 0,
  });
}

function darkHead(text) {
  return { text, options: { fill: { color: C.dark }, color: C.onDark, bold: true } };
}

// 1 Bìa
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("CS221  ·  XỬ LÝ NGÔN NGỮ TỰ NHIÊN  ·  UIT", {
    x: 0.7, y: 1.15, w: 12, h: 0.32,
    fontFace: FONT.sans, fontSize: 14, color: C.muted, margin: 0, charSpacing: 1.4,
  });
  s.addText("So sánh tóm tắt rút trích\nvà tóm lược trên tin tức tiếng Việt", {
    x: 0.7, y: 1.65, w: 12, h: 1.55,
    fontFace: FONT.serif, fontSize: 34, color: C.ink, margin: 0,
  });
  s.addText("Lead-3   ·   TextRank   ·   ViT5 dùng checkpoint có sẵn", {
    x: 0.7, y: 3.45, w: 11, h: 0.38,
    fontFace: FONT.serif, fontSize: 18, color: C.accent, italic: true, margin: 0,
  });
  s.addText("Nhóm 14", {
    x: 0.7, y: 4.3, w: 11, h: 0.35,
    fontFace: FONT.sans, fontSize: 16, color: C.ink, margin: 0,
  });
  s.addText("Nguyễn Trí Toàn    26410135\nNguyễn Văn Thái    26410108\nĐỗ Quốc Hoàng    26410043", {
    x: 0.7, y: 4.7, w: 11, h: 1.25,
    fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
  });
  s.addNotes("Nhóm so sánh hai cách tóm tắt tin tiếng Việt. Rút trích lấy câu có sẵn. Tóm lược dùng checkpoint ViT5 có sẵn. Nhóm không huấn luyện model. Câu hỏi là trên cùng tập test, ba cách khác nhau thế nào về ROUGE, và khi đọc bài thì mỗi cách sai kiểu gì.");
}

// 2 Đặt vấn đề
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "02", "ĐẶT VẤN ĐỀ", "Vì sao cần tóm tắt");
  title(s, "Bài báo dài. Người đọc cần vài câu đúng ý.");
  const items = [
    ["Tin tức dài", "Một bài có thể vài trăm từ. Người đọc cần nắm việc chính mà không đọc hết."],
    ["Bản ngắn hơn", "Hệ đọc thân bài rồi viết lại thành vài câu."],
    ["Dễ sai", "Bản ngắn có thể bỏ mất ý, hoặc thêm điều bài không nói."],
  ];
  items.forEach((it, i) => {
    const y = 1.55 + i * 1.7;
    card(s, 0.55, y, 12.2, 1.52);
    s.addText(it[0], {
      x: 0.85, y: y + 0.22, w: 11.6, h: 0.4,
      fontFace: FONT.sans, fontSize: 20, color: C.accent, margin: 0,
    });
    s.addText(it[1], {
      x: 0.85, y: y + 0.72, w: 11.6, h: 0.55,
      fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
    });
  });
  footer(s, 2);
  s.addNotes("Người đọc không kịp đọc hết bài báo. Máy có thể rút thành vài câu. Việc của nhóm là xem cách lấy câu sẵn và cách viết câu mới giữ ý đến đâu, chứ không phải xây một model mới.");
}

// 3 Mục tiêu
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "03", "MỤC TIÊU", "Câu hỏi của đồ án");
  title(s, "Ba cách, cùng một tập test");
  card(s, 0.55, 1.5, 12.2, 2.15, C.cardWarm);
  s.addText("Trên cùng tập test, Lead-3, TextRank và ViT5 khác nhau thế nào về ROUGE, và khi đọc tay thì mỗi hệ sai kiểu gì?", {
    x: 0.85, y: 1.75, w: 11.6, h: 1.65,
    fontFace: FONT.serif, fontSize: 24, color: C.ink, margin: 0,
  });
  const bits = [
    ["Nhóm làm", "Chạy ba cách trên Vietnews, chấm ROUGE, rồi đọc vài bài để xem sai chỗ nào."],
    ["Giới hạn", "Mỗi lần tóm một bài. Bài giảng có phần gom nhiều bài. Đồ án này chỉ làm từng bài."],
  ];
  bits.forEach((b, i) => {
    const x = 0.55 + i * 6.35;
    card(s, x, 3.9, 6.1, 2.7);
    s.addText(b[0], {
      x: x + 0.3, y: 4.1, w: 5.5, h: 0.4,
      fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
    });
    s.addText(b[1], {
      x: x + 0.3, y: 4.65, w: 5.5, h: 1.6,
      fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
    });
  });
  footer(s, 3);
  s.addNotes("Mục tiêu là so sánh ba cách trên cùng tập, rồi đọc tay để xem mỗi cách sai kiểu gì. Mỗi lần nhóm tóm một bài. Bài giảng còn có hướng gom nhiều bài. Đồ án này làm từng bài.");
}

// 4 Input output
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "04", "BÀI TOÁN", "Đầu vào và đầu ra");
  title(s, "Một bài vào. Một bản tóm tắt ra.");
  const cols = [
    ["Đầu vào", "Thân bài tiếng Việt", "Hệ chỉ đọc phần thân. Tiêu đề dùng để biết đó là bài nào."],
    ["Đầu ra", "Bản tóm tắt ngắn", "Lead-3 và TextRank lấy câu có sẵn. ViT5 viết câu mới."],
    ["Để chấm", "Sapo của bài", "Sapo là bản mẫu khi tính ROUGE. ViT5 không được đọc sapo."],
  ];
  cols.forEach((c, i) => {
    const x = 0.55 + i * 4.2;
    card(s, x, 1.55, 3.95, 5.05, i === 2 ? C.cardWarm : C.cardLight);
    s.addText(c[0], {
      x: x + 0.25, y: 1.8, w: 3.45, h: 0.35,
      fontFace: FONT.sans, fontSize: 14, color: C.accent, margin: 0,
    });
    s.addText(c[1], {
      x: x + 0.25, y: 2.3, w: 3.45, h: 1.35,
      fontFace: FONT.serif, fontSize: 26, color: C.ink, margin: 0,
    });
    s.addText(c[2], {
      x: x + 0.25, y: 3.9, w: 3.45, h: 2.2,
      fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
    });
  });
  footer(s, 4);
  s.addNotes("Đầu vào là thân bài. Đầu ra là bản tóm tắt ngắn. Sapo chỉ dùng để chấm. Nếu đưa sapo vào model rồi so lại với sapo, hệ đã biết đáp án. Khi kiểm nội dung, nhóm vẫn đọc thân bài, vì sapo không phải mọi sự thật trong bài.");
}

// 5 Hai cách + ví dụ minh họa
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "05", "HAI CÁCH", "Một bài trong tập test");
  title(s, "Lấy câu sẵn, hoặc viết câu mới");
  card(s, 0.55, 1.45, 6.0, 2.55);
  card(s, 6.8, 1.45, 6.0, 2.55, C.cardWarm);
  s.addText("Rút trích", {
    x: 0.8, y: 1.6, w: 5.5, h: 0.35,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("Giữ nguyên câu trong bài. Ít bịa chữ. Có thể cụt hoặc lệch sapo.", {
    x: 0.8, y: 2.1, w: 5.5, h: 1.55,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  s.addText("Tóm lược", {
    x: 7.05, y: 1.6, w: 5.5, h: 0.35,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("Viết câu mới. Đọc có thể mượt hơn. Có thể sai tên, sai số, đảo người làm việc.", {
    x: 7.05, y: 2.1, w: 5.5, h: 1.55,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  card(s, 0.55, 4.2, 12.25, 2.45);
  s.addText("Bài 000011 trong tập test", {
    x: 0.8, y: 4.38, w: 11.7, h: 0.32,
    fontFace: FONT.sans, fontSize: 14, color: C.accent, margin: 0,
  });
  s.addText("Bài 000011 kể việc thuê xe chở máy ủi. Rút trích giữ nguyên câu ấy. ViT5 đổi thành trộm xe bồn.", {
    x: 0.8, y: 4.85, w: 11.7, h: 1.45,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  footer(s, 5);
  s.addNotes("Rút trích giữ nguyên câu trong bài. Tóm lược viết câu mới, nên có thể viết sai sự việc. Ngay trong tập test, bài 000011 nói máy ủi, còn ViT5 viết xe bồn. Slide đọc tay sẽ đặt bài này cạnh một bài sai tên.");
}

// 6 Dataset
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "06", "CÔNG TRÌNH", "Và dữ liệu");
  title(s, "Dùng Vietnews và checkpoint ViT5 đã công bố");
  const rows = [
    ["Dữ liệu", "github.com/ThanhChinhBK/vietnews"],
    ["Model", "VietAI/vit5-base-vietnews-summarization, bài NAACL 2022"],
    ["Phần dùng", "Tập test, các file đã tách từ bằng dấu gạch dưới"],
    ["Số bài", "Làm thử 100 bài đầu. Số báo cáo là 500 bài đầu, lấy theo tên file."],
  ];
  rows.forEach((r, i) => {
    const y = 1.5 + i * 1.3;
    card(s, 0.55, y, 12.2, 1.15);
    s.addText(r[0], {
      x: 0.8, y: y + 0.32, w: 2.5, h: 0.45,
      fontFace: FONT.sans, fontSize: 18, color: C.accent, margin: 0,
    });
    s.addText(r[1], {
      x: 3.4, y: y + 0.32, w: 9.0, h: 0.45,
      fontFace: FONT.sans, fontSize: 18, color: C.ink, margin: 0,
    });
  });
  footer(s, 6);
  s.addNotes("Nhóm dùng bộ Vietnews đã công bố và checkpoint ViT5 đã công bố. Phần chấm là test đã tách từ. Thử trên 100 bài đầu, số báo cáo là 500 bài đầu, theo thứ tự tên file.");
}

// 7 Pipeline
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "07", "CÁCH CHẠY", "Bốn bước");
  title(s, "Từ file bài báo đến điểm ROUGE");
  const steps = [
    ["1", "Đọc file", "Lấy tiêu đề, sapo và thân bài."],
    ["2", "Tách câu", "Lead-3 và TextRank chạy trên máy."],
    ["3", "ViT5", "Dùng câu đã viết sẵn và lưu lại."],
    ["4", "ROUGE", "So bản tóm tắt với sapo bằng ROUGE-1, 2 và L."],
  ];
  steps.forEach((st, i) => {
    const x = 0.55 + (i % 4) * 3.15;
    card(s, x, 1.6, 3.0, 4.95);
    s.addText(st[0], {
      x: x + 0.2, y: 1.85, w: 2.6, h: 0.7,
      fontFace: FONT.serif, fontSize: 32, color: C.accent, margin: 0,
    });
    s.addText(st[1], {
      x: x + 0.2, y: 2.7, w: 2.6, h: 0.9,
      fontFace: FONT.sans, fontSize: 20, color: C.ink, bold: true, margin: 0,
    });
    s.addText(st[2], {
      x: x + 0.2, y: 3.7, w: 2.6, h: 2.2,
      fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
    });
  });
  footer(s, 7);
  s.addNotes("Pipeline có bốn bước. Đọc file, tách câu, lấy bản ViT5 đã sinh, rồi chấm ROUGE. Lead-3 và TextRank tính tại máy. ViT5 không chạy lại lúc bảo vệ. Demo vì thế không cần Kaggle.");
}

// 8 Tiền xử lý
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "08", "TIỀN XỬ LÝ", "Tiếng Việt");
  title(s, "Nhóm đọc file đã tách từ, rồi chấm trên đó");
  const items = [
    ["Dấu gạch dưới", "học_sinh là một từ có sẵn trong file Vietnews."],
    ["Câu", "Mỗi dòng thường là một câu. Dòng chưa hết câu thì nối đến dấu chấm."],
    ["Lúc chấm", "Đổi gạch dưới thành khoảng trắng ở bản tóm tắt và sapo, rồi tách theo khoảng trắng."],
  ];
  items.forEach((it, i) => {
    const y = 1.55 + i * 1.75;
    card(s, 0.55, y, 12.2, 1.55);
    s.addText(it[0], {
      x: 0.8, y: y + 0.18, w: 3.1, h: 0.85,
      fontFace: FONT.sans, fontSize: 18, color: C.accent, margin: 0, valign: "middle",
    });
    s.addText(it[1], {
      x: 4.0, y: y + 0.18, w: 8.4, h: 0.85,
      fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0, valign: "middle",
    });
  });
  footer(s, 8);
  s.addNotes("Trong file, học_sinh là một từ có sẵn. Nhóm đọc dấu đó. Khi một dòng chưa hết câu, nhóm nối đến dấu chấm. Lúc chấm, dấu gạch dưới đổi thành khoảng trắng để so với sapo.");
}

// 9 Lead-3
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "09", "LEAD-3", "Baseline");
  title(s, "Lấy ba câu đầu thân bài");
  card(s, 0.55, 1.5, 7.4, 5.1);
  s.addText("Cách làm", {
    x: 0.85, y: 1.75, w: 6.8, h: 0.35,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("Lấy tối đa ba câu đứng đầu bài.\n\nBài chỉ có hai câu thì giữ hai câu.\n\nKhông sắp xếp lại, không chấm câu nào quan trọng hơn.", {
    x: 0.85, y: 2.3, w: 6.8, h: 3.6,
    fontFace: FONT.sans, fontSize: 22, color: C.body, margin: 0,
  });
  card(s, 8.2, 1.5, 4.55, 5.1, C.cardWarm);
  s.addText("Vì sao cần", {
    x: 8.45, y: 1.75, w: 4.1, h: 0.4,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("Tin thường nêu việc chính ngay câu đầu.\n\nLấy ba câu đầu giúp thấy TextRank và ViT5 có hơn cách đơn giản này hay không.", {
    x: 8.45, y: 2.4, w: 4.1, h: 3.5,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  footer(s, 9);
  s.addNotes("Lead-3 là mốc đơn giản. Nó lấy ba câu đầu, không học gì. Tin tiếng Việt thường mở bằng ý chính, nên mốc này có thể điểm khá cao. Nhóm dùng nó để xem TextRank và ViT5 có hơn thật không.");
}

// 10 TextRank
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "10", "TEXTRANK", "Chọn câu trong một bài");
  title(s, "Chọn ba câu giống các câu khác nhất");
  const steps = [
    ["1", "TF-IDF", "Mỗi câu thành một vector, chỉ trong bài đó."],
    ["2", "Cosine", "Đo hai câu giống nhau đến đâu."],
    ["3", "PageRank", "40 vòng, damping 0.85."],
    ["4", "Lấy ba câu", "Giữ thứ tự xuất hiện trong bài."],
  ];
  steps.forEach((st, i) => {
    const y = 1.45 + i * 1.35;
    card(s, 0.55, y, 12.2, 1.22);
    s.addText(st[0], {
      x: 0.8, y: y + 0.32, w: 0.7, h: 0.5,
      fontFace: FONT.serif, fontSize: 24, color: C.accent, margin: 0,
    });
    s.addText(st[1], {
      x: 1.7, y: y + 0.32, w: 2.8, h: 0.5,
      fontFace: FONT.sans, fontSize: 20, color: C.ink, bold: true, margin: 0,
    });
    s.addText(st[2], {
      x: 4.7, y: y + 0.34, w: 7.6, h: 0.5,
      fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
    });
  });
  footer(s, 10);
  s.addNotes("TextRank không train. Với mỗi bài, nhóm biến câu thành TF-IDF, tính độ giống bằng cosine, rồi PageRank 40 vòng. Ba câu điểm cao được trả về đúng thứ tự trong bài. Cách này vẫn là rút trích. Chưa có bước phạt hai câu trùng ý.");
}

// 11 ViT5
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "11", "VIT5", "Checkpoint có sẵn");
  title(s, "ViT5 viết câu mới từ checkpoint có sẵn");
  const cells = [
    ["Model", "VietAI/vit5-base-vietnews-summarization"],
    ["Việc của nhóm", "Cho model đọc bài và viết tóm tắt. Trọng số giữ nguyên như checkpoint."],
    ["Đưa vào", "Thân bài, thêm ký hiệu kết thúc. Tối đa 1.024 token."],
    ["Sinh ra", "Mỗi bản tóm tắt dài tối đa 256 token."],
  ];
  cells.forEach((c, i) => {
    const y = 1.5 + (i % 4) * 1.3;
    card(s, 0.55, y, 12.2, 1.15);
    s.addText(c[0], {
      x: 0.8, y: y + 0.32, w: 3.0, h: 0.45,
      fontFace: FONT.sans, fontSize: 18, color: C.accent, margin: 0,
    });
    s.addText(c[1], {
      x: 3.9, y: y + 0.32, w: 8.5, h: 0.45,
      fontFace: FONT.sans, fontSize: 18, color: C.ink, margin: 0,
    });
  });
  footer(s, 11);
  s.addNotes("ViT5 là checkpoint VietAI đã học tóm tắt Vietnews. Nhóm không train tiếp. Khi sinh, nhóm đưa thân bài kèm ký hiệu kết thúc, giới hạn input 1024 token và output 256 token, không thêm prefix. 256 là giới hạn token của API, không phải 256 từ tiếng Việt.");
}

// 12 Thiết lập
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "12", "THIẾT LẬP", "Cùng tập, cùng cách chấm");
  title(s, "Ba hệ nhìn cùng các bài test");
  s.addTable([
    [darkHead("Hạng mục"), darkHead("Cách nhóm làm")],
    ["Tập 100", "Bài 000001 đến 000100, chạy trước"],
    ["Tập 500", "Bài 000001 đến 000500, gồm cả 100 bài trên"],
    ["Ba cách", "Lead-3, TextRank và ViT5 trên cùng các bài"],
    ["Cách chấm", "ROUGE-1, ROUGE-2, ROUGE-L, lấy điểm F1"],
    ["ViT5", "Sinh một lần trên Kaggle, rồi lưu file kết quả"],
  ], {
    x: 0.55, y: 1.45, w: 12.2, h: 5.15,
    colW: [3.0, 9.2],
    border: { pt: 0.5, color: C.rule },
    fontFace: FONT.sans,
    fontSize: 18,
    color: C.body,
    align: "left",
    valign: "middle",
  });
  footer(s, 12);
  s.addNotes("Nhóm chấm 100 bài trước, rồi mở rộng thành 500 bài đầu. Cả ba hệ dùng cùng danh sách bài và cùng cách ROUGE. ViT5 được sinh một lần trên Kaggle rồi lưu lại. Lúc bảo vệ chỉ đọc file đó. Nhóm không lấy số trong paper ra so, vì cách chấm của paper chưa đối chiếu đủ.");
}

// 13 Bảng ROUGE 500
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "13", "KẾT QUẢ", "500 bài test");
  title(s, "ViT5 cao hơn một chút, Lead-3 vẫn gần");
  s.addTable([
    [darkHead("Cách làm"), darkHead("ROUGE-1"), darkHead("ROUGE-2"), darkHead("ROUGE-L")],
    ["Lead-3", "0.2569", "0.1294", "0.1856"],
    ["TextRank", "0.2499", "0.1198", "0.1815"],
    [
      { text: "ViT5", options: { fill: { color: C.cardWarm }, bold: true } },
      { text: "0.2784", options: { fill: { color: C.cardWarm }, bold: true } },
      { text: "0.1474", options: { fill: { color: C.cardWarm }, bold: true } },
      { text: "0.2233", options: { fill: { color: C.cardWarm }, bold: true } },
    ],
  ], {
    x: 0.55, y: 1.45, w: 12.2, h: 3.15,
    colW: [3.2, 3.0, 3.0, 3.0],
    border: { pt: 0.5, color: C.rule },
    fontFace: FONT.sans,
    fontSize: 20,
    color: C.body,
    align: "center",
    valign: "middle",
  });
  s.addText("Trên 500 bài, TextRank thấp hơn Lead-3. Lấy một câu đầu đã đạt 0.2719. ViT5 chỉ hơn mức đó một ít. Số này do nhóm tính.", {
    x: 0.55, y: 4.85, w: 12.2, h: 1.5,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  footer(s, 13);
  s.addNotes("Trên 500 bài, ROUGE-1 của Lead-3 là 0.2569, TextRank 0.2499, ViT5 0.2784. Lead-1 đã là 0.2719, nên ViT5 chỉ hơn một câu đầu một ít. Số này là của tập nhóm đo. Bài báo chấm theo cách khác, nên nhóm để hai bảng đứng riêng.");
}

// 14 Hai ví dụ
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "14", "ĐỌC TAY", "Hai ví dụ");
  title(s, "Trùng nhiều chữ vẫn có thể sai việc");
  card(s, 0.55, 1.45, 6.05, 5.15);
  card(s, 6.8, 1.45, 6.0, 5.15, C.cardWarm);
  s.addText("000021  ·  sai tên", {
    x: 0.8, y: 1.65, w: 5.6, h: 0.4,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("Trong bài, Nguyễn Văn Được dùng dây dù siết cổ bạn gái.\n\nViT5 viết: Nguyễn \"Văn\" được cho là đã dùng dây dù.\n\nBài này vẫn đạt ROUGE-1 bằng 0.5161 trên bảng 100 bài.", {
    x: 0.8, y: 2.2, w: 5.55, h: 3.9,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  s.addText("000011  ·  sai đồ vật", {
    x: 7.05, y: 1.65, w: 5.5, h: 0.4,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("Thân bài: Nguyễn Văn Tú thuê xe chở máy ủi đem bán.\n\nViT5: trộm được xe bồn.\n\nXe bồn không có trong thân bài.", {
    x: 7.05, y: 2.2, w: 5.5, h: 3.9,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  footer(s, 14);
  s.addNotes("Hai lỗi đọc từ thân bài, không chỉ từ sapo. Bài 000021 viết Nguyễn Văn Được. ViT5 tách thành được cho là, nhưng ROUGE-1 vẫn 0.5161 vì nhiều chữ khác trùng. Bài 000011 nói máy ủi. ViT5 viết xe bồn, và xe bồn không có trong bài. Vì vậy nhóm không dừng ở bảng điểm.");
}

// 15 Demo
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "15", "DEMO", "Cùng một bài");
  title(s, "Ba cột trên cùng một bài");
  const cols = [
    ["Lead-3", "Ba câu đầu của thân bài."],
    ["TextRank", "Ba câu được chọn trong thân bài."],
    ["ViT5", "Câu viết mới, lấy từ kết quả đã lưu."],
  ];
  cols.forEach((c, i) => {
    const x = 0.55 + i * 4.2;
    card(s, x, 1.7, 3.95, 4.7, i === 2 ? C.cardWarm : C.cardLight);
    s.addText(c[0], {
      x: x + 0.3, y: 2.05, w: 3.35, h: 0.7,
      fontFace: FONT.serif, fontSize: 28, color: C.ink, margin: 0,
    });
    s.addText(c[1], {
      x: x + 0.3, y: 3.0, w: 3.35, h: 2.6,
      fontFace: FONT.sans, fontSize: 20, color: C.body, margin: 0,
    });
  });
  footer(s, 15);
  s.addNotes("Mở demo bằng Docker: docker run --rm -p 7860:7860 vietnews-demo, rồi vào 127.0.0.1 cổng 7860. Không cài Python trên máy bảo vệ. Trên slide chỉ nói ba cột là gì. Khi đứng máy, chọn một bài, đọc thân bài, rồi chỉ một chỗ ViT5 khác bài.");
}

// 16 Kết luận
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "16", "KẾT LUẬN", "Và hạn chế");
  title(s, "ViT5 hơn một chút về chữ trùng");
  card(s, 0.55, 1.45, 6.05, 5.15);
  card(s, 6.8, 1.45, 6.0, 5.15, C.cardWarm);
  s.addText("Nhận được", {
    x: 0.8, y: 1.7, w: 5.55, h: 0.4,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("Trên 500 bài, ViT5 có ROUGE cao hơn Lead-3 và TextRank.\n\nLead-3 là mốc mạnh vì ý tin thường ở đầu.\n\nĐọc tay vẫn thấy ViT5 sai tên và sai đồ vật.", {
    x: 0.8, y: 2.3, w: 5.55, h: 3.8,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  s.addText("Hạn chế", {
    x: 7.05, y: 1.7, w: 5.5, h: 0.4,
    fontFace: FONT.sans, fontSize: 16, color: C.accent, margin: 0,
  });
  s.addText("ROUGE chỉ đo phần chữ trùng với sapo.\n\nNhóm mới đọc khoảng 20 bài.\n\nBài báo chấm theo cách khác, nên không đặt bảng đó cạnh bảng của nhóm.", {
    x: 7.05, y: 2.3, w: 5.5, h: 3.8,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  footer(s, 16);
  s.addNotes("Trên 500 bài ViT5 nhỉnh về chữ trùng, nhưng sát Lead-1, và khi đọc bài vẫn sai tên hoặc sai đồ vật. Nhóm mới đọc tay khoảng 20 bài. Checkpoint giữ nguyên trọng số lúc chạy.");
}

// 17 Hướng phát triển
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "17", "NẾU LÀM TIẾP", "Ngoài phạm vi hiện tại");
  title(s, "Ba việc có thể làm sau đồ án này");
  const next = [
    ["01", "Đọc thêm bài", "Đếm lỗi tên, số và đồ vật. Hiện nhóm mới đọc khoảng 20 bài."],
    ["02", "Bài gồm nhiều tin", "Một sapo có thể gom vài sự việc. Cần tách tin trước khi tóm."],
    ["03", "Nếu có train sau", "Các bài đang dùng để chấm sẽ để riêng, không đưa vào lúc cập nhật model."],
  ];
  next.forEach((n, i) => {
    const y = 1.5 + i * 1.75;
    card(s, 0.55, y, 12.2, 1.58);
    s.addText(n[0], {
      x: 0.8, y: y + 0.45, w: 1.1, h: 0.55,
      fontFace: FONT.serif, fontSize: 24, color: C.accent, margin: 0,
    });
    s.addText(n[1], {
      x: 2.1, y: y + 0.22, w: 10.2, h: 0.45,
      fontFace: FONT.sans, fontSize: 20, color: C.ink, bold: true, margin: 0,
    });
    s.addText(n[2], {
      x: 2.1, y: y + 0.78, w: 10.2, h: 0.55,
      fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
    });
  });
  footer(s, 17);
  s.addNotes("Nếu làm tiếp, nhóm muốn đọc lỗi có hệ thống hơn, và xử lý những bài sapo gom nhiều tin. Nhóm không train thêm trên chính tập test đang dùng để chấm. Những việc này nằm ngoài phạm vi bản bảo vệ hôm nay.");
}

// 18 Tài liệu
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "18", "TÀI LIỆU", "Đã dùng");
  title(s, "Tài liệu nhóm đã dùng");
  const refs = [
    ["Vietnews", "github.com/ThanhChinhBK/vietnews"],
    ["ViT5", "aclanthology.org/2022.naacl-srw.18"],
    ["Checkpoint", "huggingface.co/VietAI/vit5-base-vietnews-summarization"],
    ["Repo nhóm", "github.com/hoangdq08/vietnews-summarization-extractive-abstractive"],
  ];
  refs.forEach((r, i) => {
    const y = 1.5 + i * 1.3;
    card(s, 0.55, y, 12.2, 1.15);
    s.addText(r[0], {
      x: 0.8, y: y + 0.32, w: 2.6, h: 0.45,
      fontFace: FONT.sans, fontSize: 18, color: C.accent, margin: 0,
    });
    s.addText(r[1], {
      x: 3.5, y: y + 0.32, w: 8.9, h: 0.45,
      fontFace: FONT.sans, fontSize: 18, color: C.ink, margin: 0,
    });
  });
  footer(s, 18);
  s.addNotes("Bốn nguồn này để kiểm dữ liệu, bài báo ViT5, checkpoint và code của nhóm. Hết slide này là hết bài nói.");
}

pres.writeFile({ fileName: path.join(__dirname, "CS221-Vietnews-bao-ve.pptx") })
  .then(() => console.log("PASS wrote 18-slide defense deck"))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
