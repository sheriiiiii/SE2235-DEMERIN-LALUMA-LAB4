'use client'
import { Task, TaskType } from '../lib/types/Task';
import { ChecklistTask, TimedTask, BasicTask } from './TaskItem';

interface TaskFactoryProps {
    type: TaskType;
    task: Task;
    onUpdate?: (updatedTask: Task) => void;
    onRemove?: (taskId: string) => void;
}

export const TaskFactory: React.FC<TaskFactoryProps> = ({
    type,
    task,
    onUpdate,
    onRemove
}) => {
    switch (type) {
        case 'basic':
            return <BasicTask task={task} onUpdate={onUpdate} onRemove={onRemove} />;
        case 'timed':
            return <TimedTask task={task} onUpdate={onUpdate} onRemove={onRemove} />;
        case 'checklist':
            return <ChecklistTask task={task} onUpdate={onUpdate} onRemove={onRemove} />;
        default:
            throw new Error(`Unknown task type: ${type}`);
    }
};