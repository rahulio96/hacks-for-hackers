import os
from databases import Database
from sqlalchemy import create_engine, MetaData, Table, Column, String, TIMESTAMP
from dotenv import load_dotenv

load_dotenv("./.env")
DATABASE_URL = os.environ.get("DATABASE_URL")

database = Database(DATABASE_URL)
metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("id", String, primary_key=True),
    Column("firebase_uid", String, unique=True),
    Column("username", String),
    Column("email", String, unique=True),
    Column("created_at", TIMESTAMP),
)

engine = create_engine(DATABASE_URL)
metadata.create_all(engine)
