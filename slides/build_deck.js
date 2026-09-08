const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "So sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt";
pres.author = "CS221 · UIT";
pres.subject = "Đồ án NLP — Vietnews extractive vs abstractive";

const W = 13.333;
const H = 7.5;

const C = {
  bg: "F0ECE0",
  cardLight: "F7F3E8",
  cardWarm: "F2E5D0",
  cardBeige: "E8E1CF",
  ink: "1A1A1A",
  dark: "0B0B0B",
  body: "2B2B2B",
  muted: "8A8578",
  mutedSoft: "B5AFA0",
  rule: "C8C0AE",
  accent: "B8432A",
  accentBright: "C85332",
  onDark: "EFE8D6",
  onDarkMuted: "9A9488",
};

const FONT = { serif: "Georgia", sans: "Calibri", mono: "Consolas" };

function header(slide, num, leftLabel, rightLabel) {
  slide.addText(`${num}  ${leftLabel}`, {
    x: 0.55, y: 0.38, w: 7.2, h: 0.32,
    fontFace: FONT.sans, fontSize: 11, color: C.muted,
    charSpacing: 2.5, margin: 0, valign: "middle",
  });
  slide.addText(rightLabel, {
    x: W - 6.55, y: 0.38, w: 6, h: 0.32,
    fontFace: FONT.sans, fontSize: 12, color: C.muted,
    align: "right", margin: 0, valign: "middle",
  });
  slide.addShape(pres.shapes.LINE, {
    x: 0.55, y: 0.78, w: W - 1.1, h: 0,
    line: { color: C.rule, width: 0.75 },
  });
}

function footer(slide, page) {
  slide.addText("CS221 · UIT  ·  Vietnews extractive vs abstractive", {
    x: 0.55, y: H - 0.38, w: 9, h: 0.22,
    fontFace: FONT.sans, fontSize: 10, color: C.mutedSoft, margin: 0,
  });
  slide.addText(String(page), {
    x: W - 1.2, y: H - 0.38, w: 0.65, h: 0.22,
    fontFace: FONT.sans, fontSize: 10, color: C.muted, align: "right", margin: 0,
  });
}

function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fill || C.cardLight },
    line: { color: C.rule, width: 0.75 },
  });
}

// 1 TITLE
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addText("CS221  ·  XỬ LÝ NGÔN NGỮ TỰ NHIÊN  ·  UIT", {
    x: 0.7, y: 1.35, w: 12, h: 0.32,
    fontFace: FONT.sans, fontSize: 13, color: C.muted, charSpacing: 3, margin: 0,
  });
  s.addText("So sánh tóm tắt rút trích\nvà tóm lược trên tin tức tiếng Việt", {
    x: 0.7, y: 1.85, w: 12, h: 1.7,
    fontFace: FONT.serif, fontSize: 36, color: C.ink, margin: 0, bold: false,
  });
  s.addText("A comparative study of extractive and abstractive summarization on Vietnews", {
    x: 0.7, y: 3.7, w: 11.5, h: 0.4,
    fontFace: FONT.serif, fontSize: 16, color: C.accent, italic: true, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 4.3, w: 3.2, h: 0, line: { color: C.accent, width: 2 },
  });
  s.addText("Lead-3  ·  TextRank  ·  ViT5 (checkpoint VietAI, không fine-tune)\n100 bài test đầu  ·  ROUGE-1/2/L  ·  đọc tay 20 bài", {
    x: 0.7, y: 4.45, w: 11, h: 0.7,
    fontFace: FONT.sans, fontSize: 15, color: C.body, margin: 0,
  });
  s.addText("Nhóm 14\nNguyễn Trí Toàn  26410135    ·    Nguyễn Văn Thái  26410108    ·    Đỗ Quốc Hoàng  26410043", {
    x: 0.7, y: 5.3, w: 12, h: 0.7,
    fontFace: FONT.sans, fontSize: 14, color: C.ink, margin: 0,
  });
  s.addText("GitHub: hoangdq08/vietnews-summarization-extractive-abstractive", {
    x: 0.7, y: 6.55, w: 11, h: 0.3,
    fontFace: FONT.mono, fontSize: 12, color: C.muted, margin: 0,
  });
}

