import React from 'react';
import { Plus } from 'lucide-react';

interface AddBlockButtonProps {
  onClick: () => void;
}

const AddBlockButton: React.FC<AddBlockButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full mt-4 p-2 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 transition-colors"
    >
      <Plus className="w-4 h-4" />
      <span>Add Block</span>
    </button>
  );
};

export default AddBlockButton;