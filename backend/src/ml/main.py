from typing import List
import uvicorn
from fastapi import FastAPI
from aiModelService import recommend_skills

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "QUBIQ AI Model is running"}

@app.post("/skill")
async def recommend(devSkills: List[str]):
    return recommend_skills(devSkills)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)