import { useState } from 'react';
import type { WallPost } from '../../../../types';

export const usePost = (post: WallPost) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  return {
    isEditing,
    startEditing,
    stopEditing,
  };
};