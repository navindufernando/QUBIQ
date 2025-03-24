// recommendation.controller.ts 
// Handles HTTP requests and responses for recommendations
import { Request, Response } from "express";
import { RecommendationService } from "../services/recommendation.service";

const recommendationService  = new RecommendationService();

export class RecommendationController {
    //@desc     Get skill recommendations for the developer
    //@route    GET /dev/recommend/skill
    //@access   public
    static async getSkillRecommendations(req: Request, res: Response): Promise<any> {
        try {
            // Call the RecommendationService to fetch the skill recommendations
            const recommendedSkills = await recommendationService.getRecommendedSkills();

            // Return the recommended skills
            res.status(200).json({ recommended_skills: recommendedSkills });
        } catch (error) {
            // Handle errors
            res.status(500).json({ error: 'Failed to fetch skill recommendations' });
        }
    }
}