import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'default'
}) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 ${
      variant === 'danger' ? 'text-red-600' : 'text-gray-700'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);