from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prism import Prisma
from fastapi import Request

app= FastAPI()
db= Prisma()

@app.on_event("startup")
async def startup():
    await db.connect()  

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/")
async def crate_name(request : Request):
    body= await request.json()
    db.user.create(
        "date":{
            "name":body["name"],
            "age":body["age"],
            "fathername":body["fathername"]
        }
    )

    return {"message":"User created successfully"}

@app.get("/users")
async def get_users():
    users = await db.user.find_many()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    
    return {"users": users['name'] for user in users}