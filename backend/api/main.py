from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.config import settings
from api.routers import students_router, questions_router, agent_router, teacher_router
from api.db.database import engine, Base

app = FastAPI(
    title="Biblio API",
    description="Adaptive Learning & Knowledge Tracing Backend Engine",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    # Auto-create tables for local development/sqlite/test
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/health", tags=["system"])
async def health_check():
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
        "debug": settings.DEBUG,
    }


# Register routers
app.include_router(students_router)
app.include_router(questions_router)
app.include_router(agent_router)
app.include_router(teacher_router)
