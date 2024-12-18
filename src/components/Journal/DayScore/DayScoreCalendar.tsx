import React from 'react';
import InfoTooltip from './components/InfoTooltip';
import CalendarGrid from './components/CalendarGrid';
import ScoreLegend from './components/ScoreLegend';
import { useDayScores } from './hooks/useDayScores';

const DayScoreCalendar: React.FC = () => {
  const { scores, toggleScore } = useDayScores();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Score Your Day</h2>
        <InfoTooltip />
      </div>

      <CalendarGrid scores={scores} onToggleScore={toggleScore} />
      <ScoreLegend />
    </div>
  );
};

export default DayScoreCalendar;