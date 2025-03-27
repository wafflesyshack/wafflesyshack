#reutersの中にあるファイルはそれぞれの機能ごとに、エンドポイントの実装をするためのファイル。下のコードは例。
from fastapi import APIRouter, Form, Depends, HTTPException
from backend.app.schemas import Goals,Goal
from backend.app.database import get_db
from datetime import date
import sqlite3


router = APIRouter()

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
    goals_list= [ row[2] for row in rows]
    
    result = goals_list

    db.commit()

    cursor.close()
    
    return result  

@router.get("/goals/{goal_id}", response_model=Goal)
def get_single_item(goal_id: int , db : sqlite3.Connection = Depends(get_db) ):
    cursor = db.cursor()
    
    query = """
            SELECT goal_name, goal_quantity, goal_detail, start_date, end_date
            FROM goals_table
            WHERE goals_table.goal_id = ?
            """
    
    cursor.execute(query, (goal_id,))

    rows = cursor.fetchone()
    goal_list = [rows]
    
    result = goal_list

    db.commit()

    cursor.close()
    
    return result  
