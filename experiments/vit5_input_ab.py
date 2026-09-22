"""Controlled ViT5 input A/B.

--limit 1 or 20: evenly spaced exploratory IDs.
--limit 100: confirmation IDs 000002, 000007, ..., 000497.
--limit 500: every article 000001–000500, in filename order.
Writes only to a new output directory. Does not overwrite baseline predictions.
"""
import argparse
import hashlib
import json
import platform
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))
from preprocess import load_docs
from evaluate import normalize, rouge_one


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, choices=[1, 20, 100, 500], required=True)
    ap.add_argument("--output", type=Path, required=True)
    args = ap.parse_args()
    if args.output.exists():
        raise SystemExit("Output already exists. Choose a new directory to preserve evidence.")
    import torch
    import transformers
    from transformers import T5Tokenizer, T5ForConditionalGeneration

    torch.manual_seed(0)
    torch.set_num_threads(4)
    # simplify: CPU float32 is slower but avoids an unverified MPS numerical path.
    # Upgrade to MPS only after separate CPU/MPS equivalence checks.
    device = "cpu"
    model_id = "VietAI/vit5-base-vietnews-summarization"
    revision = "a54febd011c0a39ce49ceacd9225e63ef3a73ad3"
    docs = load_docs(500)
    if args.limit == 500:
        selected = docs
        selection = "IDs 000001-000500 in filename order"
    elif args.limit == 100:
        selected = [docs[i] for i in range(1, 500, 5)]
        selection = "IDs 2,7,...,497 disjoint confirmation"
    else:
        selected = [docs[i] for i in range(0, 500, 25)][:args.limit]
        selection = "IDs 1,26,...,476 exploratory"
    args.output.mkdir(parents=True)
    print("JCODE_PROGRESS " + json.dumps({"message": "Loading pinned checkpoint " + revision}), flush=True)
    tok = T5Tokenizer.from_pretrained(model_id, revision=revision)
    model = T5ForConditionalGeneration.from_pretrained(model_id, revision=revision).to(device)
    model.eval()
    generation = dict(max_length=256, early_stopping=True, do_sample=False, num_beams=1)
    meta = {
        "model": model_id, "revision": revision, "python": platform.python_version(),
        "torch": torch.__version__, "transformers": transformers.__version__,
        "device": device, "dtype": str(model.dtype), "seed": 0, "threads": 4,
        "generation_overrides": generation, "generation_defaults": model.generation_config.to_dict(),
        "input_max_tokens": 1024, "tokenizer_class": type(tok).__name__,
        "tokenizer_legacy": getattr(tok, "legacy", None),
        "selection": selection,
        "review_ids": [d["id"] for d in selected[::5]] if args.limit == 100 else [],
        "ids": [d["id"] for d in selected],
        "metric": "project normalize(_ -> space) + WhitespaceTokenizer ROUGE F1",
        "purpose": "exploratory A/B, not model tuning or paper replication",
    }
    (args.output / "metadata.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2))
    rows = []
    for doc in selected:
        for variant in ("original", "spaces"):
            body = doc["body"] if variant == "original" else doc["body"].replace("_", " ")
            text = body + "</s>"
            full = tok(text, truncation=False)["input_ids"]
            enc = tok(text, return_tensors="pt", truncation=True, max_length=1024)
            start = time.monotonic()
            with torch.no_grad():
                output = model.generate(**enc, **generation)
            elapsed = time.monotonic() - start
            pred = tok.decode(output[0], skip_special_tokens=True, clean_up_tokenization_spaces=True)
            row = {
                "id": doc["id"], "variant": variant, "title": doc["title"],
                "abstract": doc["abstract"], "pred": pred,
                "input_sha256": hashlib.sha256(text.encode()).hexdigest(),
                "full_input_tokens": len(full), "used_input_tokens": int(enc["input_ids"].shape[1]),
                "truncated": len(full) > 1024, "output_tokens": len(output[0]),
                "seconds": elapsed, **rouge_one(normalize(pred), normalize(doc["abstract"])),
            }
            rows.append(row)
            # Save each completed inference so a timeout does not erase partial results.
            (args.output / "predictions.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2))
            print("JCODE_PROGRESS " + json.dumps({"current": len(rows), "total": 2 * len(selected), "message": doc["id"] + " " + variant, "seconds": round(elapsed, 2)}), flush=True)
    summary = {}
    for variant in ("original", "spaces"):
        subset = [r for r in rows if r["variant"] == variant]
        summary[variant] = {k: sum(r[k] for r in subset) / len(subset) for k in ("rouge1", "rouge2", "rougeL", "seconds", "full_input_tokens")}
        summary[variant]["truncated_articles"] = sum(r["truncated"] for r in subset)
        summary[variant]["n"] = len(subset)
    (args.output / "summary.json").write_text(json.dumps(summary, indent=2))
    print(json.dumps(summary, indent=2), flush=True)


if __name__ == "__main__":
    main()
