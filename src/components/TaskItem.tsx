'use client';

import { Task } from "@/lib/types/Task";
import { Notification } from "./Notification";

interface TaskItemProps {
    task: Task;
    onUpdate?: (updatedTask: Task) => void;
    onRemove?: (taskId: string) => void;
}

const TaskBase = ({ task, onUpdate, onRemove }: TaskItemProps) => {
    const handleToggleComplete = () => {
        if (onUpdate) {
            onUpdate({ ...task, isCompleted: !task.isCompleted });
        }
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove(task.id);
        }
    };

    return (
        <div className={`bg-gray-800 rounded-md p-4 shadow-md flex items-center justify-between ${task.isCompleted ? 'opacity-50' : ''}`}>
            <div>
                <h3 className="font-semibold text-white">{task.title}</h3>
                {task.description && <p className="text-gray-400 text-sm">{task.description}</p>}
                {task.dueDate && (
                    <div className="flex items-center text-sm text-yellow-400 mt-1">
                        <span className="mr-1">⏰</span>
                        <span>Due: {new Date(task.dueDate).toLocaleString()}</span>
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                <button onClick={handleToggleComplete} className="bg-green-500 text-white rounded-md p-2 text-sm hover:bg-green-600">
                    {task.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button onClick={handleRemove} className="bg-red-500 text-white rounded-md p-2 text-sm hover:bg-red-600">
                    Remove
                </button>
            </div>
        </div>
    );
};

export const BasicTask = (props: TaskItemProps) => {
    return <TaskBase {...props} />;
};

export const TimedTask = ({ task, ...props }: TaskItemProps) => {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

    return (
        <div className="rounded-md">
            <TaskBase task={task} {...props} />
            {isOverdue && <Notification>This task is overdue!</Notification>}
        </div>
    );
};

export const ChecklistTask = ({ task, ...props }: TaskItemProps) => {
    return (
        <div className="rounded-md">
            <TaskBase task={task} {...props} />
            {task.subtasks && task.subtasks.length > 0 && (
                <ul className="mt-2 pl-5 list-disc text-gray-300 text-sm">
                    {task.subtasks.map((subtask, index) => (
                        <li key={index}>{subtask}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};