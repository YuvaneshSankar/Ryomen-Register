from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma
from fastapi import Request

app = FastAPI()
db = Prisma()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await db.connect()  

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.post("/register")
async def create_user(request: Request):
    body = await request.json()
    user = await db.user.create(
        data={
            "name": body["name"],
            "age": int(body["age"]),
            "fathername": body["fathername"]
        }
    )
    return {"message": "User created successfully", "user": user}

@app.get("/users")
async def get_users():
    users = await db.user.find_many()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return {"users": users}

