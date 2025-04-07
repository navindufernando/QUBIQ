import { Router } from "express";
import { SprintController } from "../contollers/sprint.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const SprintRouter = Router();

SprintRouter.use(AuthMiddleware.authenticate);

// Routes for sprint-related operations (PM Dashboard)
SprintRouter.post("/", SprintController.createSprint);  // Create sprint
SprintRouter.get("/", SprintController.getAllSprints);  // Get all sprints with userId query
SprintRouter.get("/active", SprintController.getActiveSprint); // GET /sprint/active
SprintRouter.get("/:id", SprintController.getSprintById);  // Get a sprint by ID
SprintRouter.put("/:id", SprintController.updateSprint);  // Update sprint by ID
SprintRouter.delete("/:id", SprintController.deleteSprint);  // Delete sprint by ID

export default SprintRouter;