// 2 AGENDA
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "01", "NỘI DUNG", "15 phút");
  s.addText("Bốn khối báo cáo", {
    x: 0.55, y: 1.0, w: 12, h: 0.5,
    fontFace: FONT.serif, fontSize: 28, color: C.ink, margin: 0,
  });
  const items = [
    ["01", "Bài toán", "Vì sao tóm tắt tin tiếng Việt; extractive vs abstractive."],
    ["02", "Phương pháp", "Vietnews test-100, Lead-3, TextRank, ViT5 sẵn có."],
    ["03", "Kết quả", "ROUGE n=100; đọc tay 20 bài — ViT5 cao điểm vẫn sai tên."],
    ["04", "Demo", "Ba cột trên máy / Docker. Không phụ thuộc Kaggle lúc bảo vệ."],
  ];
  items.forEach((it, i) => {
    const y = 1.7 + i * 1.15;
    card(s, 0.55, y, 12.2, 1.02);
    s.addText(it[0], {
      x: 0.75, y: y + 0.22, w: 0.9, h: 0.55,
      fontFace: FONT.serif, fontSize: 22, color: C.accent, margin: 0,
    });
    s.addText(it[1], {
      x: 1.85, y: y + 0.14, w: 10.5, h: 0.35,
      fontFace: FONT.sans, fontSize: 18, color: C.ink, bold: true, margin: 0,
    });
    s.addText(it[2], {
      x: 1.85, y: y + 0.52, w: 10.5, h: 0.35,
      fontFace: FONT.sans, fontSize: 14, color: C.body, margin: 0,
    });
  });
  footer(s, 2);
}

// 3 PROBLEM
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "02", "ĐẶT VẤN ĐỀ", "Bài toán");
  s.addText("Bài báo dài. Người đọc cần vài câu đúng ý.", {
    x: 0.55, y: 1.0, w: 12.2, h: 0.55,
    fontFace: FONT.serif, fontSize: 26, color: C.ink, margin: 0,
  });
  card(s, 0.55, 1.75, 5.9, 4.5);
  card(s, 6.85, 1.75, 5.9, 4.5, C.cardWarm);
  s.addText("Máy có hai cách", {
    x: 0.8, y: 1.95, w: 5.4, h: 0.4,
    fontFace: FONT.sans, fontSize: 14, color: C.muted, margin: 0,
  });
  s.addText("Rút trích\n(extractive)", {
    x: 0.8, y: 2.4, w: 5.4, h: 1.0,
    fontFace: FONT.serif, fontSize: 24, color: C.ink, margin: 0,
  });
  s.addText("Chọn câu sẵn có trong bài, ghép lại. Ít bịa chữ mới. Có thể cụt, không liền mạch, lệch sapo.", {
    x: 0.8, y: 3.55, w: 5.4, h: 2.2,
    fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
  });
  s.addText("Máy có hai cách", {
    x: 7.1, y: 1.95, w: 5.4, h: 0.4,
    fontFace: FONT.sans, fontSize: 14, color: C.muted, margin: 0,
  });
  s.addText("Tóm lược\n(abstractive)", {
    x: 7.1, y: 2.4, w: 5.4, h: 1.0,
    fontFace: FONT.serif, fontSize: 24, color: C.ink, margin: 0,
  });
  s.addText("Viết câu mới. Mượt hơn. Có thể sai tên, sai số, đảo ý — ROUGE không bắt hết.", {
    x: 7.1, y: 3.55, w: 5.4, h: 2.2,
    fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
  });
  footer(s, 3);
}

