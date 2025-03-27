#reutersの中にあるファイルはそれぞれの機能ごとに、エンドポイントの実装をするためのファイル。下のコードは例。
from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import Achievement
from backend.app.database import get_db
from datetime import date
import sqlite3


router = APIRouter()

@router.post("{goal_id}/achievement_post", response_model=Achievement)
async def add_achievement(
    goal_id:int,
    achievement_date: date = Form(...),
    achievement_quantity: int= Form(...),
    achievement_detail: str= Form(...),
    db: sqlite3.Connection = Depends(get_db),
):
    if not achievement_date:
        raise HTTPException(status_code=400, detail="achievement_date is required")
    elif not achievement_quantity:
        raise HTTPException(status_code=400, detail="achievement_quantit is required")

    cursor = db.cursor()

    query = """INSERT INTO achievements_table (goal_id,achievement_date,achievement_quantity,achievement_detail) VALUES (?,?,?,?)""" #?はセキュリティのため　または{table.name}...

    cursor.execute(query, (goal_id,achievement_date,achievement_quantity,achievement_detail))

    db.commit()

    cursor.close()

    return (goal_id,achievement_date,achievement_quantity,achievement_detail)



