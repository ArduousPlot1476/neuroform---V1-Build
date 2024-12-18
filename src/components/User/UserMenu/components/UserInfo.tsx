import React from 'react';
import { User } from '../../../../types';

interface UserInfoProps {
  user: User | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <div className="px-4 py-3 border-b">
    <p className="text-sm font-medium">{user?.name}</p>
    <p className="text-xs text-gray-500">{user?.email}</p>
  </div>
);