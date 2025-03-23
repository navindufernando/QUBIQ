import axios from "axios";

// recommendation.service.ts 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RecommendationService  {
    
    //@desc     Fetch skill recommendations from FastAPI
    //@returns  Recommended skills from FastAPI
    async getRecommendedSkills(): Promise<string[]> {
        try {
            const devSkills = ["python", "sql", "django"];
            // Send POST request to FastAPI with developer's skills
            const response = await axios.post("http://localhost:8000/skill", {
                devSkills,
            });

            // Return the recommended skills from FastAPI response
            return response.data.recommended_skills;
        } catch (error) {
            // Handle error if communication with FastAPI fails
            console.error("Error fetching recommendations:", error);
            throw new Error("Error fetching recommendations");
        }
    }
}