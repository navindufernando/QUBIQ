import { Router } from "express";
import { RecommendationController } from "../contollers/recommendation.controller";

const RecommendationRouter = Router();

// Defines routes for recommendation related operations (dev-dashboard)
RecommendationRouter.get('/skill', RecommendationController.getSkillRecommendations);

  
export default RecommendationRouter;