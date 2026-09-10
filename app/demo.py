"""Demo 3 cột: Lead-3 | TextRank | ViT5 trên 100 bài test."""

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from extractive import lead_n, textrank
from fetch_vietnews import file_ids
from preprocess import DATA_DIR, load_docs


def load_pred_map():
    path = ROOT / "results" / "preds.json"
    if not path.exists():
        return {}
    return {row["id"]: row.get("pred", "") for row in json.loads(path.read_text(encoding="utf-8"))}


def load_scores():
    path = ROOT / "results" / "scores.csv"
    if not path.exists():
        return {}
    out = {}
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            out[row["id"]] = row
    return out


def main():
    import gradio as gr

    docs = load_docs(DATA_DIR, names=file_ids(100))
    by_id = {d["id"]: d for d in docs}
    pred_map = load_pred_map()
    scores = load_scores()
    choices = [f"{d['id']}  |  {d['title'][:80]}" for d in docs]
    choice_to_id = {c: c.split("  |  ", 1)[0] for c in choices}

    def run(choice):
        doc_id = choice_to_id[choice]
        doc = by_id[doc_id]
        lead = lead_n(doc["sentences"], 3)
        tr = textrank(doc["sentences"], 3)
        vit5 = pred_map.get(doc_id, "(thiếu preds.json)")
        sc = scores.get(doc_id, {})
        def tag(name, text):
            r1 = sc.get(f"{name}_r1", "")
            r2 = sc.get(f"{name}_r2", "")
            rl = sc.get(f"{name}_rL", "")
            head = f"ROUGE-1 {r1}  |  ROUGE-2 {r2}  |  ROUGE-L {rl}\n\n" if r1 else ""
            return head + text
        return doc["title"], doc["abstract"], tag("lead3", lead), tag("textrank", tr), tag("vit5", vit5)

    with gr.Blocks(title="Tóm tắt tin tức tiếng Việt") as demo:
        gr.Markdown(
            "## So sánh tóm tắt rút trích và tóm lược trên tin tức tiếng Việt\n"
            "100 bài Vietnews test. Lead-3 / TextRank chạy local; ViT5 lấy từ `preds.json`."
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
