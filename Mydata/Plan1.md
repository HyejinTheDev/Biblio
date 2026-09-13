Sản phẩm cuối cùng sẽ trông như thế nào

1. Trải nghiệm người dùng (góc nhìn học sinh)

Bước 1 — Vào hệ thống lần đầu
Học sinh chọn môn học (VD: Toán lớp 8), làm bài kiểm tra đầu vào 10-15 câu trắc nghiệm/tự luận ngắn.

Bước 2 — Xem "Bản đồ kiến thức của tôi"
Sau khi làm xong, hiện ra 1 giao diện dạng sơ đồ mạng lưới (graph) — mỗi node là 1 kỹ năng (VD: "Phân số", "Phương trình bậc 1"), tô màu theo mức độ nắm vững:

🔴 Đỏ = yếu, cần học ngay
🟡 Vàng = trung bình
🟢 Xanh = đã vững

Bước 3 — Hệ thống đề xuất bài học tiếp theo
Không phải "học sinh tự chọn bài nào học", mà hệ thống nói thẳng: "Bạn nên học 'Phân số' trước, vì đây là gốc của nhiều lỗi bạn đang gặp ở phần phương trình."

Bước 4 — Làm bài luyện tập cá nhân hóa
Câu hỏi được chọn hoặc AI sinh ra riêng cho đúng lỗ hổng đó (không phải bài chung chung).

Bước 5 — Sau mỗi câu trả lời, bản đồ cập nhật ngay lập tức
Node chuyển màu real-time, thanh tiến độ tổng thể tăng lên → tạo cảm giác "đang tiến bộ thật sự", không chỉ là làm bài rồi thôi.

2. Trải nghiệm phía giáo viên/admin (dashboard riêng)

Một màn hình xem được:

Cả lớp đang yếu chung ở kỹ năng nào (để biết dạy lại cái gì)
Từng học sinh cụ thể: biểu đồ tiến độ theo thời gian, dự đoán khả năng học sinh nào sắp "rớt" (mastery giảm dần) 3. Hình dung cụ thể bằng giao diện (mô tả bằng chữ để bạn dễ hình dung)
┌─────────────────────────────────────────┐
│ Biblio — Lộ trình học của Minh │
├─────────────────────────────────────────┤
│ │
│ [Bản đồ kiến thức - graph tương tác] │
│ │
│ 🔴 Phân số ── 🟡 PT bậc 1 ── 🟢 PT bậc 2│
│ │ │
│ 🟢 Số nguyên │
│ │
├─────────────────────────────────────────┤
│ 📌 Gợi ý tiếp theo: "Ôn lại Phân số" │
│ [Bắt đầu luyện tập →] │
├─────────────────────────────────────────┤
│ Tiến độ tổng: ████████░░ 76% │
└─────────────────────────────────────────┘ 4. Điều quan trọng nhất khi demo cho nhà tuyển dụng

Sản phẩm không cần đẹp như app thương mại — chỉ cần 1 video demo 2-3 phút chứng minh được:

Học sinh làm sai 1 câu → hệ thống nhận diện đúng skill bị yếu
Bản đồ kiến thức đổi màu ngay lập tức, phản ánh đúng logic (không phải giả)
AI Agent tự động đề xuất bài học/câu hỏi phù hợp (không phải hard-code sẵn)
Có 1 slide/README show số liệu: model dự đoán chính xác bao nhiêu % (AUC), hệ thống phản hồi nhanh cỡ nào (latency)

Mục tiêu chính

Có 1 project đủ mạnh để lọt vào mắt nhà tuyển dụng khi apply vị trí AI Engineer fresher — không phải chỉ để học, mà để chứng minh năng lực qua sản phẩm cụ thể, khớp đúng với các JD bạn đã gửi (RAG, Vector DB, AI Agent, Knowledge Tracing, Docker/FastAPI...).

Cụ thể, project này phải đạt được 3 điều
Chứng minh bạn hiểu sâu, không chỉ ghép API
Tự code thuật toán lõi (BKT/DKT) thay vì chỉ gọi thư viện có sẵn — đây là điểm khác biệt lớn nhất so với hàng loạt "RAG chatbot" đại trà mà fresher khác nộp.
Khớp trực tiếp với từ khóa trong JD thật
Mỗi tính năng trong plan đều map được vào 1 dòng yêu cầu cụ thể trong 2 JD bạn gửi — để khi nhà tuyển dụng đọc README/GitHub, họ thấy ngay "đúng cái mình cần".
Có số liệu, không chỉ có mô tả
AUC score, precision@k, latency... — những con số cụ thể để chứng minh "nó chạy được và có đo lường", chứ không phải chỉ là ý tưởng suông.
Kết quả cuối cùng khi hoàn thành

Một GitHub repo + demo video + README mà bạn có thể:

Đưa vào CV như 1 dòng nổi bật
Dùng để trả lời phỏng vấn kỹ thuật (giải thích được thuật toán, kiến trúc, trade-off đã chọn)
Chứng minh bạn tư duy như 1 AI Engineer thật sự — biết đánh giá model, biết đóng gói deploy, biết ghép nhiều thành phần AI thành hệ thống hoàn chỉnh
