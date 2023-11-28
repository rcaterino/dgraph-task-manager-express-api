import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { TaskModel } from '../models/task.model';
import { TaskRequestBody } from '../types/tasks.interface';

export class TasksController {
  /**
   * Retrieve all tasks
   * @param req - Express Request object
   * @param res - Express Response object
   */
  static async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.json(tasks);
    } catch (error: any) {
      if (error.message === 'Tasks not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Get a task by ID
   * @param req - Express Request object containing the task ID
   * @param res - Express Response object
   */
  static async getTaskById(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await TaskModel.getTaskById(req.params.id);
      res.json(task);
    } catch (error: any) {
      if (error.message === 'Task not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Create a new task
   * @param req - Express Request object containing the task data
   * @param res - Express Response object
   */
  static async createTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const taskData = req.body;
      const newTask = await TaskModel.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error: any) {
      if (error.message === 'Task not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Update a task by ID
   * @param req - Express Request object containing the task ID and updated data
   * @param res - Express Response object
   */
  static async updateTaskById(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const taskUpdates: TaskRequestBody = req.body;
    try {
      const task = await TaskModel.updateTaskById(req.params.id, taskUpdates);
      res.status(200).json(task);
    } catch (error: any) {
      if (error.message === 'Task not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Delete a task by ID
   * @param req - Express Request object containing the task ID
   * @param res - Express Response object
   */
  static async deleteTaskById(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const message = await TaskModel.deleteTaskById(req.params.id);
      res.status(202).json({ message });
    } catch (error: any) {
      if (error.message === 'Task not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
}