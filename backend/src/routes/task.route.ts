import { Router } from "express";
import { TaskController } from "../contollers/task.controller";

const Taskrouter = Router();

// Defines routes for sprint related operations (pm-dashboard)
Taskrouter.post('/', TaskController.createTask);
Taskrouter.get('/', TaskController.getAllTasks);
Taskrouter.get('/:id', TaskController.getTaskById);
Taskrouter.put('/:id', TaskController.updateTask);
Taskrouter.delete('/:id', TaskController.deleteTask);

export default Taskrouter;