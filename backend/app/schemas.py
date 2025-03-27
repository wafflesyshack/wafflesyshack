from pydantic import BaseModel
from datetime import date
from typing import Optional

class Register(BaseModel):
    username:str
    password:str
    email:str

class Login(BaseModel):
    username:str
    password:str
    email:Optional[str] = None

class Goals(BaseModel):
    goals: list

class Goal(BaseModel):
    goal_name: str
    goal_quantity: int
    goal_detail: str
    start_date: date
    end_date: date

class Achievement(BaseModel):
    achievement_date: date
    achievement_quantity:int
    
class Star(BaseModel):    
    star_type:int
    star_position_x:int
    star_position_y:int
    star_color:str
    star_light:str