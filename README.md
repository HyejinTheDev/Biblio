# Biblio — Hệ Thống Đề Xuất Học Tập & Theo Vết Kiến Thức (Knowledge Tracing)

Biblio là nền tảng học tập thích ứng (Adaptive Learning Platform) tích hợp **Knowledge Tracing (BKT / DKT)**, **Knowledge Graph**, **RAG (Retrieval-Augmented Generation)** và **AI Agent** nhằm cá nhân hóa lộ trình học tập và tối ưu hóa lỗ hổng kiến thức cho học sinh.

---

## 🌟 Kiến Trúc Tổng Quan

```text
Biblio/
├── backend/          # FastAPI App + AI Core (BKT, DKT, Knowledge Graph, RAG, Agent)
├── frontend/         # React + TypeScript + Tailwind (Interactive Knowledge Graph)
├── data/             # Knowledge graph & ngân hàng câu hỏi theo môn học
├── monitoring/       # Prometheus & Grafana metrics
└── docker-compose.yml# Quản lý PostgreSQL, Redis, Qdrant, Backend, Frontend
```

---

## 🚀 Khởi Chạy Nhanh (Quick Start)

### 1. Yêu cầu hệ thống
- Docker & Docker Compose
- Python 3.10+ (nếu chạy local)
- Node.js 18+ (nếu chạy local frontend)

### 2. Thiết lập môi trường
```bash
cp .env.example .env
```

### 3. Chạy qua Docker Compose
```bash
docker-compose up -d --build
```
- Frontend: `http://localhost:3000`
- Backend API Docs: `http://localhost:8000/docs`
- Qdrant Dashboard: `http://localhost:6333/dashboard`

---

## 🔬 Thuật Toán & Module Cốt Lõi
- **BKT (Bayesian Knowledge Tracing):** Tự cài đặt cập nhật xác suất nắm vững kiến thức ($P(L_t)$) sau từng câu trả lời.
- **DKT (Deep Knowledge Tracing):** Mô hình hóa chuỗi bài tập qua thời gian bằng mạng nơ-ron tuần hoàn (LSTM/RNN).
- **Knowledge Graph Query:** Thuật toán duyệt đồ thị xác định điểm tiên quyết (prerequisite) và đề xuất kỹ năng kế tiếp.
- **AI Agent & Tool Calling:** Tự động điều phối giữa truy xuất tài liệu (RAG), ngân hàng câu hỏi và trạng thái học sinh.
