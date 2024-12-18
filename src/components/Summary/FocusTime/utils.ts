import { FocusSession } from '../../../services/tracking/types';

export const calculateFocusTimeStats = (sessions: FocusSession[], weeklyGoal: number = 600) => {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  const weeklySessions = sessions.filter(
    session => session.completed && session.startTime >= weekStart
  );

  const totalSessions = weeklySessions.length;
  const totalMinutes = weeklySessions.reduce((sum, session) => sum + session.duration, 0);
  const progress = Math.min(Math.round((totalMinutes / weeklyGoal) * 100), 100);

  return {
    totalSessions,
    totalMinutes,
    weeklyGoal,
    progress
  };
};