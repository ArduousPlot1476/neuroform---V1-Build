import React, { useState } from 'react';
import { Calendar, Clock, Star } from 'lucide-react';
import type { Mentor } from '../../types';
import MentorProfileModal from './MentorProfileModal';
import ScheduleSession from './ScheduleSession';

interface MentorCardProps {
  mentor: Mentor;
  onEdit: (mentor: Mentor) => void;
  onDelete: (mentor: Mentor) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onEdit, onDelete }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsProfileOpen(true)}
      >
        <div className="flex items-start space-x-4">
          <img
            src={mentor.avatarUrl}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{mentor.name}</h3>
            <p className="text-gray-600">{mentor.expertise}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{mentor.rating} ({mentor.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Next available: {mentor.nextAvailable}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{mentor.sessionLength} minutes session</span>
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <ScheduleSession
            mentorId={mentor.id}
            mentorName={mentor.name}
            sessionLength={mentor.sessionLength}
            calendarUrl={mentor.calendarUrl}
          />
        </div>
      </div>

      <MentorProfileModal
        mentor={mentor}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onEdit={() => {
          setIsProfileOpen(false);
          onEdit(mentor);
        }}
        onDelete={() => {
          setIsProfileOpen(false);
          onDelete(mentor);
        }}
      />
    </>
  );
};

export default MentorCard;