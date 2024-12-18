import React from 'react';
import { Check } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
  >
    <Check className="w-4 h-4" />
    <span>Save</span>
  </button>
);

export default SaveButton;