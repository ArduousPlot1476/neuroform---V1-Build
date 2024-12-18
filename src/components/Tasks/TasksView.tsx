import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TaskCategory from './TaskCategory';
import AddTaskModal from './AddTaskModal';
import TimeBlockedSchedule from './Schedule/TimeBlockedSchedule';
import { taskTracker } from '../../services/tracking/taskTracker';
import type { Task } from '../../types';

const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      category: 'inbox',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      title: 'Schedule team meeting',
      category: 'next',
      priority: 'medium',
      completed: false,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed).length;
    taskTracker.updateProgress(completedTasks, tasks.length);
  }, [tasks]);

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
  };

  const categories = [
    { id: 'inbox', label: 'Inbox' },
    { id: 'next', label: 'Next Actions' },
    { id: 'projects', label: 'Projects' },
    { id: 'waiting', label: 'Waiting For' },
    { id: 'someday', label: 'Someday' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {categories.map((category) => (
        <TaskCategory
          key={category.id}
          label={category.label}
          tasks={tasks.filter(task => task.category === category.id)}
          onTaskComplete={handleTaskComplete}
        />
      ))}

      <TimeBlockedSchedule />

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
};

export default TasksView;