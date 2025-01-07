from fastapi import APIRouter, HTTPException, Request
from firebase_admin import auth
from database import database
router = APIRouter()

@router.post("/login")
async def login(request: Request):
    try:
        request = await request.json()
        token = request.get("token")
        username = request.get("username")

        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(token, clock_skew_seconds=20)
        firebase_uid = decoded_token["uid"]

        # Check if the user exists in the database
        query = "SELECT * FROM users WHERE firebase_uid = :firebase_uid"
        user = await database.fetch_one(query, {"firebase_uid": firebase_uid})
        email = ""
        username = username

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
            raise HTTPException(status_code=400, detail="User already exists")
        
        return {
            "message": "User logged in!", 
            "firebase_uid": firebase_uid,
            "email": email,
            "username": username,
        }
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid Firebase ID token")
    
@router.post("/getuser")
async def fetchUser(request: Request):
    try:
        # Get the user's firebase uid
        request = await request.json()
        uid  = request.get("uid")
        query = "SELECT * FROM users WHERE firebase_uid = :firebase_uid"
        user = await database.fetch_one(query, {"firebase_uid": uid})

        email = user.email
        username = user.username
        

        return {
            "message": "User fetched successfully", 
            "firebase_uid": uid,
            "email": email,
            "username": username,
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="User not found")