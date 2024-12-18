import React from 'react';
import StatCard from './StatCard';
import Achievements from './Achievements';
import InsightCard from './InsightCard';
import FocusTime from './FocusTime';
import JournalStreak from './JournalStreak';
import TaskCompletion from './TaskCompletion';
import { ExportButton } from './ExportButton';
import { useAchievements } from '../../hooks/useAchievements';
import type { Insight } from '../../types';

const SummaryView: React.FC = () => {
  const { achievements, progress } = useAchievements();

  const [insights] = React.useState<Insight[]>([
    {
      id: '1',
      title: 'Peak Performance Pattern',
      description: 'Your productivity is highest between 9 AM and 11 AM',
      category: 'Productivity',
      date: 'March 15, 2024',
    },
    {
      id: '2',
      title: 'Emotional Balance',
      description: 'Stress levels decrease after journaling sessions',
      category: 'Wellbeing',
      date: 'March 16, 2024',
    },
  ]);

  const weeklySummary = {
    weekStart: new Date(new Date().setDate(new Date().getDate() - 7)),
    weekEnd: new Date(),
    achievements: achievements.map(a => a.text),
    challenges: ['Challenge 1', 'Challenge 2'],
    insights: insights.map(i => i.title),
    focusTimeProgress: progress.focusSessions,
    journalingStreak: progress.journalStreak
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weekly Summary</h1>
        <ExportButton summary={weeklySummary} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FocusTime />
        <JournalStreak />
        <TaskCompletion />
      </div>

      <Achievements achievements={achievements} />

      <section>
        <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SummaryView;