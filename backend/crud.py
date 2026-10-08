from sqlalchemy.orm import Session
from models import Task
from schemas import TaskCreate, TaskUpdate

def create_task(db: Session, task: TaskCreate):
    """
    Create a new task in the database.

    Args:
        db (Session): The database session.
        task (TaskCreate): The task data to create.

    Returns:
        Task: The created task.
    """
    db_task = Task(
        title=task.title,
        subject=task.subject,
        due_date=task.due_date,
        completed=False
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task
def get_task(db: Session, status: str | None = None, search: str | None = None):
    """Return tasks with optional status and title/subject filters."""
    query = db.query(Task)
    if status == "completed":
        query = query.filter(Task.completed.is_(True))
    elif status == "pending":
        query = query.filter(Task.completed.is_(False))
    if search:
        pattern = f"%{search.strip()}%"
        query = query.filter((Task.title.ilike(pattern)) | (Task.subject.ilike(pattern)))
    return query.order_by(Task.completed.asc(), Task.due_date.asc(), Task.id.asc()).all()

def get_task_by_id(db: Session, task_id: int):
    """
    Retrieve a task by its ID from the database.

    Args:
        db (Session): The database session.
        task_id (int): The ID of the task to retrieve.
    Returns:
        Task: The task with the specified ID, or None if not found.
    """
    return db.query(Task).filter(Task.id == task_id).first()


def update_task(db: Session, task_id: int, task: TaskUpdate):
    """
    Update an existing task in the database.

    Args:
        db (Session): The database session.
        task_id (int): The ID of the task to update.
        task (TaskUpdate): The updated task data.

    Returns:
        Task: The updated task, or None if not found.
    """
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        return None
    db_task.title = task.title
    db_task.subject = task.subject
    db_task.due_date = task.due_date
    db_task.completed = task.completed
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    """
    Delete a task from the database.

    Args:
        db (Session): The database session.
        task_id (int): The ID of the task to delete.

    Returns:
        Task: The deleted task, or None if not found.
    """
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        return None
    db.delete(db_task)
    db.commit()
    return db_task


