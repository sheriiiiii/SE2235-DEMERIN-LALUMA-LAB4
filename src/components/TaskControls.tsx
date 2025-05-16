"use client";

import { useState } from "react";
import { Task, TaskType } from "@/lib/types/Task";

interface TaskControlsProps {
    onAddTask: (task: Partial<Task>, type: TaskType) => void;
    onSearch: (query: string) => void;
    onSort: (method: "date" | "name" | "id") => void;
}

export const TaskControls = ({ onAddTask, onSearch, onSort }: TaskControlsProps) => {
    const [newTask, setNewTask] = useState<Partial<Task>>({ title: "" });
    const [taskType, setTaskType] = useState<TaskType>("basic");
    const [searchQuery, setSearchQuery] = useState("");

    const [titleError, setTitleError] = useState("");
    const [dueDateError, setDueDateError] = useState("");

    const handleAddTask = () => {
        if (!newTask.title || newTask.title.trim() === "") {
        setTitleError("Title is required");
        return;
        }

        if (taskType === "timed") {
        if (!newTask.dueDate) {
            setDueDateError("Due date is required for timed tasks");
            return;
        }

        if (newTask.dueDate < new Date()) {
            setDueDateError("Due date cannot be in the past");
            return;
        }
        }

        setTitleError("");
        setDueDateError("");
        onAddTask(newTask, taskType);
        setNewTask({ title: "" });
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="bg-gray-700 p-4 rounded-md flex flex-col gap-4">
        {/* Top Row: Add Task Controls */}
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
          {/* Task title input */}
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => {
              setNewTask({ ...newTask, title: e.target.value });
              if (e.target.value.trim() !== "") setTitleError("");
            }}
            className="bg-gray-800 text-white rounded-md p-2 flex-1 min-w-[180px]"
          />
          {titleError && <span className="text-red-500 text-sm">{titleError}</span>}
      
          {/* Task type selector */}
          <select
            value={taskType}
            onChange={(e) => {
              setTaskType(e.target.value as TaskType);
              setNewTask({ ...newTask, dueDate: undefined });
              setDueDateError("");
            }}
            className="bg-gray-800 text-white rounded-md p-2"
          >
            <option value="basic">Basic</option>
            <option value="timed">Timed</option>
          </select>
      
          {/* Due date input for timed task */}
          {taskType === "timed" && (
            <>
              <input
                type="datetime-local"
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setNewTask({ ...newTask, dueDate: selectedDate });
                  if (selectedDate >= new Date()) setDueDateError("");
                }}
                className="bg-gray-800 text-white rounded-md p-2"
              />
              {dueDateError && <span className="text-red-500 text-sm">{dueDateError}</span>}
            </>
          )}
      
          {/* Add task button */}
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      
        {/* Bottom Row: Search & Sort */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center flex-wrap">
            <input
              type="text"
              placeholder="Search tasks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white rounded-md p-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
      
          <div>
            <select
              onChange={(e) => onSort(e.target.value as "date" | "name" | "id")}
              className="bg-gray-800 text-white rounded-md p-2"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="id">Sort by ID</option>
            </select>
          </div>
        </div>
      </div>      
    );
};