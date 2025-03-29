from datetime import date
from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import TopicCreate  # schema.py で定義したモデルをインポート
from backend.app.database import get_db
import sqlite3

router = APIRouter()

@router.post("/topics/", response_model=TopicCreate)
async def create_topic(
    uid: str,
    topic_name: str = Form(...),
    start_date: date = Form(...),
    end_date: date = Form(...),
    db: sqlite3.Connection = Depends(get_db),
):
    if not uid:
        raise HTTPException(status_code=400, detail="uid is required")
    elif not topic_name:
        raise HTTPException(status_code=400, detail="topic_name is required")
    elif not start_date:
        raise HTTPException(status_code=400, detail="start_date is required")
    elif not end_date:
        raise HTTPException(status_code=400, detail="end_date is required")

    cursor = db.cursor()

    query = """INSERT INTO topics_table (uid, topic_name, start_date, end_date) VALUES (?, ?, ?, ?)"""

    cursor.execute(query, (uid, topic_name, start_date, end_date))

    db.commit()

    cursor.close()

    return {
        "uid": uid,
        "topic_name": topic_name,
        "start_date": start_date,
        "end_date": end_date,
    }