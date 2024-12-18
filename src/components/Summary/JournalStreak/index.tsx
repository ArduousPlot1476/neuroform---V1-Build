import React, { useState } from 'react';
import { useJournalStreak } from './useJournalStreak';
import JournalStreakDisplay from './JournalStreakDisplay';

const JournalStreak: React.FC = () => {
  const { stats, updateGoal } = useJournalStreak();

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Journal Streak</h2>
      <JournalStreakDisplay stats={stats} onUpdateGoal={updateGoal} />
    </section>
  );
};

export default JournalStreak;