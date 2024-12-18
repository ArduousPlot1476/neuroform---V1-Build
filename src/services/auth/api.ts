import { LoginCredentials, RegisterCredentials, ResetPasswordData, UpdateProfileData } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.neuroform.app';

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    return response.json();
  },

  async register(data: RegisterCredentials) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  async resetPassword(data: ResetPasswordData) {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Password reset failed');
    }
  },

  async updateProfile(data: UpdateProfileData) {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Profile update failed');
    }
    
    return response.json();
  },

  async verifySession() {
    const response = await fetch(`${API_URL}/auth/verify`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Session invalid');
    }
    
    return response.json();
  },
};