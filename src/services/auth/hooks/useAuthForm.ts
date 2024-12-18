// Custom hook for auth form logic
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const useAuthForm = (formType: 'login' | 'register' | 'reset') => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    token: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      switch (formType) {
        case 'login':
          await login({ email: formData.email, password: formData.password });
          navigate('/dashboard');
          break;
        case 'register':
          await register({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          });
          navigate('/dashboard');
          break;
        case 'reset':
          await resetPassword({
            email: formData.email,
            token: formData.token,
            newPassword: formData.password,
          });
          setSuccess('Password reset successful');
          setTimeout(() => navigate('/login'), 2000);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  return {
    formData,
    error,
    success,
    handleChange,
    handleSubmit,
  };
};