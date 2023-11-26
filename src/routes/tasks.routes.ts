import { Router } from "express";
import { TasksController } from "../controllers/tasks.controllers";

export const tasksRouter = Router();


tasksRouter.get('/', TasksController.getAllTasks);

// todo tasksRouter.get('/:id', TasksController.getTaskById);

// todo tasksRouter.post('/', TasksController.createTask);

// todo tasksRouter.patch('/:id', TasksController.updateTask);

// todo tasksRouter.delete('/:id', TasksController.deleteTask);
