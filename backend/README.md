# Backend

The API is built with FastAPI and SQLAlchemy and stores tasks in a local SQLite database.

## Local setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API is available at `http://127.0.0.1:8000`; interactive documentation is at `/docs`.
