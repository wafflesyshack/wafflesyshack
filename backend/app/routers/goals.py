from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import Goals, Goal
from backend.app.database import get_db
from datetime import date
import sqlite3

router = APIRouter()

def convert_row_to_goal(row: sqlite3.Row) -> Goal:
    """sqlite3.Row を Goal モデルに変換する関数"""
    return Goal(
        goal_id=row["goal_id"],
        uid=row["uid"],
        goal_name=row["goal_name"],
        topic_id=row["topic_id"],
        goal_quantity=row["goal_quantity"],
        goal_detail=row["goal_detail"],
        start_date=row["start_date"],
        end_date=row["end_date"],
        goal_unit=row["goal_unit"], # goal_unit を追加
    )


@router.post("/goals/", response_model=Goal)
async def add_goals(
    uid: str = Form(...),
    goal_name: str = Form(...),
    topic_id: int = Form(...),
    goal_quantity: int = Form(...),
    goal_detail: str = Form(...),
    start_date: date = Form(...),
    end_date: date = Form(...),
    goal_unit: str = Form(...), # goal_unit を追加
    db: sqlite3.Connection = Depends(get_db),
):
    """goals_table にデータを追加し、追加した goal の情報を返す関数"""

    if not goal_name:
        raise HTTPException(status_code=400, detail="goal_name is required")
    elif not topic_id:
        raise HTTPException(status_code=400, detail="topic_id is required")
    elif not start_date:
        raise HTTPException(status_code=400, detail="start_date is required")
    elif not end_date:
        raise HTTPException(status_code=400, detail="end_date is required")

    try:
        cursor = db.cursor()

        query = """
            INSERT INTO goals_table (uid, goal_name, topic_id, goal_quantity, goal_detail, start_date, end_date, goal_unit)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """

        cursor.execute(query, (uid, goal_name, topic_id, goal_quantity, goal_detail, start_date, end_date, goal_unit))

        db.commit()

        # 追加した goal の情報を取得
        goal_id = cursor.lastrowid
        query = """SELECT * FROM goals_table WHERE goal_id = ?"""
        cursor.execute(query, (goal_id,))
        goal = cursor.fetchone()

        cursor.close()

        return convert_row_to_goal(goal)

    except Exception as e:
        print(f"Error adding goal: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/goals/", response_model=Goals)
def get_all_goals(uid: str, db: sqlite3.Connection = Depends(get_db)):
    """保存された goal を一覧として出すための関数"""

    if not uid:
        raise HTTPException(status_code=400, detail="uid is required")

    cursor = db.cursor()

    query = """
        SELECT * FROM goals_table WHERE uid = ?
    """

    cursor.execute(query, (uid,))

    rows = cursor.fetchall()

    goals_list = [convert_row_to_goal(row) for row in rows]

    cursor.close()

    return {"goals": goals_list}

@router.get("/goals/{goal_id}", response_model=Goal)
def get_single_item(goal_id: int, db: sqlite3.Connection = Depends(get_db)):
    """指定された goal_id に対応する goal の情報を返す関数"""

    cursor = db.cursor()

    query = """
        SELECT * FROM goals_table WHERE goal_id = ?
    """

    cursor.execute(query, (goal_id,))

    row = cursor.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    cursor.close()

    return convert_row_to_goal(row)

@router.get("/goals/{goal_id}/quantity", response_model=dict)
def get_goal_quantity(goal_id: int, db: sqlite3.Connection = Depends(get_db)):
    """指定された goal_id に対応する goal の目標達成量を返す関数"""

    cursor = db.cursor()

    query = """
        SELECT goal_quantity FROM goals_table WHERE goal_id = ?
    """

    cursor.execute(query, (goal_id,))

    row = cursor.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    cursor.close()

    return {"goal_quantity": row[0]}