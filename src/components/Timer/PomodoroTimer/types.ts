export interface TimerProps {
  initialMinutes?: number;
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  currentSessionId: string | null;
  elapsedTime: number;
}