// 4 QUESTION
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "03", "CÂU HỎI NGHIÊN CỨU", "Mục tiêu");
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 1.2, w: 12.2, h: 2.35,
    fill: { color: C.dark },
  });
  s.addText("Trên cùng tập test tin tức tiếng Việt, Lead-3, TextRank và ViT5 khác nhau thế nào về ROUGE — và khi đọc tay thì mỗi hệ sai kiểu gì?", {
    x: 0.9, y: 1.5, w: 11.5, h: 1.75,
    fontFace: FONT.serif, fontSize: 24, color: C.onDark, margin: 0,
  });
  const goals = [
    ["Không làm", "Fine-tune lại ViT5 trên Vietnews. BERT+K-Means đa văn bản (trùng bài 8)."],
    ["Có làm", "Ba hệ, cùng 100 id test, ROUGE, 20 bài đọc tay, demo 3 cột."],
    ["Cam kết", "ViT5 là checkpoint VietAI đã học Vietnews. Nhóm chạy sẵn, không nhận SOTA."],
  ];
  goals.forEach((g, i) => {
    const x = 0.55 + i * 4.15;
    card(s, x, 3.8, 3.95, 2.4);
    s.addText(g[0].toUpperCase(), {
      x: x + 0.25, y: 4.0, w: 3.45, h: 0.35,
      fontFace: FONT.sans, fontSize: 12, color: C.accent, charSpacing: 1.5, margin: 0,
    });
    s.addText(g[1], {
      x: x + 0.25, y: 4.45, w: 3.45, h: 1.5,
      fontFace: FONT.sans, fontSize: 15, color: C.body, margin: 0,
    });
  });
  footer(s, 4);
}

// 5 I/O
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "04", "PHÁT BIỂU BÀI TOÁN", "Input / output");
  s.addText("Một bài → một bản tóm tắt ngắn. Chấm với abstract mẫu.", {
    x: 0.55, y: 1.0, w: 12, h: 0.45,
    fontFace: FONT.serif, fontSize: 24, color: C.ink, margin: 0,
  });
  const rows = [
    ["Input", "Thân bài tiếng Việt (Vietnews, đã tách từ sẵn)."],
    ["Output", "3–5 câu tóm tắt (Lead-3 / TextRank chọn câu; ViT5 sinh câu)."],
    ["Gold", "Trường abstract trong file (đoạn sapo, tách khỏi thân bằng dòng trống)."],
    ["Độ đo", "ROUGE-1, ROUGE-2, ROUGE-L (F1). Cùng 100 id."],
  ];
  rows.forEach((r, i) => {
    const y = 1.65 + i * 1.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y, w: 2.3, h: 0.9, fill: { color: C.dark },
    });
    s.addText(r[0], {
      x: 0.7, y: y + 0.25, w: 2.0, h: 0.4,
      fontFace: FONT.sans, fontSize: 16, color: C.onDark, margin: 0,
    });
    card(s, 2.85, y, 9.9, 0.9);
    s.addText(r[1], {
      x: 3.1, y: y + 0.22, w: 9.4, h: 0.5,
      fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0, valign: "middle",
    });
  });
  footer(s, 5);
}

// 6 DATASET
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "05", "DỮ LIỆU", "Vietnews");
  s.addText("test_tokenized — 100 file đầu, đúng thứ tự tên.", {
    x: 0.55, y: 1.0, w: 12, h: 0.45,
    fontFace: FONT.serif, fontSize: 24, color: C.ink, margin: 0,
  });
  const stats = [
    ["Nguồn", "github.com/ThanhChinhBK/vietnews"],
    ["Split", "data/test_tokenized"],
    ["L1/L2", "000001.txt.seg … 000100.txt.seg"],
    ["Định dạng", "title / abstract / thân bài"],
    ["Tách từ", "Sẵn dấu _ — không gọi lại underthesea trên gold"],
    ["Cấm", "Không tự trộn train/test; không train trên Vietnews"],
  ];
  stats.forEach((st, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.55 + col * 6.35;
    const y = 1.65 + row * 1.45;
    card(s, x, y, 6.1, 1.3);
    s.addText(st[0].toUpperCase(), {
      x: x + 0.25, y: y + 0.18, w: 5.6, h: 0.3,
      fontFace: FONT.sans, fontSize: 12, color: C.accent, margin: 0,
    });
    s.addText(st[1], {
      x: x + 0.25, y: y + 0.55, w: 5.6, h: 0.55,
      fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
    });
  });
  footer(s, 6);
}

