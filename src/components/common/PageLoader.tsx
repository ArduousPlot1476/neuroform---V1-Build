import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);