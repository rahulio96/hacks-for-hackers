from fastapi import FastAPI
from routers import auth
from database import database
from contextlib import asynccontextmanager
import firebase_admin
from firebase_admin import credentials

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize Firebase Admin SDK
    cred = credentials.Certificate("./serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    await database.connect()
    yield
    await database.disconnect()

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)