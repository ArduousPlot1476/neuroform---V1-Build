import React from 'react';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds }) => (
  <div className="text-lg font-medium">
    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
  </div>
);

export default TimerDisplay;