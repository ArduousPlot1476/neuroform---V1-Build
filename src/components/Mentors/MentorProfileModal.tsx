import React from 'react';
import { X, Edit2, Trash2, Star } from 'lucide-react';
import type { Mentor } from '../../types';
import ScheduleSession from './ScheduleSession';

interface MentorProfileModalProps {
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MentorProfileModal: React.FC<MentorProfileModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 animate-slide-up">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{mentor.name}</h2>
            <div className="flex items-center space-x-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Edit mentor"
                >
                  <Edit2 className="w-5 h-5 text-gray-600" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Delete mentor"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <img
                src={mentor.avatarUrl}
                alt={mentor.name}
                className="w-full aspect-square rounded-lg object-cover"
              />
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">{mentor.rating}</span>
                <span className="text-gray-500">({mentor.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                <p className="text-gray-600">{mentor.expertise}</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Availability</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Next available: {mentor.nextAvailable}</p>
                  <p className="text-gray-600">Session length: {mentor.sessionLength} minutes</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-600">{mentor.bio}</p>
              </section>

              <ScheduleSession
                mentorId={mentor.id}
                mentorName={mentor.name}
                sessionLength={mentor.sessionLength}
                calendarUrl={mentor.calendarUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileModal;