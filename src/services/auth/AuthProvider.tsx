import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import type { User, AuthState } from './types';
import { getStoredToken, setStoredToken, removeStoredToken } from './storage';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        setState({ ...initialState, isLoading: false });
        return;
      }

      // TODO: Validate token and fetch user data
      const user = await validateToken(token);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...initialState,
        isLoading: false,
        error: 'Session expired',
      });
      removeStoredToken();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // TODO: Implement API call
      const response = await loginUser(email, password);
      
      setStoredToken(response.token);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // TODO: Implement API call
      const response = await registerUser(email, password, name);
      
      setStoredToken(response.token);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  };

  const logout = async () => {
    try {
      setState({ ...state, isLoading: true });
      
      // TODO: Implement API call
      await logoutUser();
      
      removeStoredToken();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      });
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setState({ ...state, isLoading: true });
      
      // TODO: Implement API call
      const updatedUser = await updateUserProfile(updates);
      
      setState({
        ...state,
        user: updatedUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Profile update failed',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Temporary mock functions until API integration
const validateToken = async (token: string): Promise<User> => {
  // Implement token validation
  return {} as User;
};

const loginUser = async (email: string, password: string) => {
  // Implement login API call
  return { token: '', user: {} as User };
};

const registerUser = async (email: string, password: string, name: string) => {
  // Implement register API call
  return { token: '', user: {} as User };
};

const logoutUser = async () => {
  // Implement logout API call
};

const updateUserProfile = async (updates: Partial<User>): Promise<User> => {
  // Implement profile update API call
  return {} as User;
};