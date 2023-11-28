import { Request, Response } from 'express';
import { fetchGraphQL } from '../services/database/dgraph.service';


export class TasksController {
  
  static async getAllTasks(req: Request, res: Response) {
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

    function fetchGetAllTasks() {
      return fetchGraphQL(
        operationsDoc,
        "GetAllTasks",
        {}
      );
    }

    async function startFetchGetAllTasks() {
      const { errors, data } = await fetchGetAllTasks();

      if (errors) {
        // handle those errors like a pro
        console.error(errors);
      }

      // do something great with this precious data
      res.json(data.queryTask);
    }

    startFetchGetAllTasks();

  }
}