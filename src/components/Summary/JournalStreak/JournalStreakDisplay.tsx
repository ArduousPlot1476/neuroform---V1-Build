import React from 'react';
import { BookOpen, Award, Target } from 'lucide-react';
import EditableGoal from '../shared/EditableGoal';
import type { JournalStreakStats } from './types';

interface JournalStreakDisplayProps {
  stats: JournalStreakStats;
  onUpdateGoal: (newGoal: number) => void;
}

const JournalStreakDisplay: React.FC<JournalStreakDisplayProps> = ({ stats, onUpdateGoal }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Current Streak</span>
        </div>
        <span className="text-lg font-bold">{stats.currentStreak} days</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Longest Streak</span>
        </div>
        <span className="text-lg font-bold">{stats.longestStreak} days</span>
      </div>

      <EditableGoal
        icon={Target}
        value={stats.weeklyGoal}
        label="Weekly Goal"
        unit="entries"
        onSave={onUpdateGoal}
      />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Weekly Progress</span>
          <span>{stats.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {stats.totalEntries} journal entries this week
      </p>
    </div>
  );
};

export default JournalStreakDisplay;