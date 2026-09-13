import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from api.db.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    grade = Column(Integer, default=8)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    masteries = relationship("StudentSkillMastery", back_populates="student")
    responses = relationship("StudentResponse", back_populates="student")


class StudentSkillMastery(Base):
    __tablename__ = "student_skill_masteries"

    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(50), ForeignKey("students.id"), nullable=False, index=True)
    skill_id = Column(String(50), nullable=False, index=True)
    mastery_prob = Column(Float, default=0.1)  # P(L) in BKT
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="masteries")


class StudentResponse(Base):
    __tablename__ = "student_responses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(50), ForeignKey("students.id"), nullable=False, index=True)
    question_id = Column(String(50), nullable=False, index=True)
    skill_id = Column(String(50), nullable=False, index=True)
    selected_option = Column(String(10), nullable=False)
    is_correct = Column(Boolean, nullable=False)
    response_time_sec = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="responses")
