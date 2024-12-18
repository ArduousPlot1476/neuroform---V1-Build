import React from 'react';
import PomodoroTimer from './Timer/PomodoroTimer';
import ParkingLotButton from './ParkingLot/ParkingLotButton';
import UserMenu from './User/UserMenu';

interface HeaderProps {
  onParkingLotClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onParkingLotClick }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <ParkingLotButton onClick={onParkingLotClick} />
        <span className="text-xl font-bold">Neuroform</span>
      </div>
      <div className="flex items-center space-x-4">
        <PomodoroTimer />
        <UserMenu initials="TR" />
      </div>
    </header>
  );
}

export default Header;