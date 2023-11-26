type TaskStatus = "IN_PROGRESS" | "DONE" | "CANCELLED"

interface Task {
  id: string
  label: string
  status: TaskStatus
  createdAt: Date
  scheduledAt: Date
  completedAt: Date
  cancelledAt: Date
}

export type { Task, TaskStatus }