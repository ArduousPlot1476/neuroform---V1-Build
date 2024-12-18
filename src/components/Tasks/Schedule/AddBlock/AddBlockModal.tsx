import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { TimeBlock } from '../types';
import TimeInput from '../TimeBlock/TimeInput';
import ActivityInput from '../TimeBlock/ActivityInput';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (block: Omit<TimeBlock, 'id'>) => void;
  dayType: TimeBlock['dayType'];
}

const AddBlockModal: React.FC<AddBlockModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  dayType,
}) => {
  const [time, setTime] = useState('09:00 AM');
  const [activity, setActivity] = useState('');
  const [color, setColor] = useState('bg-purple-100');
  const [icon, setIcon] = useState<string | undefined>();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      time,
      activity,
      color,
      icon,
      dayType,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Time Block</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <TimeInput
              value={time}
              onChange={setTime}
              onKeyDown={() => {}}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity
            </label>
            <ActivityInput
              value={activity}
              onChange={setActivity}
              onKeyDown={() => {}}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <ColorPicker value={color} onChange={setColor} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <IconPicker value={icon} onChange={setIcon} />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlockModal;