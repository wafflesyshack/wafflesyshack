import os
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from contextlib import asynccontextmanager
from backend.app.database import setup_database
from routers import users, stars, goals, achievements

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
origins = [os.environ.get("FRONT_URL", "http://localhost:3000")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# ルーターを追加
app.include_router(users.router)
app.include_router(stars.router)
app.include_router(goals.router)
app.include_router(achievements.router)

logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
