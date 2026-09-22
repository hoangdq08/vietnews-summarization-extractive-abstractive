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
    x: 0.7, y: 4.55, w: 7.2, h: 1.15,
    fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
  });
  card(s, 8.15, 4.35, 4.5, 1.55);
  s.addText("GIÁO VIÊN HƯỚNG DẪN", {
    x: 8.35, y: 4.52, w: 4.1, h: 0.32,
    fontFace: FONT.sans, fontSize: 12, color: C.accent, margin: 0, charSpacing: 0.8,
  });
  s.addText("TS. Đặng Văn Thìn", {
    x: 8.35, y: 5.0, w: 4.1, h: 0.5,
    fontFace: FONT.serif, fontSize: 20, color: C.ink, margin: 0,
  });
  s.addNotes("Em chào thầy và các bạn. Nhóm em làm đề tài so sánh tóm tắt rút trích và tóm lược trên tin tiếng Việt. Rút trích là lấy câu có sẵn trong bài. Tóm lược thì nhóm dùng checkpoint ViT5 đã có sẵn, không train thêm. Nhóm muốn xem trên cùng tập test, ba cách này điểm ROUGE khác nhau thế nào, và mở bài ra thì mỗi cách sai ra sao.");
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
  s.addNotes("Bài báo thường dài vài trăm từ. Người đọc nhiều khi chỉ cần vài câu nói đúng việc chính. Chương trình lấy thân bài rồi viết lại cho ngắn. Bản ngắn không phải lúc nào cũng đúng ý. Có bài bị mất ý quan trọng. Có bài bị thêm chi tiết mà bài gốc không nói. Ra được bản tóm tắt chưa đủ. Nhóm còn phải xem nó giữ ý đến đâu.");
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
  s.addNotes("Nhóm chạy ba cách trên dữ liệu Vietnews, chấm bằng ROUGE, rồi đọc một số bài xem sai chỗ nào. Mỗi lần chỉ tóm một bài. Bài giảng có hướng gom nhiều bài rồi tóm chung. Đồ án này không đi hướng đó. Nhóm để từng bài một cho dễ so.");
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
  s.addNotes("Đầu vào là thân một bài tiếng Việt. Tiêu đề chỉ để biết đang nói bài nào. Đầu ra là bản ngắn. Lead-3 với TextRank lấy câu có sẵn trong thân bài. ViT5 viết câu mới. Lúc chấm, nhóm so với sapo. Sapo chỉ là bản mẫu để tính ROUGE, không đưa vào ViT5. Đưa sapo vào rồi so lại với chính sapo thì model đã thấy đáp án trước. Muốn biết một câu có đúng việc không thì đọc lại thân bài, vì sapo không ghi hết chi tiết.");
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
  s.addNotes("Rút trích giữ nguyên câu trong bài, nên ít bịa chữ mới. Đổi lại, câu lấy ra có thể cụt, hoặc không sát sapo. Tóm lược viết câu mới, nghe xuôi hơn, nhưng dễ sai tên, sai số, hoặc đảo người làm việc. Trong tập test, bài 000011 kể việc thuê xe chở máy ủi. Câu rút trích vẫn giữ ý đó. ViT5 viết thành trộm xe bồn.");
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
  s.addNotes("Nhóm dùng bộ Vietnews đã công bố, GitHub ThanhChinhBK/vietnews. Model là checkpoint VietAI vit5-base-vietnews-summarization, đi cùng bài NAACL 2022. Phần nhóm chấm là tập test. Trong file, từ đã tách sẵn bằng gạch dưới, ví dụ học_sinh. Nhóm thử trước 100 bài đầu. Số đưa vào báo cáo là 500 bài đầu, theo thứ tự tên file, từ 000001 đến 000500.");
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
  s.addNotes("Từ file bài báo đến một điểm ROUGE, nhóm đi bốn bước. Đọc file, lấy tiêu đề, sapo và thân bài. Rồi tách câu. Lead-3 và TextRank tính luôn trên máy từ các câu đó. ViT5 lấy câu đã viết sẵn, lưu trong file, lúc bảo vệ không chạy model lại. Cuối cùng so với sapo bằng ROUGE-1, ROUGE-2 và ROUGE-L.");
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
  s.addNotes("Nhóm không tách từ lại. File Vietnews đã ghi học_sinh là một từ. Mỗi dòng thường là một câu. Dòng nào chưa hết câu thì nối đến khi gặp dấu chấm. Lúc chấm, nhóm đổi gạch dưới ở cả bản tóm tắt lẫn sapo thành khoảng trắng, rồi tách theo khoảng trắng. Làm vậy thì chữ của ViT5 và chữ của sapo so được với nhau.");
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
  s.addNotes("Lead-3 lấy tối đa ba câu đầu thân bài. Bài có hai câu thì lấy hai câu. Không xếp lại, cũng không chấm câu nào quan trọng hơn. Tin thường nêu việc chính ngay câu đầu, nên cách này điểm khá cao dù rất đơn giản. Nhóm lấy nó làm mốc, xem TextRank và ViT5 có hơn được không.");
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
  s.addNotes("TextRank chọn câu ngay trong bài đang tóm, không học tham số từ bài khác. Mỗi câu là một vector TF-IDF. Cosine đo hai câu giống nhau đến đâu. PageRank chạy 40 vòng, damping 0.85. Câu nào giống nhiều câu khác thì điểm cao. Nhóm lấy ba câu điểm cao và giữ đúng thứ tự trong bài. Vẫn là rút trích. Nhóm chưa phạt hai câu trùng ý.");
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
  s.addNotes("ViT5 ở đây là checkpoint VietAI/vit5-base-vietnews-summarization. Checkpoint này đã được train để tóm tắt tin Vietnews. Nhóm chỉ đưa bài vào và lấy câu tóm tắt ra. Trọng số giữ nguyên, không cập nhật thêm. Đầu vào là thân bài, thêm ký hiệu kết thúc, dài tối đa 1.024 token. Bản tóm tắt dài tối đa 256 token. Số 256 là giới hạn lúc gọi model, không phải 256 từ tiếng Việt.");
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
  s.addNotes("Ba cách nhìn cùng các bài test, và chấm cùng một kiểu. Tập 100 là bài 000001 đến 000100, nhóm chạy trước. Tập 500 là bài 000001 đến 000500, trong đó có cả 100 bài kia. Điểm báo cáo là F1 của ROUGE-1, ROUGE-2 và ROUGE-L. Câu ViT5 sinh một lần trên Kaggle rồi lưu file. Lúc đứng bảo vệ, nhóm chỉ đọc file đó.");
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
  s.addNotes("Trên 500 bài, ViT5 cao hơn Lead-3 và TextRank ở cả ba cột. ROUGE-1 của Lead-3 là 0.2569, TextRank là 0.2499, ViT5 là 0.2784. TextRank không cao hơn cách lấy ba câu đầu. Chỉ lấy một câu đầu thì ROUGE-1 đã là 0.2719. ViT5 chỉ hơn mức đó một ít. Đây là số nhóm tự tính. Bài báo chấm theo cách khác, nên nhóm không kéo bảng của bài báo ra đặt cạnh.");
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
  s.addNotes("Nhìn bảng chưa đủ. Nhóm mở thân bài ra đọc. Bài 000021, trong bài Nguyễn Văn Được dùng dây dù siết cổ bạn gái. ViT5 viết thành Nguyễn Văn được cho là đã dùng dây dù. Tên Được bị cắt thành được cho là. Bài này vẫn có ROUGE-1 bằng 0.5161 trên bảng 100 bài, vì nhiều chữ khác vẫn trùng. Bài 000011, thân bài nói Nguyễn Văn Tú thuê xe chở máy ủi đem bán. ViT5 viết trộm được xe bồn. Xe bồn không có trong thân bài. Hai chỗ này nhóm đối với bài gốc, không chỉ nhìn sapo.");
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
  s.addNotes("Đọc khoảng 20 giây rồi chuyển máy. Ba cột này là cùng một bài. Lead-3 lấy ba câu đầu. TextRank chọn ba câu trong thân bài. ViT5 viết câu mới, lấy từ file đã lưu, không chạy model lúc này. Em mở demo. Mở 127.0.0.1 cổng 7860, không gõ Docker. Ô Bài test gõ 000011. Nói: bài thuê xe chở máy ủi. Sapo ở ô tóm tắt mẫu. Lead-3 và TextRank vẫn nói máy ủi vì lấy câu trong bài. ViT5 viết trộm xe bồn, trong bài không có xe bồn. Nếu còn giờ, mở mục Thí nghiệm A/B ViT5 500 bài, chọn 000011, bấm Xem đối chiếu A/B. A giữ gạch dưới, B đổi thành khoảng trắng, cả hai sinh sẵn. ROUGE của B có thể cao hơn, không kết luận B đúng hơn. Rồi về slide 16.");
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
  s.addText("ROUGE chỉ đo phần chữ trùng với sapo.\n\nNhóm mới đọc khoảng 100 bài.\n\nBài báo chấm theo cách khác, nên không đặt bảng đó cạnh bảng của nhóm.", {
    x: 7.05, y: 2.3, w: 5.5, h: 3.8,
    fontFace: FONT.sans, fontSize: 18, color: C.body, margin: 0,
  });
  footer(s, 16);
  s.addNotes("Trên 500 bài, ViT5 trùng chữ với sapo nhiều hơn Lead-3 và TextRank. So với một câu đầu thì chỉ hơn một ít. Lead-3 vẫn là mốc mạnh, vì tin hay để ý chính ở đầu bài. Đọc tay thì ViT5 vẫn sai tên và sai đồ vật. ROUGE chỉ đo phần chữ trùng với sapo. Nhóm mới đọc khoảng 100 bài, chưa đọc hết 500. Cách bài báo chấm khác cách nhóm chấm, nên hai bảng không đặt cạnh nhau.");
}

