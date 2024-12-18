import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Check } from 'lucide-react';
import CalendarServiceButton from './CalendarServiceButton';
import type { CalendarService } from './types';

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSync: (service: CalendarService) => void;
}

const CalendarSyncModal: React.FC<CalendarSyncModalProps> = ({
  isOpen,
  onClose,
  onSync,
}) => {
  const [selectedService, setSelectedService] = useState<CalendarService | null>(null);

  if (!isOpen) return null;

  const handleSync = () => {
    if (selectedService) {
      onSync(selectedService);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Sync with Calendar</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <CalendarServiceButton
            service="google"
            isSelected={selectedService === 'google'}
            onClick={() => setSelectedService('google')}
          />
          <CalendarServiceButton
            service="outlook"
            isSelected={selectedService === 'outlook'}
            onClick={() => setSelectedService('outlook')}
          />
          <CalendarServiceButton
            service="notion"
            isSelected={selectedService === 'notion'}
            onClick={() => setSelectedService('notion')}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSync}
            disabled={!selectedService}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
          >
            <Check className="w-4 h-4" />
            <span>Sync Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarSyncModal;