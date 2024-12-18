import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
    <div className="flex items-start">
      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
      <div className="ml-3 flex-1">
        <p className="text-sm text-red-700">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto pl-3"
          aria-label="Dismiss error"
        >
          <X className="w-5 h-5 text-red-500 hover:text-red-600" />
        </button>
      )}
    </div>
  </div>
);