"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const express_validator_1 = require("express-validator");
const task_model_1 = require("../models/task.model");
class TasksController {
    static async getAllTasks(req, res) {
        try {
            const tasks = await task_model_1.TaskModel.getAllTasks();
            res.json(tasks);
        }
        catch (error) {
            if (error.message === 'Tasks not found') {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
    static async getTaskById(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const task = await task_model_1.TaskModel.getTaskById(req.params.id);
            res.json(task);
        }
        catch (error) {
            if (error.message === 'Task not found') {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
    static async createTask(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const taskData = req.body;
            const newTask = await task_model_1.TaskModel.createTask(taskData);
            res.status(201).json(newTask);
        }
        catch (error) {
            if (error.message === 'Task not found') {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
    static async updateTaskById(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const taskUpdates = req.body;
        try {
            const task = await task_model_1.TaskModel.updateTaskById(req.params.id, taskUpdates);
            res.status(200).json(task);
        }
        catch (error) {
            if (error.message === 'Task not found') {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
    static async deleteTaskById(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const message = await task_model_1.TaskModel.deleteTaskById(req.params.id);
            res.status(202).json({ message });
        }
        catch (error) {
            if (error.message === 'Task not found') {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
}
exports.TasksController = TasksController;
