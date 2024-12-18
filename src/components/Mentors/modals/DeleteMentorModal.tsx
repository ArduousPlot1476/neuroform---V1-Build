import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Mentor } from '../../../types';

interface DeleteMentorModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteMentorModal: React.FC<DeleteMentorModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !mentor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-slide-up">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Mentor Profile</h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete {mentor.name}'s profile? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMentorModal;