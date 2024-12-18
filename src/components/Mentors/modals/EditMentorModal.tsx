import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Mentor } from '../../../types';
import { FormInput } from './FormInput';
import { FormTextArea } from './FormTextArea';

interface EditMentorModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (mentor: Mentor) => void;
}

const EditMentorModal: React.FC<EditMentorModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Mentor>>({});

  useEffect(() => {
    if (mentor) {
      setFormData(mentor);
    }
  }, [mentor]);

  if (!isOpen || !mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...mentor, ...formData });
  };

  const handleInputChange = (field: keyof Mentor, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 animate-slide-up">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Edit Mentor Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Name"
              value={formData.name || ''}
              onChange={(value) => handleInputChange('name', value)}
              required
            />

            <FormInput
              label="Expertise"
              value={formData.expertise || ''}
              onChange={(value) => handleInputChange('expertise', value)}
              required
            />

            <FormInput
              label="Session Length (minutes)"
              type="number"
              value={formData.sessionLength || ''}
              onChange={(value) => handleInputChange('sessionLength', parseInt(value))}
              required
            />

            <FormInput
              label="Calendar URL"
              type="url"
              value={formData.calendarUrl || ''}
              onChange={(value) => handleInputChange('calendarUrl', value)}
              placeholder="https://calendly.com/your-username"
              helperText="Enter your scheduling link (e.g., Calendly, Cal.com)"
            />

            <FormTextArea
              label="Bio"
              value={formData.bio || ''}
              onChange={(value) => handleInputChange('bio', value)}
              required
              rows={4}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMentorModal;