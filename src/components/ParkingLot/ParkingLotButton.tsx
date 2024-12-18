import React from 'react';
import { Brain } from 'lucide-react';
import { useAuth } from '../../services/auth/AuthContext';

interface ParkingLotButtonProps {
  onClick: () => void;
}

const ParkingLotButton: React.FC<ParkingLotButtonProps> = ({ onClick }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button 
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Open Parking Lot"
    >
      <Brain className="w-6 h-6 text-purple-600" />
    </button>
  );
};

export default ParkingLotButton;