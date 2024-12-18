import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner />
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  </div>
);