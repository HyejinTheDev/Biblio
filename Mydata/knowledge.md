Lộ trình kiến thức theo từng tuần (khớp với plan code ở trên)

Tuần 1 — Nền tảng ML + Xác suất cơ bản



Cần hiểu trước khi code BKT:



Xác suất có điều kiện, Bayes' theorem — vì BKT thực chất là 1 bài toán Bayesian update

Hidden Markov Model (HMM) cơ bản — BKT là 1 dạng đơn giản của HMM

Không cần học sâu, chỉ cần hiểu đủ để đọc công thức BKT và tự code lại

Tuần 2 — Deep Learning cơ bản + PyTorch



Cần cho DKT (Deep Knowledge Tracing):



Neural network cơ bản: forward pass, backprop, loss function

RNN/LSTM — vì DKT dùng LSTM để model chuỗi hành vi học tập theo thời gian

PyTorch thực hành: tensor, Dataset/DataLoader, training loop

Đọc paper gốc: Piech et al. 2015 - "Deep Knowledge Tracing" (bắt buộc đọc để hiểu bạn đang implement lại cái gì)

Tuần 3 — Model Evaluation

AUC-ROC, RMSE — cách đo model dự đoán đúng/sai

Train/test split đúng cách cho time-series (không được shuffle random như data thường, vì có thứ tự thời gian)

Tuần 4 — NLP + Embedding + RAG



Đây là mảng "hot" nhất, cần học kỹ:



Embedding là gì, cách hoạt động (word2vec → sentence-transformers)

Chunking strategy — cách chia tài liệu sao cho hợp lý

Vector similarity search (cosine similarity, ANN search)

Reranking — vì sao retrieval xong cần rerank lại

RAG pipeline đầy đủ: retrieval-augmented generation hoạt động ra sao

Tuần 5 — LLM Agent \& Tool Calling

Prompt engineering cơ bản

Function calling / tool calling — cách LLM tự quyết định gọi tool nào

Agent orchestration pattern — ReAct, hoặc đơn giản hơn là state machine tự thiết kế

Hallucination — vì sao xảy ra, cách kiểm chứng output

Tuần 6 — MLOps cơ bản

Docker, Docker Compose — containerize ứng dụng

Caching strategy (Redis) — vì sao cần cache, cache gì

Basic monitoring — hiểu latency, throughput là gì

