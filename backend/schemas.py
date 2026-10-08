from datetime import date

from pydantic import BaseModel, ConfigDict, Field, field_validator


class TaskFields(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    subject: str = Field(min_length=1, max_length=100)
    due_date: date

    @field_validator("title", "subject")
    @classmethod
    def trim_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("must contain at least one non-whitespace character")
        return value


class TaskCreate(TaskFields):
    pass


class TaskUpdate(TaskFields):
    completed: bool


class TaskResponse(TaskFields):
    id: int
    completed: bool

    model_config = ConfigDict(from_attributes=True)
