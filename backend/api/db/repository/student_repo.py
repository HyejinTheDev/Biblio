from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional, Dict
from api.db.models import Student, StudentSkillMastery, StudentResponse


class StudentRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_student(self, student_id: str) -> Optional[Student]:
        query = select(Student).where(Student.id == student_id)
        result = await self.session.execute(query)
        return result.scalars().first()

    async def get_or_create_student(self, student_id: str, name: str) -> Student:
        student = await self.get_student(student_id)
        if not student:
            student = Student(id=student_id, name=name)
            self.session.add(student)
            await self.session.commit()
            await self.session.refresh(student)
        return student

    async def get_all_skill_masteries(self, student_id: str) -> Dict[str, float]:
        query = select(StudentSkillMastery).where(StudentSkillMastery.student_id == student_id)
        result = await self.session.execute(query)
        records = result.scalars().all()
        return {r.skill_id: r.mastery_prob for r in records}

    async def update_skill_mastery(self, student_id: str, skill_id: str, mastery_prob: float) -> None:
        query = select(StudentSkillMastery).where(
            StudentSkillMastery.student_id == student_id,
            StudentSkillMastery.skill_id == skill_id
        )
        result = await self.session.execute(query)
        record = result.scalars().first()
        if record:
            record.mastery_prob = mastery_prob
        else:
            record = StudentSkillMastery(student_id=student_id, skill_id=skill_id, mastery_prob=mastery_prob)
            self.session.add(record)
        await self.session.commit()

    async def record_response(self, student_id: str, question_id: str, skill_id: str,
                              selected_option: str, is_correct: bool, response_time_sec: float = 0.0) -> StudentResponse:
        resp = StudentResponse(
            student_id=student_id,
            question_id=question_id,
            skill_id=skill_id,
            selected_option=selected_option,
            is_correct=is_correct,
            response_time_sec=response_time_sec,
        )
        self.session.add(resp)
        await self.session.commit()
        await self.session.refresh(resp)
        return resp
