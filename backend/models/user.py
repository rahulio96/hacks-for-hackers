from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    firebase_uid: str
    username: Optional[str]
    email: Optional[EmailStr]