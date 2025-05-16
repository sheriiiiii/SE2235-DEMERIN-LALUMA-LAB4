'use client';
import { useState, useEffect } from 'react';
import { TaskFactory } from '@/components/TaskFactory';
import { taskManager } from '@/lib/patterns/TaskManager';
import { TaskSorting } from '@/lib/patterns/TaskSorting';
import { Task, TaskType } from '@/lib/types/Task';
import { TaskAdapter } from '@/lib/patterns/TaskAdapter';
import { TaskControls } from '@/components/TaskControls';

export default function TodoPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortMethod, setSortMethod] = useState<'date' | 'name' | 'id'>('date');

    useEffect(() => {
        const fetchTasks = async () => {
            const mockApiTasks = [
                { _id: '1', name: 'Component Design Midterms', details: 'Finish before deadline', deadline: '2025-05-14T23:59:00+08:00', done: false },
                { _id: '2', name: 'Algorithms Laboratory', details: 'Finish before deadline', deadline: '2025-05-14T12:00:00+08:00', done: false },
                { _id: '3', name: 'Testing Laboratory', details: 'Finish before deadline', deadline: '2025-05-16T23:59:00+08:00', done: false }
            ];

            const adaptedTasks = mockApiTasks.map(TaskAdapter.adaptFromApi);
            adaptedTasks.forEach(task => taskManager.addTask(task));
            setTasks(taskManager.getAllTasks());
        };

        fetchTasks();
    }, []);

    const handleAddTask = (taskData: Partial<Task>, type: TaskType) => {
        if (!taskData.title) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: taskData.title,
            description: taskData.description,
            dueDate: taskData.dueDate,
            subtasks: type === 'checklist' ? ['Subtask 1', 'Subtask 2'] : undefined,
            isCompleted: false
        };

        taskManager.addTask(newTask);
        setTasks(taskManager.getAllTasks());
    };

    const handleUpdateTask = (updatedTask: Task) => {
        taskManager.updateTask(updatedTask.id, updatedTask);
        setTasks(taskManager.getAllTasks());
    };

    const handleRemoveTask = (taskId: string) => {
        taskManager.removeTask(taskId);
        setTasks(taskManager.getAllTasks());
    };

    const handleSearch = (query: string) => {
        setTasks(query.trim() === '' ? taskManager.getAllTasks() : taskManager.searchTasks(query));
    };

    const handleSort = (method: 'date' | 'name' | 'id') => {
        setSortMethod(method);
    };

    const getSortedTasks = () => {
        switch (sortMethod) {
            case 'date': return TaskSorting.sortByDate(tasks);
            case 'name': return TaskSorting.sortByName(tasks);
            case 'id': return TaskSorting.sortById(tasks);
            default: return tasks;
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-white">To-Do List Application</h1>

            <TaskControls
                onAddTask={handleAddTask}
                onSearch={handleSearch}
                onSort={handleSort}
            />

            <div className="mt-6 grid gap-4">
                {getSortedTasks().map((task) => (
                    <TaskFactory
                        key={task.id}
                        type={
                            Array.isArray(task.subtasks) && task.subtasks.length > 0
                                ? 'checklist'
                                : task.dueDate
                                ? 'timed'
                                : 'basic'
                        }
                        task={task}
                        onUpdate={handleUpdateTask}
                        onRemove={handleRemoveTask}
                    />
                ))}
            </div>
        </div>
    );
}