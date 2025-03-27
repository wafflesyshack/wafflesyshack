#reutersの中にあるファイルはそれぞれの機能ごとに、エンドポイントの実装をするためのファイル。下のコードは例。
from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import Goals,Goal
from backend.app.database import get_db
from datetime import date
import sqlite3


router = APIRouter()

@router.post("/goal_post", response_model=Goal)
async def add_achievement(
    user_id:int,
    goal_name:str = Form(...),
    goal_quantity: int= Form(...),
    goal_detail:str= Form(...),
    start_date: date= Form(...),
    end_date: date= Form(...),
    db: sqlite3.Connection = Depends(get_db),
):
    if not goal_name:
        raise HTTPException(status_code=400, detail="goal_name is required")
    elif not goal_detail:
        raise HTTPException(status_code=400, detail="goal_detail is required")
    elif not start_date:
        raise HTTPException(status_code=400, detail="strat_date is required")
    elif not end_date:
        raise HTTPException(status_code=400, detail="end_date is required")

    cursor = db.cursor()

    query = """INSERT INTO goals_table (user_id,goal_name,goal_quantity,goal_detail,start_date,end_date) VALUES (?,?,?,?,?,?)""" #?はセキュリティのため　または{table.name}...

    cursor.execute(query, (user_id,goal_name,goal_quantity,goal_detail,start_date,end_date))
    db.commit()

    cursor.close()

    return {
        "user_id": user_id,
        "goal_name": goal_name,
        "goal_quantity": goal_quantity,
        "goal_detail": goal_detail,
        "start_date": start_date,
        "end_date": end_date
        }

@router.get("/goals", response_model=Goals)
def get_all_goals(user_id: int , db : sqlite3.Connection = Depends(get_db) ):
    cursor = db.cursor()
    
    query = """
            SELECT goals_table.goal_name AS goals
            FROM goals_table
            WHERE goals_table.user_id = ?
            """
    
    cursor.execute(query, (user_id,))

    rows = cursor.fetchall()
    goals_list= [ row[0] for row in rows]
    
    result = goals_list

    cursor.close()
    
    return {"goals": goals_list} 

@router.get("/goals/{goal_id}", response_model=Goal)
def get_single_item(goal_id: int , db : sqlite3.Connection = Depends(get_db) ):
    cursor = db.cursor()
    
    query = """
            SELECT goal_name, goal_quantity, goal_detail, start_date, end_date
            FROM goals_table
            WHERE goals_table.goal_id = ?
            """
    
    cursor.execute(query, (goal_id,))

    row = cursor.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal_list = {
        "goal_name": row[0],
        "goal_quantity": row[1],
        "goal_detail": row[2],
        "start_date": row[3],
        "end_date": row[4]
    }
    
    result = goal_list

    cursor.close()
    
    return result  