// 7 PIPELINE
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "06", "PIPELINE", "Local + Kaggle");
  s.addText("Extractive ở máy. Abstractive chỉ inference trên Kaggle T4.", {
    x: 0.55, y: 1.0, w: 12, h: 0.4,
    fontFace: FONT.serif, fontSize: 22, color: C.ink, margin: 0,
  });
  const steps = [
    ["1", "Đọc file", "parse title / gold / body"],
    ["2", "Tách câu", "mỗi dòng thân bài ≈ 1 câu"],
    ["3", "Lead-3", "3 câu đầu, CPU"],
    ["4", "TextRank", "TF-IDF + cosine + PageRank"],
    ["5", "ViT5", "Kaggle, T5Tokenizer, 4.44.2"],
    ["6", "ROUGE", "thay _ → space, rồi F1"],
  ];
  steps.forEach((st, i) => {
    const x = 0.45 + i * 2.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.7, w: 2.0, h: 4.3, fill: { color: i === 4 ? C.cardWarm : C.cardLight },
      line: { color: C.rule, width: 0.75 },
    });
    s.addText(st[0], {
      x, y: 1.9, w: 2.0, h: 0.7,
      fontFace: FONT.serif, fontSize: 28, color: C.accent, align: "center", margin: 0,
    });
    s.addText(st[1], {
      x: x + 0.1, y: 2.7, w: 1.8, h: 1.1,
      fontFace: FONT.sans, fontSize: 16, color: C.ink, bold: true, align: "center", margin: 0,
    });
    s.addText(st[2], {
      x: x + 0.12, y: 3.9, w: 1.76, h: 1.6,
      fontFace: FONT.sans, fontSize: 13, color: C.body, align: "center", margin: 0,
    });
  });
  footer(s, 7);
}

// 8 THREE SYSTEMS
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "07", "BA HỆ", "Không train");
  const sys = [
    ["Lead-3", "Extractive", "Ba câu đầu thân bài. Baseline chuẩn tóm tắt tin. Không học."],
    ["TextRank", "Extractive", "TF-IDF câu, ma trận cosine, PageRank 40 vòng, lấy 3 câu theo thứ tự gốc."],
    ["ViT5", "Abstractive", "VietAI/vit5-base-vietnews-summarization. Không prefix; generate max_length=256. Không fine-tune."],
  ];
  sys.forEach((sy, i) => {
    const x = 0.55 + i * 4.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.15, w: 3.95, h: 5.4,
      fill: { color: i === 2 ? C.dark : C.cardLight },
      line: { color: C.rule, width: 0.75 },
    });
    s.addText(sy[1].toUpperCase(), {
      x: x + 0.25, y: 1.4, w: 3.45, h: 0.3,
      fontFace: FONT.sans, fontSize: 12, color: i === 2 ? C.onDarkMuted : C.accent, margin: 0,
    });
    s.addText(sy[0], {
      x: x + 0.25, y: 1.85, w: 3.45, h: 0.7,
      fontFace: FONT.serif, fontSize: 26, color: i === 2 ? C.onDark : C.ink, margin: 0,
    });
    s.addText(sy[2], {
      x: x + 0.25, y: 2.8, w: 3.45, h: 3.3,
      fontFace: FONT.sans, fontSize: 16, color: i === 2 ? C.onDark : C.body, margin: 0,
    });
  });
  footer(s, 8);
}

// 9 SETUP
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "08", "THIẾT LẬP", "Tái lập");
  s.addText("Những gì đã chạy — không đoán thời gian GPU.", {
    x: 0.55, y: 1.0, w: 12, h: 0.4,
    fontFace: FONT.serif, fontSize: 22, color: C.ink, margin: 0,
  });
  const tbl = [
    [
      { text: "Hạng mục", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "Chi tiết", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
    ],
    ["Tập chấm", "100 id đầu test_tokenized; file data/test_ids.txt"],
    ["Extractive", "Mac mini M4, CPU, sklearn TF-IDF"],
    ["ViT5", "Kaggle 2× Tesla T4; 1 GPU cuda:0"],
    ["Tokenizer load", "T5Tokenizer; gỡ transformers 5, cài 4.44.2 (tránh KeyError: 0)"],
    ["Generate", "truncation 1024; max_length 256; early_stopping=True"],
    ["Demo", "Gradio 3 cột; Docker vietnews-demo cổng 7860"],
  ];
  s.addTable(tbl, {
    x: 0.55, y: 1.55, w: 12.2, h: 4.7,
    colW: [3.2, 9.0],
    border: { pt: 0.5, color: C.rule },
    fontFace: FONT.sans,
    fontSize: 14,
    color: C.body,
    valign: "middle",
    align: "left",
  });
  footer(s, 9);
}

