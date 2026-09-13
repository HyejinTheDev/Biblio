Cấu trúc tối ưu đầy đủ: Frontend → Backend → Data → Infra

Giả định tech stack (dựa theo plan trước)

Frontend: React + TypeScript + Tailwind

Backend: FastAPI (Python)

DB: PostgreSQL + Redis + Qdrant

AI Agent/RAG: nằm trong backend, gọi LLM API

FRONTEND

frontend/

├── public/

├── src/

│   ├── main.tsx                        # entry point

│   ├── App.tsx                         # routing tổng

│   │

│   ├── components/                     # UI THUẦN, KHÔNG chứa business logic

│   │   ├── common/                     # dùng khắp nơi (Button, Modal, Loading...)

│   │   │   ├── Button.tsx

│   │   │   ├── Modal.tsx

│   │   │   └── LoadingSpinner.tsx

│   │   ├── knowledge-graph/            # component phức tạp, tách riêng folder

│   │   │   ├── KnowledgeGraph.tsx      # render graph (dùng d3/react-flow)

│   │   │   ├── SkillNode.tsx           # 1 node trong graph

│   │   │   └── GraphLegend.tsx         # chú thích màu sắc

│   │   ├── question/

│   │   │   ├── QuestionCard.tsx

│   │   │   └── AnswerInput.tsx

│   │   └── dashboard/

│   │       ├── ProgressBar.tsx

│   │       └── MasteryChart.tsx        # dùng lại ở cả student \& teacher view

│   │

│   ├── pages/                          # GHÉP component lại thành màn hình

│   │   ├── student/

│   │   │   ├── Onboarding.tsx

│   │   │   ├── StudentDashboard.tsx    # dùng KnowledgeGraph + ProgressBar

│   │   │   └── PracticeSession.tsx     # dùng QuestionCard + AnswerInput

│   │   └── teacher/

│   │       └── TeacherDashboard.tsx    # dùng KnowledgeGraph + MasteryChart (khác data)

│   │

│   ├── hooks/                          # logic tái dùng, tách khỏi UI

│   │   ├── useStudentState.ts          # gọi API lấy mastery, cache lại

│   │   ├── useKnowledgeGraph.ts

│   │   └── useSubmitAnswer.ts

│   │

│   ├── api/                            # TẤT CẢ gọi HTTP nằm đây, không rải rác trong component

│   │   ├── client.ts                   # axios instance, base URL, interceptor

│   │   ├── studentApi.ts

│   │   ├── questionApi.ts

│   │   └── agentApi.ts

│   │

│   ├── types/                          # TypeScript type, khớp 1-1 với Pydantic schema BE

│   │   ├── student.ts

│   │   ├── skill.ts

│   │   └── question.ts

│   │

│   ├── store/                          # state toàn cục (Zustand/Redux) nếu cần

│   │   └── studentStore.ts

│   │

│   └── utils/

│       └── formatters.ts

│

├── package.json

└── tsconfig.json



Nguyên tắc tách FE: components/ không bao giờ tự gọi API — chỉ nhận props. Việc gọi API nằm ở hooks/, page ghép hook + component lại. Nhờ vậy KnowledgeGraph component dùng được cả ở student view (data của 1 người) lẫn teacher view (data cả lớp) mà không cần sửa code.



BACKEND

api/                                     # Đây là app FastAPI

├── main.py                              # khởi tạo app, include routers

├── config.py                            # đọc biến môi trường (.env)

├── dependencies.py                      # DI: get\_db(), get\_current\_user()...

│

├── routers/                             # CHỈ định nghĩa endpoint + validate input

│   ├── students.py                      # /students/{id}, /students/{id}/state

│   ├── questions.py                     # /questions/next, /questions/submit

│   ├── agent.py                         # /agent/recommend

│   └── teacher.py                       # /teacher/class-overview

│

├── services/                            # LOGIC NGHIỆP VỤ — nơi router thật sự gọi tới

│   ├── student\_service.py               # điều phối: gọi BKT + graph + cache

│   ├── recommendation\_service.py        # logic chọn skill/câu hỏi tiếp theo

│   └── agent\_service.py                 # gọi orchestrator bên core/agent

│

├── models/                              # Pydantic schema (request/response)

│   ├── student.py

│   ├── skill.py

│   └── question.py

│

└── db/                                  # ORM models + kết nối DB

