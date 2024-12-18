import React from 'react';
import DayScoreCalendar from './DayScoreCalendar';

const DayScore: React.FC = () => {
  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <DayScoreCalendar />
    </section>
  );
};

export default DayScore;