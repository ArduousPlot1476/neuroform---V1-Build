import React from 'react';
import { Play, Pause, RotateCcw, Save } from 'lucide-react';
import { useTimer } from '../../context/TimerContext';

const PomodoroTimer: React.FC = () => {
  const { timeLeft, isRunning, toggleTimer, resetTimer, saveSession } = useTimer();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2">
      <div className="text-lg font-medium">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={toggleTimer}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <Pause className="w-4 h-4 text-gray-600" />
          ) : (
            <Play className="w-4 h-4 text-gray-600" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={saveSession}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Save focus session"
        >
          <Save className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
