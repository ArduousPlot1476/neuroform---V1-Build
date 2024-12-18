import React from 'react';
import { Check, X } from 'lucide-react';
import TimeInput from './TimeInput';
import ActivityInput from './ActivityInput';

interface EditFormProps {
  time: string;
  activity: string;
  onTimeChange: (time: string) => void;
  onActivityChange: (activity: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
  time,
  activity,
  onTimeChange,
  onActivityChange,
  onSave,
  onCancel,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      <TimeInput
        value={time}
        onChange={onTimeChange}
        onKeyDown={handleKeyPress}
      />
      <ActivityInput
        value={activity}
        onChange={onActivityChange}
        onKeyDown={handleKeyPress}
      />
      <div className="flex items-center space-x-1">
        <button
          onClick={onSave}
          className="p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <Check className="w-4 h-4 text-green-600" />
        </button>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default EditForm;