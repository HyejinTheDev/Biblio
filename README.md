---
title: Biblio AI VinUni
emoji: 🤖
colorFrom: indigo
colorTo: purple
sdk: gradio
app_file: app.py
pinned: false
---

# Biblio — Hệ Thống Vượt Ải "AI Thực Chiến VinUni"

Biblio là nền tảng học tập thích ứng (Adaptive Learning Platform) kết hợp **Gamified Adventure Map**, **Knowledge Tracing (BKT)**, và **Chương trình luyện thi AI Thực Chiến VinUni**.

---

## 🌟 Tính Năng Nổi Bật

- **4 Giai Đoạn (Phases) — 40 Ải:** Bao phủ toàn diện từ Python idioms, NumPy Vectorization, Đại số tuyến tính, Gradient Calculus, PyTorch, Transformer đến GenAI/RAG.
- **3 Cấp Độ Thử Thách:** Thường 🟢 (+50 EXP, 1 ⭐), Trung bình 🟡 (+100 EXP, 2 ⭐⭐), Địa ngục 🔴 (+250 EXP, 3 ⭐⭐⭐ - Phỏng vấn VinUni).
- **Mô Hình BKT Chuẩn Mực:** Cập nhật xác suất nắm vững kiến thức $P(L_t)$ theo thời gian thực.
- **Fullstack Single-Process:** FastAPI phục vụ đồng thời cả RESTful API và giao diện Web React Single-Page Application (SPA) trên cổng `7860`.

---

## 🚀 Khởi Chạy Local

### 1. Chạy Toàn Bộ (Frontend + Backend trên cổng 7860)
```bash
py app.py
```
> Mở trình duyệt vào [http://localhost:7860](http://localhost:7860)

### 2. Hoặc Chạy Tách Biệt Khi Lập Trình (Dev Mode)
- **Backend:**
  ```bash
  cd backend
  py -m uvicorn api.main:app --reload --port 8000
  ```
- **Frontend:**
  ```bash
  cd frontend
  npm run dev
  ```

---

## 🌐 Triển Khai Lên Hugging Face Spaces (Miễn Phí 100%)

1. Tạo một Space mới tại [Hugging Face Spaces](https://huggingface.co/new-space) với SDK là **Gradio** (chọn template **Blank**).
2. Thêm remote và đẩy code lên:
```bash
git remote add space https://huggingface.co/spaces/<YOUR_USERNAME>/<SPACE_NAME>
git push space main -f
```
