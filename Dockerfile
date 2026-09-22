FROM python:3.11-slim-bookworm

WORKDIR /app
ENV PYTHONPATH=/app/src
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir "fastapi==0.115.6" "starlette==0.41.3"

COPY src/ src/
RUN python src/fetch_vietnews.py --n 500

COPY app/ app/
COPY results/preds_500.json results/preds_500.json
COPY results/scores_500.csv results/scores_500.csv
COPY results/vit5_input_ab_confirm100/predictions.json results/vit5_input_ab_confirm100/predictions.json

EXPOSE 7860
CMD ["python", "app/demo.py"]
