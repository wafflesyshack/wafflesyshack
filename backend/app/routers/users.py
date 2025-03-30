from fastapi import APIRouter, HTTPException, Depends, Request
from firebase_admin import auth
from backend.app.database import get_db
from backend.app.schemas import User
import sqlite3
import logging

router = APIRouter()

# ロギング設定
logger = logging.getLogger(__name__)

@router.post("/register_user/")
async def register_user(user: User, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    try:
        logger.debug(f"Executing SQL: SELECT uid FROM users WHERE uid = '{user.uid}'")
        cursor.execute("SELECT uid FROM users WHERE uid = ?", (user.uid,))
        existing_user = cursor.fetchone()
        if existing_user:
            logger.warning(f"User with uid '{user.uid}' already exists")
            raise HTTPException(status_code=400, detail="User already exists")
        logger.debug(f"Executing SQL: INSERT INTO users (uid, email, provider) VALUES ('{user.uid}', '{user.email}', '{user.provider}')")
        cursor.execute("INSERT INTO users (uid, email, provider) VALUES (?, ?, ?)", (user.uid, user.email, user.provider))
        db.commit()
        logger.info(f"User with uid '{user.uid}' registered successfully")
        return {"message": "User registered successfully"}
    except sqlite3.IntegrityError as e:
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=400, detail="Database error")

@router.get("/users/{uid}")
async def get_user_data(uid: str, request: Request, db: sqlite3.Connection = Depends(get_db)):
    try:
        token = request.headers.get('Authorization').split('Bearer ')[1]
        decoded_token = auth.verify_id_token(token)
        if decoded_token['uid'] != uid:
            logger.warning(f"Forbidden access: decoded uid '{decoded_token['uid']}' does not match requested uid '{uid}'")
            raise HTTPException(status_code=403, detail="Forbidden")
        logger.debug(f"Executing SQL: SELECT uid, email, provider FROM users WHERE uid = '{uid}'")
        cursor = db.cursor()
        cursor.execute("SELECT uid, email, provider FROM users WHERE uid = ?", (uid,))
        user = cursor.fetchone()
        if user is None:
            logger.warning(f"User with uid '{uid}' not found")
            raise HTTPException(status_code=404, detail="User not found")
        logger.info(f"User data for uid '{uid}' retrieved successfully")
        return {"uid": uid, "email": user[1], "provider": user[2]}
    except Exception as e:
        logger.error(f"Unauthorized access: {e}")
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/login_user/")
async def login_user(user: User, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    try:
        logger.debug(f"Executing SQL: SELECT uid FROM users WHERE uid = '{user.uid}' AND email = '{user.email}'")
        cursor.execute("SELECT uid FROM users WHERE uid = ? AND email = ?", (user.uid, user.email))
        existing_user = cursor.fetchone()
        if existing_user is None:
            logger.warning(f"Invalid credentials for uid '{user.uid}' and email '{user.email}'")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        logger.info(f"User with uid '{user.uid}' logged in successfully")
        return {"message": "Login successful"}
    except Exception as e:
        logger.error(f"Login failed: {e}")
        raise HTTPException(status_code=401, detail="Unauthorized")





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