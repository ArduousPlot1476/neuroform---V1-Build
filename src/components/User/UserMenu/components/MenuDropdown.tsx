import React from 'react';
import { User, LogOut } from 'lucide-react';
import { UserInfo } from './UserInfo';
import { MenuItem } from './MenuItem';
import type { User as UserType } from '../../../../types';

interface MenuDropdownProps {
  user: UserType | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  user,
  onNavigate,
  onLogout,
}) => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
    <UserInfo user={user} />
    
    <MenuItem
      icon={User}
      label="Profile"
      onClick={() => onNavigate('/profile')}
    />
    
    <div className="border-t my-1" />
    
    <MenuItem
      icon={LogOut}
      label="Log out"
      onClick={onLogout}
      variant="danger"
    />
  </div>
);