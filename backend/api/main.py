import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

# Mount frontend static files if built (for Hugging Face Spaces & Production)
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "frontend", "dist")
if not os.path.exists(frontend_dist):
    frontend_dist = "/app/frontend/dist"

if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        file_path = os.path.join(frontend_dist, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
