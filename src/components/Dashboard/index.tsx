import React from 'react';
import EmotionalWellbeing from './EmotionalWellbeing';
import ProgressBar from './ProgressBar';
import { useTimer } from '../../context/TimerContext';
import { emotionalTracker } from '../../services/tracking/emotionalTracker';
import { taskTracker } from '../../services/tracking/taskTracker';

const Dashboard = () => {
  // Get timer data from TimerContext
  const { totalFocusMinutes } = useTimer();

  // Fetch today's mood data
  const todayMood = emotionalTracker.getWeeklyData().find((data) => {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return data.day === days[today.getDay()];
  });

  // Fetch task progress data
  const taskStats = taskTracker.getProgress();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <EmotionalWellbeing />
      </div>
      <ProgressBar
        label="Daily Mood"
        value={todayMood?.label || 'No entry'}
        progress={todayMood ? (todayMood.value / 10) * 100 : 0}
      />
      <ProgressBar
        label="Tasks Done"
        value={`${taskStats.completed}/${taskStats.total}`}
        progress={taskStats.rate}
      />
      <ProgressBar
        label="Focus Time"
        value={`${totalFocusMinutes}m`}
        progress={(totalFocusMinutes / 480) * 100} // 8-hour daily goal
      />
    </div>
  );
};

export default Dashboard;
