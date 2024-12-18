import { useState, useEffect } from 'react';
import { focusTracker } from '../../../../services/tracking/focusTracker';
import type { TimerState } from '../types';

export const useTimer = (initialMinutes: number) => {
  const [state, setState] = useState<TimerState>({
    timeLeft: initialMinutes * 60,
    isRunning: false,
    currentSessionId: null,
    elapsedTime: 0
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isRunning && state.timeLeft > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          elapsedTime: prev.elapsedTime + 1
        }));
      }, 1000);
    } else if (state.timeLeft === 0 && state.currentSessionId) {
      setState(prev => ({ ...prev, isRunning: false }));
      focusTracker.completeSession(state.currentSessionId);
      setState(prev => ({ ...prev, currentSessionId: null }));
    }

    return () => clearInterval(interval);
  }, [state.isRunning, state.timeLeft, state.currentSessionId]);

  const toggleTimer = () => {
    if (!state.isRunning && !state.currentSessionId) {
      const sessionId = focusTracker.startSession(initialMinutes);
      setState(prev => ({ ...prev, currentSessionId: sessionId }));
    }
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setState({
      timeLeft: initialMinutes * 60,
      isRunning: false,
      currentSessionId: null,
      elapsedTime: 0
    });
  };

  const saveSession = () => {
    if (state.currentSessionId && state.elapsedTime > 0) {
      focusTracker.completeSession(state.currentSessionId);
      resetTimer();
    }
  };

  const canSave = !state.isRunning && state.elapsedTime > 0;

  return {
    state,
    toggleTimer,
    resetTimer,
    saveSession,
    canSave
  };
};