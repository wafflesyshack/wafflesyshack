import os
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from contextlib import asynccontextmanager
from backend.app.database import setup_database
from backend.app.routers.users import router as users_router
from backend.app.routers.stars import router as stars_router
from backend.app.routers.goals import router as goals_router
from backend.app.routers.achievements import router as achievements_router
from backend.app.routers.topics import router as topics_router

app = FastAPI()

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
    os.environ.get("FRONT_URL", "http://localhost:3000"),  # デフォルト値として"http://localhost:3000"
    "http://127.0.0.1:8000"  # こちらは固定のURLとして追加
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # フロントエンドのオリジン
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

logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