&#x20;   ├── database.py                      # engine, session

&#x20;   ├── models.py                        # SQLAlchemy models (Student, Response, Skill...)

&#x20;   └── repository/                      # tầng truy vấn DB, tách khỏi service

&#x20;       ├── student\_repo.py

&#x20;       └── question\_repo.py

core/                                    # LOGIC AI THUẦN — không phụ thuộc FastAPI, test độc lập được

├── knowledge\_tracing/

│   ├── bkt.py                           # class BKTModel: update(), predict()

│   ├── dkt.py                           # PyTorch model + train/inference

│   └── evaluator.py                     # tính AUC, RMSE so sánh BKT vs DKT

│

├── knowledge\_graph/

│   ├── graph\_builder.py                 # load/build graph từ JSON

│   └── graph\_query.py                   # tìm skill "sẵn sàng học tiếp"

│

├── rag/

│   ├── ingest.py                        # chunk + embed tài liệu → Qdrant

│   ├── retrieve.py                      # semantic search

│   └── rerank.py                        # rerank kết quả retrieve

│

└── agent/

&#x20;   ├── orchestrator.py                  # state machine / ReAct loop

&#x20;   ├── tools.py                         # các hàm tool, IMPORT từ rag + knowledge\_tracing

&#x20;   └── prompts.py                       # tách riêng prompt templates, dễ chỉnh sửa



Nguyên tắc tách BE:

routers → gọi services → gọi core (logic AI) hoặc db/repository (truy vấn data). Router không bao giờ import trực tiếp từ core/ hay db/models.py — luôn qua services. Điều này giúp bạn test core/ hoàn toàn độc lập (viết unit test cho BKT mà không cần chạy cả server).



DATA

data/

├── subjects/                            # tổ chức theo môn, dễ mở rộng

│   ├── math\_grade8/

│   │   ├── knowledge\_graph.json

│   │   └── question\_bank.csv

│   └── physics\_grade8/

│       ├── knowledge\_graph.json

│       └── question\_bank.csv

└── raw\_docs/                            # tài liệu gốc để ingest vào RAG

&#x20;   └── math\_grade8/

&#x20;       └── sgk\_toan8.pdf

INFRA / TESTS / DOCS

biblio/

├── docker-compose.yml                   # postgres, redis, qdrant, api, frontend

├── monitoring/

│   ├── prometheus.yml

│   └── grafana/dashboards/

├── tests/

│   ├── unit/                            # test core/ (BKT, graph, rag) - không cần DB

│   │   ├── test\_bkt.py

│   │   └── test\_graph\_query.py

│   ├── integration/                     # test API endpoint - cần DB test

│   │   └── test\_student\_flow.py

│   └── e2e/                             # test toàn luồng học sinh làm bài → nhận đề xuất

├── .env.example

└── README.md

Sơ đồ luồng dữ liệu tổng thể (để hình dung sự liên kết)

\[React component] 

&#x20;  → gọi hook (useSubmitAnswer)

&#x20;  → gọi api/questionApi.ts

&#x20;  → HTTP POST /questions/submit

&#x20;  → routers/questions.py (validate input)

&#x20;  → services/student\_service.py (điều phối)

&#x20;      → core/knowledge\_tracing/bkt.py (cập nhật mastery)

&#x20;      → db/repository/student\_repo.py (lưu vào Postgres)

&#x20;      → Redis (cache mastery mới)

&#x20;  → services/recommendation\_service.py

&#x20;      → core/knowledge\_graph/graph\_query.py (tìm skill tiếp theo)

&#x20;      → core/rag/retrieve.py (lấy nội dung liên quan)

&#x20;  → trả JSON response

&#x20;  → React nhận, cập nhật KnowledgeGraph component (đổi màu node)

Vì sao cấu trúc này "tối ưu" đúng nghĩa

Tách rõ 3 lớp ở cả FE và BE: UI/logic gọi API/business logic — giúp sửa 1 chỗ không vỡ chỗ khác

core/ độc lập hoàn toàn với web framework — có thể tái sử dụng core/ này cho 1 dự án khác (VD: mobile app) mà không sửa gì

components/ FE tái dùng được ở nhiều màn hình — đúng yêu cầu bạn hỏi

Test được từng lớp riêng biệt — unit test cho core/, integration test cho services/, không cần dựng cả hệ thống để test 1 hàm tính AUC

