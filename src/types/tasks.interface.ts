// Enum defining possible statuses for a task
export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

// Interface defining the structure of a Task
interface Task {
  id: string
  label: string
  status: TaskStatus
  createdAt: Date
  scheduledAt: Date
  completedAt: Date
  cancelledAt: Date
}

// Interface defining the structure of a Task Request Body used for updating tasks
interface TaskRequestBody {
  [key: string]: unknown;
  id?: Task['id'];
  label?: Task['label'];
  scheduledAt?: Task['scheduledAt'];
  status?: TaskStatus;
  completedAt?: Task['completedAt'];
  cancelledAt?: Task['cancelledAt'];
}


export type { Task, TaskRequestBody }