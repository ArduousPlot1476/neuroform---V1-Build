import React from 'react';
import { MoreVertical } from 'lucide-react';

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
    aria-label="Post options"
  >
    <MoreVertical className="w-4 h-4 text-gray-500" />
  </button>
);

export default MenuButton;