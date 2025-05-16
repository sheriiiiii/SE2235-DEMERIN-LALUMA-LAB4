import { Task } from "../types/Task";

interface ApiTask {
    _id: string;
    name: string;
    details?: string;
    deadline?: string;
    done?: boolean;
    items?: string[];
}

export class TaskAdapter {
    static adaptFromApi(apiTask: ApiTask): Task {
        return {
        id: apiTask._id,
        title: apiTask.name,
        description: apiTask.details,
        dueDate: apiTask.deadline ? new Date(apiTask.deadline) : undefined,
        isCompleted: apiTask.done || false,
        subtasks: apiTask.items
        };
    }

    static adaptToApi(task: Task): ApiTask {
        return {
        _id: task.id,
        name: task.title,
        details: task.description,
        deadline: task.dueDate?.toISOString(),
        done: task.isCompleted,
        items: task.subtasks
        };
    }
}