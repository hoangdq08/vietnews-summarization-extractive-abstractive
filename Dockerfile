FROM python:3.11-slim-bookworm

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir "fastapi==0.115.6" "starlette==0.41.3"

COPY app/ app/
COPY src/ src/
COPY data/test_ids.txt data/test_ids.txt
COPY data/test_100/ data/test_100/
COPY results/preds.json results/preds.json
COPY results/scores.csv results/scores.csv

EXPOSE 7860
CMD ["python", "app/demo.py"]
