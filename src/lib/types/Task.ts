export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    isCompleted?: boolean;
    subtasks?: string[];
}

export type TaskType  = 'basic' | 'timed' | 'checklist';