import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingPage } from '../components/common/LoadingPage';
import { ErrorBoundary } from '../services/error/ErrorBoundary';
import { useAuth } from '../services/auth/AuthContext';
import ProtectedRoute from '../components/Auth/ProtectedRoute';

// Lazy load components
const LoginForm = React.lazy(() => import('../components/Auth/LoginForm'));
const RegisterForm = React.lazy(() => import('../components/Auth/RegisterForm'));
const ResetPassword = React.lazy(() => import('../components/Auth/ResetPassword'));
const ProfileSettings = React.lazy(() => import('../components/Auth/ProfileSettings'));
const Dashboard = React.lazy(() => import('../components/Dashboard'));
const JournalView = React.lazy(() => import('../components/Journal/JournalView'));
const TasksView = React.lazy(() => import('../components/Tasks/TasksView'));
const MentorsView = React.lazy(() => import('../components/Mentors/MentorsView'));
const SummaryView = React.lazy(() => import('../components/Summary/SummaryView'));

const LazyRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterForm />} 
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/journal" element={
            <ProtectedRoute>
              <JournalView />
            </ProtectedRoute>
          } />
          
          <Route path="/tasks" element={
            <ProtectedRoute>
              <TasksView />
            </ProtectedRoute>
          } />
          
          <Route path="/mentors" element={
            <ProtectedRoute>
              <MentorsView />
            </ProtectedRoute>
          } />
          
          <Route path="/summary" element={
            <ProtectedRoute>
              <SummaryView />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyRoutes;