from pydantic import BaseModel
from datetime import date
from typing import Optional,List

class User(BaseModel):
    uid: str
    email: str
    provider: str

class Login(BaseModel):
    username:str
    password:str
    email:Optional[str] = None

class TopicCreate(BaseModel):
    topic_id: Optional[int] = None  # topic_id を追加
    uid: str
    topic_name: str
    start_date: date
    end_date: date

class Goal(BaseModel):
    goal_id: int
    uid: str
    goal_name: str
    topic_id: int
    goal_quantity: Optional[int] = None # goal_quantity を必須にする場合は Optional[int] を削除
    goal_detail: str
    start_date: date
    end_date: date
    goal_unit: str # goal_unit を追加


class Goals(BaseModel):
   goals: List[Goal]  # Goal モデルのリストであることを明示的に指定

class Achievement(BaseModel):
    achievement_id: int
    goal_id: int
    achievement_date: date
    achievement_quantity: int
    achievement_detail: str

class Achievements(BaseModel):
    achievements: List[Achievement]
    
class Star(BaseModel):
    achievement_id:int    
    star_type:int
    star_position_x:int
    star_position_y:int
    star_color:str
    star_light:int

class Stars(BaseModel):
    stars: list   