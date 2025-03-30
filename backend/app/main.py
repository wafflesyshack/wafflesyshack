import os
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, Header
from dotenv import load_dotenv
import sqlite3
from backend.app.database import get_db
import firebase_admin
from firebase_admin import credentials, auth # credentials を追加
import uvicorn
from backend.app.database import setup_database
from backend.app.routers.users import router as users_router
from backend.app.routers.stars import router as stars_router
from backend.app.routers.goals import router as goals_router
from backend.app.routers.achievements import router as achievements_router
from backend.app.routers.topics import router as topics_router
from contextlib import asynccontextmanager # asynccontextmanager を追加

load_dotenv(".env.local")

# ロギング設定
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

service_account_key_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "waffle-syshack-firebase-adminsdk-fbsvc-1ea26f3ac4.json"))

try:
    cred = credentials.Certificate(service_account_key_path)
    firebase_admin.initialize_app(cred)
    logger.info("Firebase Admin SDK initialized successfully")
except Exception as e:
    logger.error(f"Firebase Admin SDK initialization failed: {e}")

app = FastAPI()

app.include_router(users_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_database()
    yield

app = FastAPI(lifespan=lifespan)

# CORS設定
origins = [
    os.environ.get("FRONT_URL", "http://localhost:3000"),
    "http://127.0.0.1:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# ルーターを追加
app.include_router(users_router)
app.include_router(stars_router)
app.include_router(goals_router)
app.include_router(achievements_router)
app.include_router(topics_router)

# ID トークンを検証する関数
def verify_id_token(id_token: str = Header(...)):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]
        return uid
    except Exception as e:
        logger.error(f"ID token verification failed: {e}")
        raise HTTPException(status_code=401, detail="認証に失敗しました")


