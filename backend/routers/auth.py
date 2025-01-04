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

        if not user:
            # Insert new user if they don't exist
            query = (
                "INSERT INTO users (firebase_uid, email, username)"
                "VALUES (:firebase_uid, :email, :username)"
            )
            values = {
                "firebase_uid": firebase_uid,
                "email": decoded_token.get("email"),
                "username": decoded_token.get("name", ""),
            }
            await database.execute(query, values)

        return {"message": "User logged in!", "firebase_uid": firebase_uid}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid Firebase ID token")
