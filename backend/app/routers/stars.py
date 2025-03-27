#reutersの中にあるファイルはそれぞれの機能ごとに、エンドポイントの実装をするためのファイル。下のコードは例。
from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import Star,Stars
from backend.app.database import get_db
from datetime import date
import sqlite3


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
    if not star_type:
        raise HTTPException(status_code=400, detail="star_type is required")
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