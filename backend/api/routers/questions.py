from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from api.dependencies import get_db
from api.services.student_service import StudentService
from api.models.question import SubmitAnswerRequest, SubmitAnswerResponse, QuestionDetail
from api.db.repository.question_repo import QuestionRepository

router = APIRouter(prefix="/questions", tags=["questions"])


@router.get("/{question_id}", response_model=QuestionDetail)
async def get_question(question_id: str):
    repo = QuestionRepository()
    q = repo.get_by_id(question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    return QuestionDetail(
        id=q["id"],
        skill_id=q["skill_id"],
        question_text=q["question_text"],
        option_a=str(q["option_a"]),
        option_b=str(q["option_b"]),
        option_c=str(q["option_c"]),
        option_d=str(q["option_d"]),
        difficulty=int(q["difficulty"]),
    )


@router.post("/submit", response_model=SubmitAnswerResponse)
async def submit_answer(payload: SubmitAnswerRequest, db: AsyncSession = Depends(get_db)):
    service = StudentService(db)
    try:
        res = await service.process_answer(
            student_id=payload.student_id,
            question_id=payload.question_id,
            selected_option=payload.selected_option,
            response_time_sec=payload.response_time_sec,
        )
        return SubmitAnswerResponse(
            is_correct=res["is_correct"],
            correct_answer=res["correct_answer"],
            explanation=res["explanation"],
            skill_id=res["skill_id"],
            new_mastery=res["new_mastery"],
            status_changed=res["status_changed"],
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
