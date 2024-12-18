import { achievementsService } from '../achievements';
import { FocusSession } from './types';

class FocusTracker {
  private sessions: FocusSession[] = [];

  public startSession(duration: number): string {
    const session: FocusSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      duration,
      completed: false
    };
    
    this.sessions.push(session);
    return session.id;
  }

  public completeSession(id: string): void {
    const session = this.sessions.find(s => s.id === id);
    if (session) {
      session.completed = true;
      achievementsService.trackProgress('COMPLETE_FOCUS_SESSION');
    }
  }

  public getSessions(): FocusSession[] {
    return [...this.sessions];
  }

  public getWeeklyStats(): { completed: number; totalMinutes: number } {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const weeklySessions = this.sessions.filter(
      session => session.completed && session.startTime >= weekStart
    );

    return {
      completed: weeklySessions.length,
      totalMinutes: weeklySessions.reduce((sum, session) => sum + session.duration, 0)
    };
  }
}

export const focusTracker = new FocusTracker();