// 10 ROUGE TABLE
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "09", "KẾT QUẢ", "n = 100");
  s.addText("ROUGE F1  ·  thay “_” → space trên pred và ref", {
    x: 0.55, y: 0.95, w: 12, h: 0.4,
    fontFace: FONT.serif, fontSize: 22, color: C.ink, margin: 0,
  });
  const tbl = [
    [
      { text: "Hệ", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "ROUGE-1", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "ROUGE-2", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "ROUGE-L", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
    ],
    ["Lead-3", "0.2507", "0.1296", "0.1841"],
    ["TextRank", "0.2428", "0.1100", "0.1730"],
    [
      { text: "ViT5", options: { fill: { color: C.cardWarm }, bold: true } },
      { text: "0.2664", options: { fill: { color: C.cardWarm }, bold: true } },
      { text: "0.1341", options: { fill: { color: C.cardWarm }, bold: true } },
      { text: "0.2084", options: { fill: { color: C.cardWarm }, bold: true } },
    ],
  ];
  s.addTable(tbl, {
    x: 0.55, y: 1.5, w: 7.4, h: 3.3,
    colW: [2.2, 1.73, 1.73, 1.74],
    border: { pt: 0.5, color: C.rule },
    fontFace: FONT.sans,
    fontSize: 16,
    color: C.body,
    valign: "middle",
    align: "center",
  });
  card(s, 8.2, 1.5, 4.55, 3.3, C.dark);
  s.addText("Đọc bảng", {
    x: 8.45, y: 1.7, w: 4.1, h: 0.35,
    fontFace: FONT.sans, fontSize: 13, color: C.onDarkMuted, margin: 0,
  });
  s.addText("ViT5 cao hơn một chút trên 100 bài này. Lead-3 ≥ TextRank. Không copy số paper. Không kết luận SOTA.", {
    x: 8.45, y: 2.2, w: 4.1, h: 2.2,
    fontFace: FONT.sans, fontSize: 16, color: C.onDark, margin: 0,
  });
  s.addText("Nếu giữ dấu “_”, ViT5 bị trừ oan vì model không sinh cá_nhân giống gold.", {
    x: 0.55, y: 5.1, w: 12.2, h: 1.15,
    fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
  });
  footer(s, 10);
}

// 11 CHART
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "10", "CÙNG MỘT BIỂU ĐỒ", "F1 × 100");
  s.addChart(pres.charts.BAR, [
    { name: "ROUGE-1", labels: ["Lead-3", "TextRank", "ViT5"], values: [25.07, 24.28, 26.64] },
    { name: "ROUGE-2", labels: ["Lead-3", "TextRank", "ViT5"], values: [12.96, 11.00, 13.41] },
    { name: "ROUGE-L", labels: ["Lead-3", "TextRank", "ViT5"], values: [18.41, 17.30, 20.84] },
  ], {
    x: 0.5, y: 1.05, w: 12.3, h: 5.3,
    barDir: "col",
    chartColors: ["1A1A1A", "8A8578", "B8432A"],
    chartArea: { fill: { color: "F7F3E8" } },
    catAxisLabelColor: "2B2B2B",
    valAxisLabelColor: "8A8578",
    valGridLine: { color: "C8C0AE", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    showValue: false,
    valAxisMaxValue: 35,
    valAxisTitle: "F1 × 100",
    showValAxisTitle: true,
  });
  footer(s, 11);
}

