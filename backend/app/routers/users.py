#reutersの中にあるファイルはそれぞれの機能ごとに、エンドポイントの実装をするためのファイル。下のコードは例。
from fastapi import APIRouter,FastAPI, HTTPException, Depends
from pydantic import BaseModel
import sqlite3
from typing import List
import jwt
from datetime import datetime, timedelta
from backend.app.database import get_db
from backend.app.schemas import User

router = APIRouter()

app = FastAPI()

# JWTシークレットキーとアルゴリズム
SECRET_KEY = "wafflesyshack"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# トークン生成
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ユーザー登録エンドポイント
@router.post("/register_user/")
async def register_user(user: User, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO users (uid, email, provider) VALUES (?, ?, ?)", (user.uid, user.email, user.provider))
        db.commit()
        access_token = create_access_token({"uid": user.uid})
        expires_at = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        cursor.execute("INSERT INTO tokens (uid, token, expires_at) VALUES (?, ?, ?)", (user.uid, access_token, expires_at))
        db.commit()
        return {"access_token": access_token, "token_type": "bearer"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="User already exists")

#ユーザー認証　tokenが必要
@router.get("/users/me/")
async def read_users_me(token: str, db: sqlite3.Connection = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        uid = payload.get("uid")
        if uid is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        cursor = db.cursor()
        cursor.execute("SELECT uid, email, provider FROM users WHERE uid = ?", (uid,)) # uid を取得
        user = cursor.fetchone()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return {"uid": uid, "email": user[1], "provider": user[2]} # uid を返す
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.exceptions.PyJWTError: #jwt.JWTErrorを修正
        raise HTTPException(status_code=401, detail="Invalid token")
    

@router.post("/login_user/")
async def login_user(user: User, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT uid FROM users WHERE uid = ? AND email = ?", (user.uid, user.email))
    existing_user = cursor.fetchone()
    if existing_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"uid": user.uid})
    expires_at = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES) # 修正箇所
    cursor.execute("DELETE FROM tokens WHERE uid = ?", (user.uid,)) # 既存のトークンを削除
    cursor.execute("INSERT INTO tokens (uid, token, expires_at) VALUES (?, ?, ?)", (user.uid, access_token, expires_at))
    db.commit()
    return {"access_token": access_token, "token_type": "bearer"}





#@router.post("/items", response_model=AddItemResponse)
#async def add_item(name: str = Form(...), category: str = Form(...), 
#                   image: UploadFile = File(...), db: sqlite3.Connection = Depends(get_db)):
#    
#    if not name:
#        raise HTTPException(status_code=400, detail="name is required")
#
#    image_name = await hash_and_rename_image(image)
#    add_item_to_db(db, name, category, image_name)
#
#    return {"message": f"Item added: {name}, {category}, {image_name}"}




#下はあおか用のメモ

#目標一覧の取得

#カレンダー情報の取得

#星空情報の取得

#目標詳細画面への遷移