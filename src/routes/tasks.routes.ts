import { Router } from "express";
import { TasksController } from "../controllers/tasks.controllers";
import { TasksValidator } from "../validators/tasks.validators";

// Initialize a new Express Router instance
export const tasksRouter = Router();

// Endpoint to retrieve all tasks
tasksRouter.get('/', TasksController.getAllTasks);

// Endpoint to retrieve a specific task by ID
tasksRouter.get('/:id', TasksValidator.idValidator, TasksController.getTaskById);

// Endpoint to create a new task
tasksRouter.post('/', TasksValidator.createTaskValidations, TasksController.createTask);

// Endpoint to update a specific task by ID
tasksRouter.patch('/:id', TasksValidator.idValidator, TasksValidator.updateTaskValidations, TasksController.updateTaskById);

// Endpoint to delete a specific task by ID
tasksRouter.delete('/:id', TasksValidator.idValidator, TasksController.deleteTaskById);
