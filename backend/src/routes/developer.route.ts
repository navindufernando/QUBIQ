import { Router } from "express";
import { DeveloperController } from "../contollers/developer.controller";
import RecommendationRouter from "./recommendation.route";

const DeveloperRouter = Router();

// Defines routes for developer dashboard related operations (dev-dashboard)
DeveloperRouter.get('/tasks', DeveloperController.getAllTasks);
DeveloperRouter.get('/activities', DeveloperController.getActivities);
// DeveloperRouter.get('/codeimp', DeveloperController.getCodeImprovements);
DeveloperRouter.get('/skillimp', DeveloperController.getSkillImprovements);
DeveloperRouter.get('/codetime', DeveloperController.getCodeTime);
DeveloperRouter.get('/codetime-total', DeveloperController.getTotalCodeTime);
DeveloperRouter.get('/codetimeinsight', DeveloperController.getCodeTimeInsight);
DeveloperRouter.get('/sprints', DeveloperController.getSprintsForDeveloper);

DeveloperRouter.post('/devcode', DeveloperController.getCodeAnalysis);

DeveloperRouter.patch('/tasks/:id', DeveloperController.updateTaskStatus);

DeveloperRouter.use('/improvement', RecommendationRouter);
  
export default DeveloperRouter;