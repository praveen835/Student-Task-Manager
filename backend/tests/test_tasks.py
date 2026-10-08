import sys
from datetime import date
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.insert(0, str(Path(__file__).parents[1]))

from crud import create_task, get_task  # noqa: E402
from database import Base  # noqa: E402
from schemas import TaskCreate  # noqa: E402


def make_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine)()


def test_task_payload_trims_text():
    task = TaskCreate(title="  Read chapter  ", subject=" History ", due_date=date(2026, 10, 10))
    assert task.title == "Read chapter"
    assert task.subject == "History"


def test_task_payload_rejects_blank_title():
    try:
        TaskCreate(title="   ", subject="History", due_date=date(2026, 10, 10))
    except ValueError as error:
        assert "non-whitespace" in str(error)
    else:
        raise AssertionError("blank title should be rejected")


def test_task_queries_filter_and_order_by_status_and_due_date():
    db = make_session()
    create_task(db, TaskCreate(title="Later", subject="Math", due_date=date(2026, 10, 20)))
    create_task(db, TaskCreate(title="Soon", subject="Math", due_date=date(2026, 10, 5)))

    pending = get_task(db, status="pending", search="math")
    assert [task.title for task in pending] == ["Soon", "Later"]
