import { Router } from "express";
import { SprintController } from "../contollers/sprint.controller";

const Sprintrouter = Router();

// Defines routes for sprint related operations (pm-dashboard)
Sprintrouter.post('/', SprintController.createSprint);
Sprintrouter.get('/', SprintController.getAllSprints);
Sprintrouter.get('/:id', SprintController.getSprintById);
Sprintrouter.put('/:id', SprintController.updateSprint);
Sprintrouter.delete('/:id', SprintController.deleteSprint);

export default Sprintrouter;