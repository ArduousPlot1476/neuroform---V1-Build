import React, { useState } from 'react';
import { useFocusTime } from './useFocusTime';
import FocusTimeDisplay from './FocusTimeDisplay';

const FocusTime: React.FC = () => {
  const { stats, updateGoal } = useFocusTime();

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Focus Time</h2>
      <FocusTimeDisplay stats={stats} onUpdateGoal={updateGoal} />
    </section>
  );
};

export default FocusTime;