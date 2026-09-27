FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend, data and built frontend
COPY backend/ ./backend/
COPY data/ ./data/
COPY frontend/dist/ ./frontend/dist/

ENV PYTHONPATH=/app/backend
ENV APP_PORT=7860

EXPOSE 7860

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "7860"]
