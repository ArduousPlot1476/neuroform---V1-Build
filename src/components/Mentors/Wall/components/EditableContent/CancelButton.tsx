import React from 'react';
import { X } from 'lucide-react';

interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
  >
    <X className="w-4 h-4" />
    <span>Cancel</span>
  </button>
);

export default CancelButton;