from datetime import date
from fastapi import APIRouter, Body, Form, Depends, HTTPException
from backend.app.schemas import TopicCreate  # schema.py で定義したモデルをインポート
from backend.app.database import get_db
import sqlite3

router = APIRouter()

@router.post("/topics/", response_model=TopicCreate)
async def create_topic(
    uid: str = Body(...),  # Body から uid を受け取る
    topic_name: str = Body(...),  # Body から topic_name を受け取る
    start_date: date = Body(...),  # Body から start_date を受け取る
    end_date: date = Body(...),  # Body から end_date を受け取る
    db: sqlite3.Connection = Depends(get_db),
):
    try:
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
            "topic_id": cursor.lastrowid,  # topic_id を含める
            "uid": uid,
            "topic_name": topic_name,
            "start_date": start_date,
            "end_date": end_date,
        }
    except Exception as e:
        # エラーメッセージをログに出力
        print(f"Error creating topic: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
@router.get("/topics/", response_model=list[TopicCreate])
async def get_topics(uid: str, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()

    query = """SELECT * FROM topics_table WHERE uid = ?"""

    cursor.execute(query, (uid,))

    topics = cursor.fetchall()

    cursor.close()

    # sqlite3.Row オブジェクトを辞書に変換
    result = []
    for topic in topics:
        result.append({
            "topic_id": topic["topic_id"],  # topic_id を含める
            "uid": topic["uid"],
            "topic_name": topic["topic_name"],
            "start_date": topic["start_date"],
            "end_date": topic["end_date"],
        })

    return result

@router.get("/topics/{topicId}", response_model=TopicCreate)
async def get_topic(topicId: int, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()

    query = """SELECT * FROM topics_table WHERE topic_id = ?"""

    cursor.execute(query, (topicId,))

    topic = cursor.fetchone()

    cursor.close()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    # sqlite3.Row オブジェクトを辞書に変換
    result = {
        "topic_id": topic["topic_id"],
        "uid": topic["uid"],
        "topic_name": topic["topic_name"],
        "start_date": topic["start_date"],
        "end_date": topic["end_date"],
    }

    return result