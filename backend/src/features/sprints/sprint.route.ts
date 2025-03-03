import { Router } from "express";
import { SprintController } from "./sprint.controller";

const router = Router();

// Defines routes for sprint related operations (pm-dashboard)
router.post('/', SprintController.createSprint);
router.get('/', SprintController.getAllSprints);
router.get('/:id', SprintController.getSprintById);
router.put('/:id', SprintController.updateSprint);
router.delete('/:id', SprintController.deleteSprint);

export default router;