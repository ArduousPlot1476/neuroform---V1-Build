import React from 'react';
import { Brain } from 'lucide-react';
import { useAuth } from '../../services/auth/AuthContext';

interface FloatingParkingLotButtonProps {
  onClick: () => void;
}

const FloatingParkingLotButton: React.FC<FloatingParkingLotButtonProps> = ({ onClick }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button 
      onClick={onClick}
      className="fixed bottom-6 right-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-40"
      aria-label="Open Parking Lot"
    >
      <Brain className="w-6 h-6 text-purple-600" />
    </button>
  );
};

export default FloatingParkingLotButton;