from requests import request
from fastapi import APIRouter, HTTPException, Depends, Request
import firebase_admin
from firebase_admin import auth,credentials
from backend.app.database import get_db
from backend.app.schemas import User
import sqlite3
router = APIRouter()

cred = credentials.Certificate("backend/key.json")  # JSONファイルのパス
firebase_admin.initialize_app(cred)

@router.post("/register_user/")
async def register_user(user: User, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    # uid の重複チェック
    cursor.execute("SELECT uid FROM users WHERE uid = ?", (user.uid,))
    existing_user = cursor.fetchone()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    try:
        cursor.execute("INSERT INTO users (uid, email, provider) VALUES (?, ?, ?)", (user.uid, user.email, user.provider))
        db.commit()
        return {"message": "User registered successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Database error")
@router.get("/users/{uid}")
async def get_user_data(uid: str, request: Request, db: sqlite3.Connection = Depends(get_db)):
    try:
        token = request.headers.get('Authorization').split('Bearer ')[1]
        decoded_token = auth.verify_id_token(token)
        if decoded_token['uid'] != uid:
            raise HTTPException(status_code=403, detail="Forbidden")
        cursor = db.cursor()
        cursor.execute("SELECT uid, email, provider FROM users WHERE uid = ?", (uid,))
        user = cursor.fetchone()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return {"uid": uid, "email": user[1], "provider": user[2]}
    except Exception as e:
        print(f"Token verification error: {e}")
        raise HTTPException(status_code=401, detail="Unauthorized")
@router.post("/login_user/")
async def login_user(user: User,request:Request, db: sqlite3.Connection = Depends(get_db)):
    try:
        token = request.headers.get('Authorization').split('Bearer ')[1]
        decoded_token = auth.verify_id_token(token)
        if decoded_token['uid'] != user.uid:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        cursor = db.cursor()
        cursor.execute("SELECT uid FROM users WHERE uid = ?", (user.uid,))
        existing_user = cursor.fetchone()
        custom_token = auth.create_custom_token(user.uid)
        if existing_user is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return {"message": "Login successful", "access_token": custom_token.decode()} #トークンを返すように修正
    except Exception as e:
        print(f"Token verification error: {e}")
        raise HTTPException(status_code=401, detail="Unauthorized")