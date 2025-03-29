from pydantic import BaseModel
from datetime import date
from typing import Optional

class User(BaseModel):
    uid: str
    email: str
    provider: str

class Login(BaseModel):
    username:str
    password:str
    email:Optional[str] = None

class Goals(BaseModel):
    goals: list   # これは「goals というキーを持つ辞書」を定義している

class Goal(BaseModel):
    uid: str  # user_id を uid に変更
    goal_id:int
    goal_name: str
    goal_quantity: Optional[int] = None
    goal_detail: str
    start_date: date
    end_date: date

class Achievement(BaseModel):
    goal_id:int
    achievement_detail:Optional[str] = None
    achievement_date: date
    achievement_quantity:int
    
class Star(BaseModel):
    achievement_id:int    
    star_type:int
    star_position_x:int
    star_position_y:int
    star_color:str
    star_light:int

class Stars(BaseModel):
    stars: list  