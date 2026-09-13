from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from api.db.database import async_session_factory


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency injection to provide database session."""
    async with async_session_factory() as session:
        try:
            yield session
        finally:
            await session.close()
