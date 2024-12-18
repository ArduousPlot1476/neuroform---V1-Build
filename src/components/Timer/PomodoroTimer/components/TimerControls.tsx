import React from 'react';
import { Play, Pause, Save, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSave: () => void;
  canSave: boolean;
  minutes: number;
  seconds: number;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onToggle,
  onReset,
  onSave,
  canSave,
  minutes,
  seconds,
}) => (
  <div className="flex items-center space-x-2">
    <button
      onClick={onToggle}
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
      onClick={onSave}
      disabled={!canSave}
      className={`p-1 rounded-full transition-colors ${
        canSave 
          ? 'hover:bg-gray-100 text-gray-600' 
          : 'text-gray-300 cursor-not-allowed'
      }`}
      aria-label="Save session"
    >
      <Save className="w-4 h-4" />
    </button>
    <div className="text-lg font-medium">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
    <button
      onClick={onReset}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Reset timer"
    >
      <RotateCcw className="w-4 h-4 text-gray-600" />
    </button>
  </div>
);