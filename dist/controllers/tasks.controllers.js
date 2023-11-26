"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const dgraph_service_1 = require("../services/database/dgraph.service");
class TasksController {
    static async getAllTasks(req, res) {
        const operationsDoc = `
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
            return (0, dgraph_service_1.fetchGraphQL)(operationsDoc, "GetAllTasks", {});
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
exports.TasksController = TasksController;
