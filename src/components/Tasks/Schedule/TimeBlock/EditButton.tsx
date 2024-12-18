import React from 'react';
import { Edit2 } from 'lucide-react';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="p-1 hover:bg-black/10 rounded-full transition-colors"
      aria-label="Edit block"
    >
      <Edit2 className="w-4 h-4 text-gray-600" />
    </button>
  );
}

export default EditButton;