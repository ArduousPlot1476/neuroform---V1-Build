import React from 'react';
import { getScoreColor } from '../utils/colors';
import type { DayScore } from '../types';

interface CalendarGridProps {
  scores: Record<string, DayScore['score']>;
  onToggleScore: (dateKey: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ scores, onToggleScore }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Month labels */}
        <div className="flex">
          <div className="w-12"></div>
          {months.map((month) => (
            <div key={month} className="flex-1 text-center text-sm text-gray-600">
              {month}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        {days.map((day) => (
          <div key={day} className="flex items-center mt-2">
            <div className="w-12 text-sm text-gray-600">{day}</div>
            {Array.from({ length: 52 }, (_, weekIndex) => {
              const dateKey = `${day}-${weekIndex}`;
              return (
                <button
                  key={weekIndex}
                  onClick={() => onToggleScore(dateKey)}
                  className={`w-6 h-6 m-0.5 rounded-sm transition-colors ${getScoreColor(scores[dateKey])}`}
                  aria-label={`Score for ${day}, week ${weekIndex + 1}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;