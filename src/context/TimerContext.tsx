import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextProps {
  timeLeft: number;
  isRunning: boolean;
  totalFocusMinutes: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  saveSession: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setElapsedSeconds(0);
  };

  const saveSession = () => {
    if (elapsedSeconds > 0) {
      const minutes = Math.floor(elapsedSeconds / 60);
      setTotalFocusMinutes((prev) => {
        const updatedTotal = prev + minutes;
        console.log("Session saved. Total Focus Minutes Updated to:", updatedTotal);
        return updatedTotal;
      });
      setElapsedSeconds(0);
      alert('Focus session saved successfully!');
    } else {
      alert('No focus time to save.');
    }
  };

  // Force a new reference to ensure re-renders
  const contextValue = {
    timeLeft,
    isRunning,
    totalFocusMinutes, // Updated state
    toggleTimer,
    resetTimer,
    saveSession,
  };

  return (
    <TimerContext.Provider value={{ ...contextValue }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
