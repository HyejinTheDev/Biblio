from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from api.dependencies import get_db
from api.services.student_service import StudentService
from api.models.question import SubmitAnswerRequest, SubmitAnswerResponse, QuestionDetail
from api.db.repository.question_repo import QuestionRepository

router = APIRouter(prefix="/questions", tags=["questions"])


@router.get("/by-stage", response_model=List[QuestionDetail])
async def get_questions_by_stage(
    stage_id: str = Query(..., description="Stage ID, e.g. STAGE_1_1"),
    difficulty_tier: Optional[str] = Query("normal", description="normal, hard, or hell")
):
    repo = QuestionRepository()
    records = repo.get_by_stage(stage_id, difficulty_tier)
    if not records:
        # Fallback to any questions in this stage
        records = repo.get_by_stage(stage_id)
    if not records:
        raise HTTPException(status_code=404, detail=f"No questions found for stage {stage_id}")

    output = []
    for q in records:
        s_id = q.get("stage_id") or q.get("skill_id", "")
        output.append(QuestionDetail(
            id=str(q["id"]),
            stage_id=str(s_id),
            difficulty_tier=str(q.get("difficulty_tier", "normal")),
            question_title=str(q.get("question_title", "")),
            question_text=str(q["question_text"]),
            option_a=str(q["option_a"]),
            option_b=str(q["option_b"]),
            option_c=str(q["option_c"]),
            option_d=str(q["option_d"]),
            exp_reward=int(q.get("exp_reward", 50)),
            skill_id=str(s_id),
            difficulty=1 if q.get("difficulty_tier") == "normal" else 2 if q.get("difficulty_tier") == "hard" else 3
        ))
    return output


@router.get("/{question_id}", response_model=QuestionDetail)
async def get_question(question_id: str):
    repo = QuestionRepository()
    q = repo.get_by_id(question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    s_id = q.get("stage_id") or q.get("skill_id", "")
    return QuestionDetail(
        id=str(q["id"]),
        stage_id=str(s_id),
        difficulty_tier=str(q.get("difficulty_tier", "normal")),
        question_title=str(q.get("question_title", "")),
        question_text=str(q["question_text"]),
        option_a=str(q["option_a"]),
        option_b=str(q["option_b"]),
        option_c=str(q["option_c"]),
        option_d=str(q["option_d"]),
        exp_reward=int(q.get("exp_reward", 50)),
        skill_id=str(s_id),
        difficulty=1 if q.get("difficulty_tier") == "normal" else 2 if q.get("difficulty_tier") == "hard" else 3
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
            difficulty_tier=payload.difficulty_tier or "normal"
        )
        return SubmitAnswerResponse(
            is_correct=res["is_correct"],
            correct_answer=res["correct_answer"],
            explanation=res["explanation"],
            stage_id=res["stage_id"],
            skill_id=res["skill_id"],
            new_mastery=res["new_mastery"],
            status_changed=res["status_changed"],
            exp_gained=res["exp_gained"],
            stars_earned=res["stars_earned"],
            recommended_message=res["recommended_message"]
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
