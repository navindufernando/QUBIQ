import { Router } from "express";
import { DeveloperController } from "../contollers/developer.controller";

const DeveloperRouter = Router();

// Defines routes for developer dashboard related operations (dev-dashboard)
DeveloperRouter.get('/tasks', DeveloperController.getAllTasks);
DeveloperRouter.get('/activities', DeveloperController.getActivities);
DeveloperRouter.get('/codeimp', DeveloperController.getCodeImprovements);
DeveloperRouter.get('/skillimp', DeveloperController.getSkillImprovements);
DeveloperRouter.get('/codetime', DeveloperController.getCodeTime);
DeveloperRouter.get('/codetime-total', DeveloperController.getTotalCodeTime);
// DeveloperRouter.get('/sprints', DeveloperController.getSprints);

export default DeveloperRouter;