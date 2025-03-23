from typing import List
from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()
model_knn = joblib.load("model_knn.pkl")
df = pd.read_csv("df_skill_recommendation.csv")

def recommend_top_skills(devSkills, df, model_knn, n_neighbors=10):
    # Convert input skills into a binary skill vector matching df_transformed columns
    input_vector = pd.DataFrame([[1 if skill in devSkills else 0 for skill in df.columns]], columns=df.columns)
    
    # Find nearest neighbors
    distances, indices = model_knn.kneighbors(input_vector, n_neighbors=n_neighbors)
    
    # Get indices of similar developers
    similar_devs = indices.flatten()
    
    # Aggregate skills from similar developers
    aggregated_skills = df.iloc[similar_devs].sum(axis=0)
    
    # Recommend skills that the input user doesn't have
    recommended_skills = aggregated_skills[input_vector.iloc[0] == 0]
    
    # Sort by frequency and return top 5 skills
    return recommended_skills.sort_values(ascending=False).index.tolist()[:5]

def recommend_skills(devSkills: List[str]):
    skills = recommend_top_skills(devSkills, df, model_knn, 10)
    return {"recommended_skills": skills}