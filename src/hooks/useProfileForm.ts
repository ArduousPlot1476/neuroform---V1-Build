import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../services/auth/AuthContext';
import { User } from '../types';

interface ProfileFormData {
  name: string;
  email: string;
}

export const useProfileForm = (user: User) => {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user.name,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await updateProfile(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};