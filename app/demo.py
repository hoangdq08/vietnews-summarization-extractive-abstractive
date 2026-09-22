"""Demo 3 cột: Lead-3 | TextRank | ViT5 trên 500 bài test đầu."""

import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from extractive import lead_n, textrank
from paths import RESULTS
from preprocess import load_docs


def load_ab():
    """Optional offline artifact. Missing data must not break the baseline demo."""
    path = RESULTS / "vit5_input_ab_confirm100" / "predictions.json"
    if not path.exists():
        return {}, "Chưa có artifact A/B xác nhận 100 bài. Baseline vẫn hoạt động."
    rows = json.loads(path.read_text(encoding="utf-8"))
    pairs = {}
    for row in rows:
        variants = pairs.setdefault(row["id"], {})
        if row["variant"] in variants:
            raise ValueError("Duplicate A/B record: " + row["id"])
        variants[row["variant"]] = row
    if any(set(v) != {"original", "spaces"} for v in pairs.values()):
        raise ValueError("Incomplete A/B pairs")
    return pairs, "A/B sinh sẵn, không inference trực tiếp. ROUGE cao không đảm bảo đúng sự thật."


def main():
    import gradio as gr

    docs = load_docs(500)
    by_id = {d["id"]: d for d in docs}
    pred_path = RESULTS / "preds_500.json"
    pred_map = {}
    if pred_path.exists():
        pred_map = {row["id"]: row.get("pred", "") for row in json.loads(pred_path.read_text(encoding="utf-8"))}
    scores = {}
    scores_path = RESULTS / "scores_500.csv"
    if scores_path.exists():
        with scores_path.open(encoding="utf-8") as f:
            scores = {row["id"]: row for row in csv.DictReader(f)}
    choices = [f"{d['id']}  |  {d['title'][:80]}" for d in docs]
    choice_to_id = {c: c.split("  |  ", 1)[0] for c in choices}
    ab_pairs, ab_notice = load_ab()

    def run_ab(doc_id):
        from preprocess import parse_file
        from paths import DATA_DIR
        pair = ab_pairs[doc_id]
        path = DATA_DIR / doc_id
        body = parse_file(path)["body"] if path.exists() else "Thiếu bài gốc trên máy. Chạy fetch_vietnews.py --n 500 để đối chiếu."
        def tagged(row):
            return (f"ROUGE-1 {row['rouge1']:.4f} | ROUGE-2 {row['rouge2']:.4f} | ROUGE-L {row['rougeL']:.4f}\n"
                    f"Input tokens {row['full_input_tokens']} → {row['used_input_tokens']} | Bị cắt: {row['truncated']}\n\n" + row['pred'])
        a, b = pair["original"], pair["spaces"]
        return a["title"], body.replace("_", " "), a["abstract"].replace("_", " "), tagged(a), tagged(b)

    def run(choice):
        doc_id = choice_to_id[choice]
        doc = by_id[doc_id]
        sc = scores.get(doc_id, {})

        def tag(name, text):
            r1 = sc.get(f"{name}_r1", "")
            head = f"ROUGE-1 {r1}  |  ROUGE-2 {sc.get(f'{name}_r2', '')}  |  ROUGE-L {sc.get(f'{name}_rL', '')}\n\n" if r1 else ""
            return head + text

        return (
            doc["title"],
            doc["abstract"],
            tag("lead3", lead_n(doc["sentences"], 3)),
            tag("textrank", textrank(doc["sentences"], 3)),
            tag("vit5", pred_map.get(doc_id, "(thiếu preds_500.json)")),
        )

    with gr.Blocks(title="Tóm tắt tin tức tiếng Việt") as demo:
        gr.Markdown(
            "## Vietnews summarization\n"
            "500 bài test đầu. Lead-3 và TextRank chạy trong container. ViT5 lấy từ `results/preds_500.json`."
        )
        picker = gr.Dropdown(choices, value=choices[0], label="Bài test")
        title = gr.Textbox(label="Tiêu đề", lines=1)
        gold = gr.Textbox(label="Tóm tắt mẫu (gold)", lines=4)
        with gr.Row():
            lead_box = gr.Textbox(label="Lead-3", lines=12)
            tr_box = gr.Textbox(label="TextRank", lines=12)
            vit5_box = gr.Textbox(label="ViT5", lines=12)
        picker.change(run, inputs=picker, outputs=[title, gold, lead_box, tr_box, vit5_box])
        demo.load(run, inputs=picker, outputs=[title, gold, lead_box, tr_box, vit5_box])
        with gr.Accordion("Thí nghiệm A/B ViT5: 100 bài xác nhận riêng", open=False):
            gr.Markdown(ab_notice)
            if ab_pairs:
                ab_picker = gr.Dropdown(sorted(ab_pairs), value=sorted(ab_pairs)[0], label="ID A/B (tập riêng, có giao với baseline)")
                ab_button = gr.Button("Xem đối chiếu A/B")
                ab_title = gr.Textbox(label="Tiêu đề A/B", interactive=False)
                ab_body = gr.Textbox(label="Bài gốc để kiểm chứng (hiển thị đã bỏ _)", lines=12, interactive=False)
                ab_gold = gr.Textbox(label="Gold tham chiếu", lines=3, interactive=False)
                with gr.Row():
                    ab_a = gr.Textbox(label="A: input giữ _", lines=8, interactive=False)
                    ab_b = gr.Textbox(label="B: input khoảng trắng", lines=8, interactive=False)
                ab_button.click(run_ab, inputs=ab_picker, outputs=[ab_title, ab_body, ab_gold, ab_a, ab_b], api_name="compare_ab")

    in_docker = Path("/.dockerenv").exists()
    if in_docker:
        import gradio.networking as gn

        gn.url_ok = lambda _url: True
    demo.launch(
        server_name="0.0.0.0" if in_docker else "127.0.0.1",
        server_port=7860,
        share=False,
        inbrowser=not in_docker,
    )


if __name__ == "__main__":
    main()
