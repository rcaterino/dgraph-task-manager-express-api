import { fetchGraphQL } from '../services/database/dgraph.service';
import { Task, TaskRequestBody, TaskStatus } from '../types/tasks.interface';

export class TaskModel {

  // Method to retrieve all tasks from the database
  static async getAllTasks() {
    
    const operationsDoc =
      `
        query GetAllTasks {
          queryTask {
            id
            label
            status
            createdAt
            scheduledAt
            completedAt
            cancelledAt
          }
        }
      `;

    const { errors, data } = await fetchGraphQL(
      operationsDoc,
      "GetAllTasks",
      {}
    );

    if (errors) {
      // handle those errors like a pro
      console.error(errors);
      if (errors[0].message === "resource not found") {
        throw new Error('Tasks not found');
      } else {
        throw new Error('Internal server error');
      }
    }

    return data.queryTask;
  }

  // Method to retrieve a task by its ID from the database
  static async getTaskById(id: Task['id']) {
    const operationsDoc =
      `
        query GetTaskById($id: ID!) {
          getTask(id: $id) {
            id
            label
            status
            createdAt
            scheduledAt
            completedAt
            cancelledAt
          }
        }
      `;

    const { errors, data } = await fetchGraphQL(
      operationsDoc,
      "GetTaskById",
      { id }
    );

    if (errors) {
      // handle those errors like a pro
      console.error(errors);
      if (errors[0].message === "resource not found") {
        throw new Error('Task not found');
      } else {
        throw new Error('Internal server error');
      }
    }

    // If data.getTask is null, throw an error
    if (data.getTask === null) {
      throw new Error('Task not found');
    }

    return data.getTask;
  }

  // Method to create a new task in the database
  static async createTask(taskData: TaskRequestBody) {

    const { label, scheduledAt } = taskData;
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set the current date to midnight
    const createdAt = now.toISOString();
    console.log("createdAt", createdAt);
    const operationsDoc =
      `
          mutation CreateNewTask($label: String!, $createdAt: DateTime!, $scheduledAt: DateTime!) {
            addTask(input: [{label: $label, createdAt: $createdAt, scheduledAt: $scheduledAt, status: IN_PROGRESS}]) {
              task {
                id
                label
                status
                createdAt
                scheduledAt
              }
            }
          }
          `;

    const { errors, data } = await fetchGraphQL(
      operationsDoc,
      "CreateNewTask",
      { "label": label, "createdAt": createdAt, "scheduledAt": scheduledAt }
    );

    if (errors) {
      // handle those errors like a pro
      if (errors[0].message === "resource not found") {
        throw new Error('Task not found');
      } else {
        throw new Error('Internal server error');
      }
    }

    return data.addTask.task[0];
  }

  // Method to update an existing task by its ID in the database
  static async updateTaskById(taskId: Task['id'], taskUpdates: TaskRequestBody) {

    // First, get the current status of the task
    const currentTask = await this.getTaskById(taskId);

    // If the current status is not 'IN_PROGRESS', throw an error
    if (currentTask.status !== TaskStatus.IN_PROGRESS) {
      throw new Error('Task status cannot be updated for the same status');
    }

    // Define the base mutation
    let operationsDoc = `
  mutation UpdateTaskById($taskId: ID!, $label: String, $scheduledAt: DateTime, $status: TaskStatus, $completedAt: DateTime, $cancelledAt: DateTime) {
    updateTask(input: {filter: {id: [$taskId]}, set: {label: $label, scheduledAt: $scheduledAt, status: $status, completedAt: $completedAt, cancelledAt: $cancelledAt}}) {
      task {
        id
        label
        status
        createdAt
        scheduledAt
        completedAt
        cancelledAt
      }
    }
  }
`;

    // Check the status and set the completedAt or cancelledAt time
    if (taskUpdates.status === TaskStatus.DONE) {
      taskUpdates.completedAt = new Date();
      console.log("completedAt date", taskUpdates.completedAt);
    } else if (taskUpdates.status === TaskStatus.CANCELLED) {
      taskUpdates.cancelledAt = new Date();
      console.log("cancelledAt date", taskUpdates.cancelledAt);
    }

    // Define the variables for the mutation
    let variables: TaskRequestBody & { taskId: Task['id'], completedAt?: Task["completedAt"], cancelledAt?: Task["cancelledAt"] } = { taskId, ...taskUpdates };
    console.log("variables definidas", variables);
    // Remove undefined variables
    variables = Object.fromEntries(Object.entries(variables).filter(([_, v]) => v != null)) as TaskRequestBody & { taskId: Task['id'], completedAt?: Task["completedAt"], cancelledAt?: Task["cancelledAt"] };
    console.log("variables filtradas", variables);
    // Execute the mutation
    const { errors, data } = await fetchGraphQL(operationsDoc, "UpdateTaskById", variables);

    if (errors) {
      // handle those errors like a pro
      console.error(errors);
      if (errors[0].message === "resource not found") {
        throw new Error('Task not found');
      } else {
        throw new Error('Internal server error');
      }
    }

    // If no nodes were updated, throw an error
    if (!data.updateTask.task) {
      throw new Error('Task not found');
    }

    return data.updateTask.task;
  }

  // Method to delete an existing task by its ID in the database
  static async deleteTaskById(taskId: Task['id']) {
    const operationsDoc =
      `
        mutation DeleteTaskById($taskId: ID!) {
          deleteTask(filter: {id: [$taskId]}) {
            msg
          }
        }
      `;

    const { errors, data } = await fetchGraphQL(operationsDoc, "DeleteTaskById", { taskId });

    if (errors) {
      // handle those errors like a pro
      console.error(errors);
      if (errors[0].message === "resource not found") {
        throw new Error('Task not found');
      } else {
        throw new Error('Internal server error');
      }
    }

    // If no nodes were deleted, throw an error
    if (data.deleteTask.msg === 'No nodes were deleted') {
      throw new Error('Task not found');
    }

    return data.deleteTask.msg;
  }
}