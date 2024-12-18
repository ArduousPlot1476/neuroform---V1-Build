import React from 'react';
import { Calendar } from 'lucide-react';
import { generateCalendarUrl } from './utils';
import type { ScheduleSessionProps } from './types';

const ScheduleSession: React.FC<ScheduleSessionProps> = ({
  mentorId,
  mentorName,
  sessionLength,
  calendarUrl,
}) => {
  const handleSchedule = () => {
    const scheduleUrl = generateCalendarUrl(mentorId, sessionLength, calendarUrl);
    window.open(scheduleUrl, '_blank');
  };

  return (
    <button
      onClick={handleSchedule}
      className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
    >
      <Calendar className="w-4 h-4" />
      <span>Schedule Session</span>
    </button>
  );
};

export default ScheduleSession;