import { Router } from "express";
import { TasksController } from "../controllers/tasks.controllers";
import { TasksValidator } from "../validators/tasks.validators";

// Initialize a new Express Router instance
export const tasksRouter = Router();

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     description: The list can be filtered by status and/or scheduledAt. If no filter is applied, all tasks are returned.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [IN_PROGRESS, DONE, CANCELLED]
 *         description: The status of the tasks to retrieve
 *       - in: query
 *         name: scheduledAt
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The scheduled date and time of the tasks to retrieve
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
tasksRouter.get('/', TasksController.getAllTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Retrieve a task by its ID
 *     description: Retrieve a task by its ID. If the task is not found, a 404 error is returned.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 label:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 scheduledAt:
 *                   type: string
 *                   format: date-time
 *                 completedAt:
 *                   type: string
 *                   format: date-time
 *                 cancelledAt:
 *                   type: string
 *                   format: date-time
 */
tasksRouter.get('/:id', TasksValidator.idValidator, TasksController.getTaskById);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: The API only accepts label and scheduledAt for creating a new task. Any other fields will not be taken into account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
tasksRouter.post('/', TasksValidator.createTaskValidations, TasksController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Update a task by its ID
 *     description: Update a task by its ID. Only the label, scheduledAt and status fields can be updated. If the status is changed to DONE or CANCELLED, the completedAt or cancelledAt fields are set to the current date and time.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [IN_PROGRESS, DONE, CANCELLED]
 *                 description: Can only be changed from IN_PROGRESS to DONE or CANCELLED. Once changed to DONE or CANCELLED, it cannot be changed again.
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
tasksRouter.patch('/:id', TasksValidator.idValidator, TasksValidator.updateTaskValidations, TasksController.updateTaskById);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by its ID
 *     description: Delete a task by its ID. If the task is not found, a 404 error is returned.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted task
 */
tasksRouter.delete('/:id', TasksValidator.idValidator, TasksController.deleteTaskById);