// 11b LENGTH
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "10b", "THEO ĐỘ DÀI BÀI", "n ≈ 33 / nhóm");
  s.addText("Ngưỡng 300 / 500 từ — làm tròn tertile (p33≈298, p67≈492).", {
    x: 0.55, y: 0.95, w: 12.2, h: 0.35,
    fontFace: FONT.serif, fontSize: 18, color: C.ink, margin: 0,
  });
  const tbl = [
    [
      { text: "Nhóm", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "n", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "Lead-3 R-1", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "TextRank R-1", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
      { text: "ViT5 R-1", options: { fill: { color: C.dark }, color: C.onDark, bold: true } },
    ],
    ["Ngắn  <300", "34", "0.2581", "0.2672", "0.2919"],
    ["Trung  300–499", "33", "0.2638", "0.2409", "0.2549"],
    ["Dài  ≥500", "33", "0.2298", "0.2194", "0.2519"],
  ];
  s.addTable(tbl, {
    x: 0.55, y: 1.45, w: 12.2, h: 2.7,
    colW: [2.6, 1.4, 2.73, 2.73, 2.74],
    border: { pt: 0.5, color: C.rule },
    fontFace: FONT.sans,
    fontSize: 15,
    color: C.body,
    valign: "middle",
    align: "center",
  });
  const notes = [
    ["Ngắn", "ViT5 cao nhất cả R-1/2/L."],
    ["Trung", "Lead-3 cao nhất (0.2638)."],
    ["Dài", "Cả ba giảm; ViT5 vẫn hơn extractive."],
  ];
  notes.forEach((n, i) => {
    const x = 0.55 + i * 4.15;
    card(s, x, 4.4, 3.95, 1.85);
    s.addText(n[0], {
      x: x + 0.2, y: 4.55, w: 3.55, h: 0.35,
      fontFace: FONT.sans, fontSize: 14, color: C.accent, margin: 0,
    });
    s.addText(n[1], {
      x: x + 0.2, y: 5.0, w: 3.55, h: 1.0,
      fontFace: FONT.sans, fontSize: 15, color: C.body, margin: 0,
    });
  });
  footer(s, 12);
}

// 12 ERROR OVERVIEW
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "11", "ĐỌC TAY 20 BÀI", "ROUGE không đủ");
  s.addText("ViT5 điểm cao hơn vẫn sai tên và số.", {
    x: 0.55, y: 1.0, w: 12, h: 0.5,
    fontFace: FONT.serif, fontSize: 26, color: C.ink, margin: 0,
  });
  const boxes = [
    ["ViT5", "Sai tên / gán nhầm người; đảo polarity; bịa súng-dao; xe bồn thay máy ủi."],
    ["Lead-3", "Ít bịa (câu lấy từ bài). Hay lệch gold vì gold là sapo/kết luận."],
    ["TextRank", "Đôi khi nhảy đoạn hoặc trộn nhiều tin trong bài tổng hợp 24h."],
  ];
  boxes.forEach((b, i) => {
    const y = 1.7 + i * 1.45;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y, w: 2.4, h: 1.3, fill: { color: C.dark },
    });
    s.addText(b[0], {
      x: 0.7, y: y + 0.4, w: 2.1, h: 0.5,
      fontFace: FONT.serif, fontSize: 20, color: C.onDark, margin: 0,
    });
    card(s, 2.95, y, 9.8, 1.3);
    s.addText(b[1], {
      x: 3.2, y: y + 0.3, w: 9.35, h: 0.7,
      fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0, valign: "middle",
    });
  });
  footer(s, 13);
}