// 17 Hướng phát triển
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "17", "NẾU LÀM TIẾP", "Ngoài phạm vi hiện tại");
  title(s, "Ba việc có thể làm sau đồ án này");
  const next = [
    ["01", "Đọc thêm bài", "Đếm lỗi tên, số và đồ vật. Hiện nhóm mới đọc khoảng 100 bài."],
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
  s.addNotes("Nếu làm tiếp, nhóm muốn đọc thêm bài và đếm lỗi tên, lỗi số, lỗi đồ vật. Hiện mới khoảng 100 bài. Có sapo gom vài sự việc vào một đoạn. Những bài đó nên tách tin trước khi tóm. Nếu sau này có train, các bài đang dùng để chấm sẽ để riêng, không đưa vào lúc cập nhật model. Ba việc này nhóm chưa làm trong phần hôm nay.");
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
  s.addNotes("Bốn nguồn này để thầy và các bạn đối chiếu. Dữ liệu Vietnews ở github.com/ThanhChinhBK/vietnews. Bài ViT5 ở aclanthology.org/2022.naacl-srw.18. Checkpoint ở huggingface.co/VietAI/vit5-base-vietnews-summarization. Code nhóm ở github.com/hoangdq08/vietnews-summarization-extractive-abstractive. Em xin dừng phần trình bày ở đây.");
}

pres.writeFile({ fileName: path.join(__dirname, "CS221-Vietnews-bao-ve.pptx") })
  .then(() => console.log("PASS wrote 18-slide defense deck"))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
