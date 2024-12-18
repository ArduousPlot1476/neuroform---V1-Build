import React from 'react';
import { useProfileForm } from '../../../hooks/useProfileForm';
import { User } from '../../../types';
import { AsyncButton } from '../../common/AsyncButton';

interface ProfileFormProps {
  user: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { formData, isLoading, error, handleChange, handleSubmit } = useProfileForm(user);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <AsyncButton
        type="submit"
        loading={isLoading}
        className="w-full"
      >
        Save Changes
      </AsyncButton>
    </form>
  );
};