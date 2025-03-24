from typing import List
import uvicorn
from fastapi import FastAPI
from aiModelService import recommend_skills
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "QUBIQ AI Model is running"}

@app.post("/skill")
async def recommend(request: dict):
    devSkills = request.get("devSkills", [])
    skills = recommend_skills(devSkills)
    return skills

if __name__ == "__main__":
    logger.info("Starting the FastAPI server.")
    uvicorn.run(app, host="0.0.0.0", port=8000)
    logger.info("FastAPI server started.")