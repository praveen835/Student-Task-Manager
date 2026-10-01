from sqlalchemy import Column, Integer, String, Boolean,Date

from database import Base

# Define a Task model that represents a task in the database.

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    due_date = Column(Date, nullable=False)
    completed = Column(Boolean, default=False)