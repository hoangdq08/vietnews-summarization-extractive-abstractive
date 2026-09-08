"""Demo 1 trang: dán bài đã tách từ hoặc chọn id trong test_100."""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from extractive import lead_n, textrank
from preprocess import load_docs

try:
    import gradio as gr
except ImportError:
    gr = None


def summarize_doc(doc, pred_map):
    lead = lead_n(doc["sentences"], 3)
    tr = textrank(doc["sentences"], 3)
    vit5 = pred_map.get(doc["id"], "(chưa có preds.json — chạy notebook Kaggle)")
    return doc["abstract"], lead, tr, vit5


def main():
    docs = load_docs(ROOT / "data" / "test_100", ROOT / "data" / "test_ids.txt", limit=100)
    by_id = {d["id"]: d for d in docs}
    pred_path = ROOT / "results" / "preds.json"
    pred_map = {}
    if pred_path.exists():
        for row in json.loads(pred_path.read_text(encoding="utf-8")):
            pred_map[row["id"]] = row.get("pred", "")

    if gr is None:
        doc = docs[0]
        gold, lead, tr, vit5 = summarize_doc(doc, pred_map)
        print("ID", doc["id"], doc["title"])
        print("GOLD", gold)
        print("LEAD", lead)
        print("TR", tr)
        print("VIT5", vit5)
        print("Cài gradio để mở giao diện: pip install gradio")
        return

    def run(doc_id):
        doc = by_id[doc_id]
        gold, lead, tr, vit5 = summarize_doc(doc, pred_map)
        return doc["title"], gold, lead, tr, vit5

    ids = [d["id"] for d in docs]
    demo = gr.Interface(
        fn=run,
        inputs=gr.Dropdown(ids, label="id bài test"),
        outputs=[
            gr.Textbox(label="Tiêu đề"),
            gr.Textbox(label="Tóm tắt mẫu"),
            gr.Textbox(label="Lead-3"),
            gr.Textbox(label="TextRank"),
            gr.Textbox(label="ViT5"),
        ],
        title="Tóm tắt tin tức tiếng Việt",
    )
    demo.launch()


if __name__ == "__main__":
    main()
