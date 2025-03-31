from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import Achievement, Achievements
from backend.app.database import get_db
from datetime import date
import sqlite3
import logging

router = APIRouter()

# ロギング設定
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

def convert_row_to_achievement(row: sqlite3.Row) -> Achievement:
    """sqlite3.Row を Achievement モデルに変換する関数"""
    return Achievement(
        achievement_id=row["achievement_id"],
        goal_id=row["goal_id"],
        achievement_date=row["achievement_date"],
        achievement_quantity=row["achievement_quantity"],
        achievement_detail=row["achievement_detail"],
    )

@router.post("/achievements/", response_model=Achievement)
async def add_achievement(
    goal_id: int = Form(...),
    achievement_date: str = Form(...),
    achievement_quantity: int = Form(...),
    achievement_detail: str = Form(None),
    db: sqlite3.Connection = Depends(get_db),
):
    """achievements_table にデータを追加し、追加した achievement の情報を返す関数"""

    if not goal_id:
        raise HTTPException(status_code=400, detail="goal_id is required")
    elif not achievement_date:
        raise HTTPException(status_code=400, detail="achievement_date is required")
    elif not achievement_quantity:
        raise HTTPException(status_code=400, detail="achievement_quantity is required")

    try:
        cursor = db.cursor()

        query = """
            INSERT INTO achievements_table (goal_id, achievement_date, achievement_quantity, achievement_detail)
            VALUES (?, ?, ?, ?)
        """
        try:
            date_obj = date.fromisoformat(achievement_date)
        except ValueError as e:
            logger.error(f"Error converting achievement_date: {e}")
            raise HTTPException(status_code=400, detail="Invalid achievement_date format")

        cursor.execute(query, (goal_id, date_obj, achievement_quantity, achievement_detail))

        db.commit()


        # 追加した achievement の情報を取得
        achievement_id = cursor.lastrowid
        query = """SELECT * FROM achievements_table WHERE achievement_id = ?""" # テーブル名を修正
        cursor.execute(query, (achievement_id,))
        achievement = cursor.fetchone()

        cursor.close()

        return convert_row_to_achievement(achievement)

    except Exception as e:
        logger.error(f"Error adding achievement: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/achievements/", response_model=Achievements)
def get_all_achievements(goal_id: int, db: sqlite3.Connection = Depends(get_db)):
    """保存された achievement を一覧として出すための関数"""

    cursor = db.cursor()

    query = """
        SELECT * FROM achievements_table WHERE goal_id = ?
    """

    cursor.execute(query, (goal_id,))

    rows = cursor.fetchall()

    achievements_list = [convert_row_to_achievement(row) for row in rows]

    cursor.close()

    return {"achievements": achievements_list}

@router.get("/achievements/{achievement_id}", response_model=Achievement)
def get_single_achievement(achievement_id: int, db: sqlite3.Connection = Depends(get_db)):
    """指定された achievement_id に対応する achievement の情報を返す関数"""

    cursor = db.cursor()

    query = """
        SELECT * FROM achievements_table WHERE achievement_id = ?
    """

    cursor.execute(query, (achievement_id,))

    row = cursor.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Achievement not found")

    cursor.close()

    return convert_row_to_achievement(row)