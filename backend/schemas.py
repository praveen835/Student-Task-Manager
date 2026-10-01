from pydantic import BaseModel
from datetime import date

class TaskCreate(BaseModel):
    title: str
    subject: str
    due_date: date

class TaskUpdate(BaseModel):
    title: str
    subject: str
    due_date: date
    completed: bool

class TaskResponse(BaseModel):
    id: int
    title:str
    subject:str
    due_date: date
    completed: bool

    class Config:
        from_attributes = True



