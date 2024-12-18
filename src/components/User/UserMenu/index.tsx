import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/auth/AuthContext';
import { useClickOutside } from './hooks/useClickOutside';
import { MenuButton } from './components/MenuButton';
import { MenuDropdown } from './components/MenuDropdown';

interface UserMenuProps {
  initials: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ initials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useClickOutside(menuRef, () => setIsOpen(false));

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <MenuButton
        initials={initials}
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {isOpen && (
        <MenuDropdown
          user={user}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};