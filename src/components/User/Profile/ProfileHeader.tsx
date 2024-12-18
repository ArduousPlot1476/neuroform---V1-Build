import React from 'react';
import { User } from '../../../types';

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => (
  <div className="flex items-center space-x-4">
    <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
      ) : (
        <User className="w-8 h-8 text-purple-600" />
      )}
    </div>
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>
    </div>
  </div>
);