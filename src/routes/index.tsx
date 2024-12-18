import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth/AuthContext';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element: Element }) => (
        <Route
          key={path}
          path={path}
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Element />
          }
        />
      ))}

      {/* Protected Routes */}
      {protectedRoutes.map(({ path, element: Element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <Element />
            </ProtectedRoute>
          }
        />
      ))}

      {/* Default redirect */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;