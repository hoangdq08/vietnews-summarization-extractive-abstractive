FROM python:3.11-slim-bookworm

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir "fastapi==0.115.6" "starlette==0.41.3"

COPY src/ src/
COPY app/ app/
RUN python src/fetch_vietnews.py --n 100

COPY results/preds.json results/preds.json
COPY results/scores.csv results/scores.csv

EXPOSE 7860
CMD ["python", "app/demo.py"]
