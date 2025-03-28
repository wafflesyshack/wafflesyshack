#reutersの中にあるファイルはそれぞれの機能ごとに、エンドポイントの実装をするためのファイル。下のコードは例。
from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import Star,Stars
from backend.app.database import get_db
from datetime import date
import sqlite3
import random


router = APIRouter()

@router.post("/star_post/{achievement_id}", response_model=Star)
async def add_star(
    achievement_id:int,    
    star_type:int= Form(...),
    star_position_x:int = Form(...),
    star_position_y:int = Form(...),
    star_color:str = Form(...), 
    star_light:int = Form(...),
    db: sqlite3.Connection = Depends(get_db),
):
    if not 1 <= star_type <= 3:  # star_typeが1, 2, 3のいずれかであることを確認
        raise HTTPException(status_code=400, detail="star_type must be 1, 2, or 3")
    elif not star_position_x:
        raise HTTPException(status_code=400, detail="star_position_x is required")
    elif not star_position_y:
        raise HTTPException(status_code=400, detail="star_position_y is required")
    elif not star_color:
        raise HTTPException(status_code=400, detail="star_color is required")
    elif not star_light:
        raise HTTPException(status_code=400, detail="star_light is required")

    cursor = db.cursor()

    query = """INSERT INTO stars_table (achievement_id,star_type,star_position_x,star_position_y,star_color,star_light) VALUES (?,?,?,?,?,?)""" #?はセキュリティのため　または{table.name}...

    cursor.execute(query, (achievement_id,star_type,star_position_x,star_position_y,star_color,star_light))
    
    db.commit()

    cursor.close()

    return {
        "achievement_id": achievement_id,
        "star_type": star_type,
        "star_position_x": star_position_x,
        "star_position_y": star_position_y,
        "star_color": star_color,
        "star_light": star_light
        }

@router.get("/stars", response_model=Stars)
def get_all_stars(achievement_id: int , db : sqlite3.Connection = Depends(get_db) ):
    cursor = db.cursor()
    
    query = """
            SELECT star_type,star_position_x,star_position_y,star_color,star_light
            FROM stars_table
            WHERE stars_table.achievement_id = ?
            """
    
    cursor.execute(query, (achievement_id,))

    rows = cursor.fetchall()

    stars_list = [{"star_type":star_type,"star_position_x":star_position_x,"star_position_y":star_position_y,"star_color":star_color,"star_light":star_light} for star_type,star_position_x,star_position_y,star_color,star_light in rows]
    result = {"stars" : stars_list}

    cursor.close()
    
    return result  


@router.get("/star-data/{achievement_id}")
async def get_star_data(achievement_id: int, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()

    # 達成率を計算する（ここでは仮の値を設定）
    achievement_rate = random.randint(0, 100)

    # 星の種類をランダムに決定
    star_type = random.randint(1, 3)

    # 星の明るさを達成率に基づいて決定
    if achievement_rate == 100:
        star_light = "一等星"
    elif achievement_rate >= 50:
        star_light = "二等星"
    else:
        star_light = "三等星"

    cursor.close()

    return {
        "achievementRate": achievement_rate,
        "starType": star_type,
        "starLight": star_light,
    }