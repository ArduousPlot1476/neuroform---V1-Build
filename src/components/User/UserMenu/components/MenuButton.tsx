import React from 'react';

interface MenuButtonProps {
  initials: string;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ initials, onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-400 text-white px-3 py-1 rounded-full text-sm hover:bg-green-500 transition-colors"
    aria-label="Open user menu"
  >
    {initials}
  </button>
);