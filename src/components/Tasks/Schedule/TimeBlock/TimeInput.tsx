import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      type="time"
      value={formatTime(value, '24h')}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="w-24 px-2 py-1 rounded border bg-white/50"
    />
  );
};

export default TimeInput;