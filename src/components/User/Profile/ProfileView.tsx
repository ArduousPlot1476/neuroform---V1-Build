import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../../services/auth/AuthContext';
import { ProfileForm } from './ProfileForm';
import { ProfileHeader } from './ProfileHeader';

const ProfileView: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ProfileHeader user={user} />
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default ProfileView;