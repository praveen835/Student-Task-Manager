from sqlalchemy import Boolean, Column, Date, Integer, String

from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    due_date = Column(Date, nullable=False, index=True)
    completed = Column(Boolean, default=False, nullable=False, index=True)
