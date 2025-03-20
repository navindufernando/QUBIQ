import { Router } from "express";
import { ProjectController } from "../contollers/project.controller";

const ProjectRouter = Router();

// Defines routes for project related operations
ProjectRouter.post('/', ProjectController.createProject);
ProjectRouter.get('/', ProjectController.getAllProjects);
ProjectRouter.get('/:id', ProjectController.getProjectById);
ProjectRouter.put('/:id', ProjectController.updateProject);
ProjectRouter.delete('/:id', ProjectController.deleteProject);

export default ProjectRouter;