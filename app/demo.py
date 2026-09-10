"""Demo 3 cột: Lead-3 | TextRank | ViT5 trên 100 bài test."""

import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from extractive import lead_n, textrank
from paths import RESULTS
from preprocess import load_docs


def main():
    import gradio as gr

    docs = load_docs(100)
    by_id = {d["id"]: d for d in docs}
    pred_path = RESULTS / "preds.json"
    pred_map = {}
    if pred_path.exists():
        pred_map = {row["id"]: row.get("pred", "") for row in json.loads(pred_path.read_text(encoding="utf-8"))}
    scores = {}
    scores_path = RESULTS / "scores.csv"
    if scores_path.exists():
        with scores_path.open(encoding="utf-8") as f:
            scores = {row["id"]: row for row in csv.DictReader(f)}
    choices = [f"{d['id']}  |  {d['title'][:80]}" for d in docs]
    choice_to_id = {c: c.split("  |  ", 1)[0] for c in choices}

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
            tag("vit5", pred_map.get(doc_id, "(thiếu preds.json)")),
        )

    with gr.Blocks(title="Tóm tắt tin tức tiếng Việt") as demo:
        gr.Markdown(
            "## Vietnews summarization\n"
            "Lead-3 và TextRank chạy local. ViT5 lấy từ `results/preds.json` (không gọi GPU)."
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
