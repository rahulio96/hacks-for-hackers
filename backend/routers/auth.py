from fastapi import APIRouter, HTTPException, Request
from firebase_admin import auth
from database import database
router = APIRouter()

@router.post("/login")
async def login(request: Request):
    try:
        request = await request.json()
        token = request.get("token")

        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(token)
        firebase_uid = decoded_token["uid"]

        # Check if the user exists in the database
        query = "SELECT * FROM users WHERE firebase_uid = :firebase_uid"
        user = await database.fetch_one(query, {"firebase_uid": firebase_uid})
        email = ""
        username = ""

        if not user:
            # Insert new user if they don't exist
            email = decoded_token.get("email")
            query = (
                "INSERT INTO users (firebase_uid, email, username)"
                "VALUES (:firebase_uid, :email, :username)"
            )
            values = {
                "firebase_uid": firebase_uid,
                "email": email,
                "username": username,
            }
            await database.execute(query, values)
        else:
            email = user.get("email")
            username = user.get("username")

        return {
            "message": "User logged in!", 
            "firebase_uid": firebase_uid,
            "email": email,
            "username": username,
        }
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid Firebase ID token")