// 13 EXAMPLES
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "12", "BA VÍ DỤ", "Đối chiếu gold");
  const ex = [
    ["000001", "Gold: Hồ Xuân Huy, 12 năm tù.", "ViT5: Bùi Quang Huy / Vũ nhôm, 3,2 tỷ.", "Sai tên"],
    ["000011", "Gold: trộm máy ủi, bán, mua dây chuyền.", "ViT5: “xe bồn”, thuê sửa chữa.", "Bịa đối tượng"],
    ["000036", "Gold: Vĩnh chối Rolex 7.000 USD.", "ViT5: Vĩnh “khai cho ông Vĩnh” 27 tỷ.", "Gán nhầm lời Dương"],
  ];
  ex.forEach((e, i) => {
    const x = 0.5 + i * 4.2;
    card(s, x, 1.15, 4.0, 5.35);
    s.addText(e[0], {
      x: x + 0.25, y: 1.35, w: 3.5, h: 0.35,
      fontFace: FONT.mono, fontSize: 14, color: C.accent, margin: 0,
    });
    s.addText(e[3], {
      x: x + 0.25, y: 1.75, w: 3.5, h: 0.45,
      fontFace: FONT.serif, fontSize: 20, color: C.ink, margin: 0,
    });
    s.addText(e[1], {
      x: x + 0.25, y: 2.45, w: 3.5, h: 1.7,
      fontFace: FONT.sans, fontSize: 15, color: C.body, margin: 0,
    });
    s.addText(e[2], {
      x: x + 0.25, y: 4.3, w: 3.5, h: 1.8,
      fontFace: FONT.sans, fontSize: 15, color: C.accent, margin: 0,
    });
  });
  footer(s, 14);
}

// 14 DEMO
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "13", "DEMO", "Không cần GPU lúc bảo vệ");
  s.addText("Ba cột trên cùng một bài test.", {
    x: 0.55, y: 1.0, w: 12, h: 0.45,
    fontFace: FONT.serif, fontSize: 26, color: C.ink, margin: 0,
  });
  const d = [
    ["Local", "python app/demo.py\nhttp://127.0.0.1:7860"],
    ["Docker", "docker start vietnews-demo\nCùng cổng 7860"],
    ["Dữ liệu", "preds.json có sẵn\nLead-3 / TextRank tính lúc chọn bài"],
  ];
  d.forEach((item, i) => {
    const x = 0.55 + i * 4.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.7, w: 3.95, h: 3.5, fill: { color: C.cardLight },
      line: { color: C.rule, width: 0.75 },
    });
    s.addText(item[0], {
      x: x + 0.25, y: 1.95, w: 3.45, h: 0.5,
      fontFace: FONT.serif, fontSize: 22, color: C.ink, margin: 0,
    });
    s.addText(item[1], {
      x: x + 0.25, y: 2.6, w: 3.45, h: 2.2,
      fontFace: FONT.mono, fontSize: 15, color: C.body, margin: 0,
    });
  });
  s.addText("Quay video 2 phút dự phòng nếu máy phòng máy không có Docker.", {
    x: 0.55, y: 5.45, w: 12.2, h: 0.7,
    fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
  });
  footer(s, 15);
}

// 15 CONCLUSION
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "14", "KẾT LUẬN", "Hạn chế");
  const left = [
    "Trên 100 bài test đầu Vietnews, ViT5 ROUGE-1/2/L cao hơn Lead-3 và TextRank một chút.",
    "Đọc tay 20 bài: ViT5 vẫn sai tên, đảo ý, bịa chi tiết — ROUGE không thay cho đối chiếu gold.",
    "Lead-3 an toàn về chữ (lấy từ bài) nhưng hay lệch sapo.",
  ];
  const right = [
    "Chỉ 100 bài, không phải full test gốc paper.",
    "ViT5 đã học Vietnews; không tách được “khả năng mô hình” với “đã thấy miền này”.",
    "Gold dạng bản tin 24h (nhiều tin/bài) cả ba hệ đều yếu.",
    "Chưa đo latency; chưa full test paper.",
  ];
  card(s, 0.55, 1.1, 6.1, 5.4);
  card(s, 6.85, 1.1, 5.9, 5.4, C.cardWarm);
  s.addText("Nhận được", {
    x: 0.8, y: 1.3, w: 5.6, h: 0.4,
    fontFace: FONT.sans, fontSize: 14, color: C.accent, margin: 0,
  });
  left.forEach((t, i) => {
    s.addText(t, {
      x: 0.8, y: 1.85 + i * 1.35, w: 5.55, h: 1.25,
      fontFace: FONT.sans, fontSize: 15, color: C.body, margin: 0,
    });
  });
  s.addText("Không nhận", {
    x: 7.1, y: 1.3, w: 5.4, h: 0.4,
    fontFace: FONT.sans, fontSize: 14, color: C.accent, margin: 0,
  });
  right.forEach((t, i) => {
    s.addText(t, {
      x: 7.1, y: 1.85 + i * 1.05, w: 5.4, h: 0.95,
      fontFace: FONT.sans, fontSize: 15, color: C.body, margin: 0,
    });
  });
  footer(s, 16);
}

