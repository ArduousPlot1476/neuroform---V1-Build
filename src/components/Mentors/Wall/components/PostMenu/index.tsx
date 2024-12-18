import React from 'react';
import { usePostMenu } from './usePostMenu';
import MenuButton from './MenuButton';
import MenuOptions from './MenuOptions';

interface PostMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  isAuthor: boolean;
}

export const PostMenu: React.FC<PostMenuProps> = ({ onEdit, onDelete, isAuthor }) => {
  const { isOpen, menuRef, handleToggle, handleClose } = usePostMenu();

  if (!isAuthor) return null;

  return (
    <div className="relative" ref={menuRef}>
      <MenuButton onClick={handleToggle} />
      {isOpen && (
        <MenuOptions
          onEdit={() => {
            onEdit();
            handleClose();
          }}
          onDelete={() => {
            onDelete();
            handleClose();
          }}
        />
      )}
    </div>
  );
};