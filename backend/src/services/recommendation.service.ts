// recommendation.service.ts 
import axios from "axios";
import { OpenAI } from "openai";
import { PrismaClient } from "@prisma/client";

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const prisma = new PrismaClient();

export class RecommendationService  {
    
    //@desc     Fetch skill recommendations from FastAPI
    //@returns  Recommended skills from FastAPI
    async getRecommendedSkills(): Promise<string[]> {
        try {
            // Send POST request to FastAPI with developer's skills
            const response = await axios.post("http://localhost:8000/skill", {
                devSkills: ["python", "sql", "django"]
            });

            // Get descriptions for each skill (via OpenAI)
            const skillDescriptions = await this.getSkillDescription(response.data.recommended_skills);

            // Map the recommended skills to include descriptions and other metadata
            const recommendedSkillsWithDetails = response.data.recommended_skills.map((skill: string, id: number) => {
                return {
                    id: id.toString(),
                    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
                    description: skillDescriptions[skill], // Get description
                    dateSuggested: new Date().toLocaleDateString(), // Current date as suggested date
                };
            });

            // Return the recommended skills from FastAPI response
            return recommendedSkillsWithDetails;
        } catch (error) {
            // Handle error if communication with FastAPI fails
            console.error("Error fetching recommendations:", error);
            throw new Error("Error fetching recommendations");
        }
    }

    private async getSkillDescription(skills: string[]): Promise<{ [key: string]: string}> {
        const descriptions: { [key: string]: string } = {};

        // Iterate through each skill and use OpenAI to generate descriptions
        for (const skill of skills) {
            const prompt = `Provide a very brief description for the skill(1 line): ${skill}`;

            try {
                // Call OpenAI to generate a description
                const response = await openai.chat.completions.create({
                    model: "gpt-4o-mini", // Or you can use gpt-4 if available
                    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
                    max_tokens: 30,
                });
    
                // Check if 'choices' is null or empty
                if (response.choices && response.choices.length > 0 && response.choices[0].message?.content) {
                    const description = response.choices[0].message.content.trim();
                    descriptions[skill] = description || "Description not available";
                } else {
                    descriptions[skill] = "Description not available";
                }
            } catch (error) {
                console.error(`Error generating description for skill: ${skill}`, error);
                descriptions[skill] = "Error fetching description";
            }
        }
        return descriptions;
    }
}