// 16 NEXT
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "15", "NẾU LÀM TIẾP", "Ngoài phạm vi đồ án");
  const nxt = [
    ["01", "Đọc tay thêm", "Mở rộng 20 bài; đếm sai tên/số có hệ thống."],
    ["02", "Gold đa tin", "Tách bài “an ninh 24h” thành từng tin trước khi tóm."],
    ["03", "Không train trùng", "Nếu fine-tune, phải miền khác Vietnews."],
  ];
  nxt.forEach((n, i) => {
    const y = 1.2 + i * 1.6;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y, w: 1.3, h: 1.4, fill: { color: C.dark },
    });
    s.addText(n[0], {
      x: 0.55, y: y + 0.4, w: 1.3, h: 0.55,
      fontFace: FONT.serif, fontSize: 22, color: C.onDark, align: "center", margin: 0,
    });
    card(s, 1.85, y, 10.9, 1.4);
    s.addText(n[1], {
      x: 2.15, y: y + 0.2, w: 10.4, h: 0.4,
      fontFace: FONT.sans, fontSize: 18, color: C.ink, bold: true, margin: 0,
    });
    s.addText(n[2], {
      x: 2.15, y: y + 0.7, w: 10.4, h: 0.45,
      fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
    });
  });
  footer(s, 17);
}

// 17 REFS
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  header(s, "16", "TÀI LIỆU", "Đã dùng");
  const refs = [
    "Nguyen et al. — VNDS / Vietnews. https://github.com/ThanhChinhBK/vietnews",
    "Phan et al. 2022. ViT5. NAACL SRW. Checkpoint: VietAI/vit5-base-vietnews-summarization",
    "Lin 2004. ROUGE. Model card ViT5: không prefix, </s>, max_length=256",
    "Mihalcea & Tarau — TextRank. Lead-3: baseline tóm tắt tin.",
    "Repo nhóm: github.com/hoangdq08/vietnews-summarization-extractive-abstractive",
  ];
  refs.forEach((r, i) => {
    s.addText(`${i + 1}.  ${r}`, {
      x: 0.7, y: 1.2 + i * 0.85, w: 12, h: 0.75,
      fontFace: FONT.sans, fontSize: 16, color: C.body, margin: 0,
    });
  });
  footer(s, 18);
}

// 18 QA
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  s.addText("CS221  ·  HỎI ĐÁP", {
    x: 0.7, y: 2.15, w: 12, h: 0.4,
    fontFace: FONT.sans, fontSize: 14, color: C.onDarkMuted, charSpacing: 3, margin: 0,
  });
  s.addText("Câu nào cũng được.\nSố liệu nằm trong results/.", {
    x: 0.7, y: 2.7, w: 12, h: 1.6,
    fontFace: FONT.serif, fontSize: 32, color: C.onDark, margin: 0,
  });
  s.addText("Demo: 127.0.0.1:7860   ·   Repo: hoangdq08/vietnews-summarization-extractive-abstractive", {
    x: 0.7, y: 5.7, w: 12, h: 0.35,
    fontFace: FONT.mono, fontSize: 14, color: C.onDarkMuted, margin: 0,
  });
}

pres.writeFile({
  fileName: "/Users/hoangdo/Projects/AI/CS221.F31.LT.TTNT - Xử lý ngôn ngữ tự nhiên - Đặng Văn Thìn/vietnews-summarization-extractive-abstractive/slides/CS221-Vietnews-tom-tat.pptx",
}).then(() => console.log("wrote pptx"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
