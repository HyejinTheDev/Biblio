import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    APP_PORT: int = 8000

    # Database (defaults to local SQLite if PostgreSQL is not configured in .env)
    DATABASE_URL: str = "sqlite+aiosqlite:///./biblio.db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Qdrant
    QDRANT_URL: str = "http://localhost:6333"

    # API Keys
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    EMBEDDING_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
