from fastapi import APIRouter, HTTPException, Depends, Request
from firebase_admin import auth
from backend.app.database import get_db
from backend.app.schemas import User
import sqlite3

router = APIRouter()

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
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/login_user/")
async def login_user(user: User, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT uid FROM users WHERE uid = ? AND email = ?", (user.uid, user.email))
    existing_user = cursor.fetchone()
    if existing_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}





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