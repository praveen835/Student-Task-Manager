# Student Task Manager

A focused full-stack task manager for organizing student work by subject and due date.

## Features

- Create tasks with a title, subject, and due date
- Mark tasks complete or reopen them
- Search and filter by status
- Persistent SQLite storage through a FastAPI API
- Responsive React interface with loading, validation, and error states

## Project layout

- `backend/` — FastAPI routes, SQLAlchemy models, and SQLite persistence
- `frontend/` — React + Vite application

## Run locally

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

In another terminal:

```bash
cd frontend
npm ci
npm run dev
```

The frontend uses `http://127.0.0.1:8000` by default. Set `VITE_API_URL` in `frontend/.env.local` when the API runs elsewhere. Backend `DATABASE_URL` and `ALLOWED_ORIGINS` can be configured through environment variables.

## Quality checks

```bash
cd frontend
npm run lint
npm run build
```

The API exposes interactive documentation at `/docs` and a monitoring-friendly `/health` endpoint.
