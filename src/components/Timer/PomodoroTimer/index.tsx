import React from 'react';
import TimerControls from './components/TimerControls';
import { useTimer } from './hooks/useTimer';
import type { TimerProps } from './types';

const PomodoroTimer: React.FC<TimerProps> = ({ initialMinutes = 25 }) => {
  const { state, toggleTimer, resetTimer, saveSession, canSave } = useTimer(initialMinutes);
  
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;

  return (
    <TimerControls
      isRunning={state.isRunning}
      onToggle={toggleTimer}
      onReset={resetTimer}
      onSave={saveSession}
      canSave={canSave}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default PomodoroTimer;