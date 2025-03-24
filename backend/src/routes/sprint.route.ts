import { Router } from "express";
import { SprintController } from "../contollers/sprint.controller";

const SprintRouter = Router();

// Routes for sprint-related operations (PM Dashboard)
SprintRouter.post("/", (req, res) => SprintController.createSprint(req, res));  // Create sprint
SprintRouter.get("/", (req, res) => SprintController.getAllSprints(req, res));  // Get all sprints with userId query
SprintRouter.get("/:id", (req, res) => SprintController.getSprintById(req, res));  // Get a sprint by ID
SprintRouter.put("/:id", (req, res) => SprintController.updateSprint(req, res));  // Update sprint by ID
SprintRouter.delete("/:id", (req, res) => SprintController.deleteSprint(req, res));  // Delete sprint by ID

export default SprintRouter;
