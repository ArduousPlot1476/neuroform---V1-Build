import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface MenuOptionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ onEdit, onDelete }) => (
  <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg py-1 z-10">
    <button
      onClick={onEdit}
      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
    >
      <Edit2 className="w-4 h-4" />
      <span>Edit</span>
    </button>
    <button
      onClick={onDelete}
      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>
  </div>
);

export default MenuOptions;