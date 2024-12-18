import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { TimeBlock } from './types';

interface EditBlockModalProps {
  block: TimeBlock | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (block: TimeBlock) => void;
}

const EditBlockModal: React.FC<EditBlockModalProps> = ({ block, isOpen, onClose, onSave }) => {
  const [editedBlock, setEditedBlock] = useState<TimeBlock | null>(null);

  useEffect(() => {
    if (block) {
      setEditedBlock(block);
    }
  }, [block]);

  if (!isOpen || !editedBlock) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedBlock) {
      onSave(editedBlock);
    }
  };

  const handleTimeChange = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedTime = `${formattedHour}:${minutes} ${period}`;
    
    setEditedBlock(prev => prev ? {
      ...prev,
      time: formattedTime
    } : null);
  };

  // Convert 12-hour time to 24-hour format for input
  const get24HourTime = (time12h: string) => {
    const [time, period] = time12h.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Time Block</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={get24HourTime(editedBlock.time)}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity
            </label>
            <input
              type="text"
              value={editedBlock.activity}
              onChange={(e) => setEditedBlock(prev => prev ? {
                ...prev,
                activity: e.target.value
              } : null)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlockModal;