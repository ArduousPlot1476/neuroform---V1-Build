import React, { useState } from 'react';
import { useTaskCompletion } from './useTaskCompletion';
import TaskCompletionDisplay from './TaskCompletionDisplay';

const TaskCompletion: React.FC = () => {
  const { stats, updateGoal } = useTaskCompletion();

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Task Completion</h2>
      <TaskCompletionDisplay stats={stats} onUpdateGoal={updateGoal} />
    </section>
  );
};

export default TaskCompletion;