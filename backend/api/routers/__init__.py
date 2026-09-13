from api.routers.students import router as students_router
from api.routers.questions import router as questions_router
from api.routers.agent import router as agent_router
from api.routers.teacher import router as teacher_router

__all__ = ["students_router", "questions_router", "agent_router", "teacher_router"]
