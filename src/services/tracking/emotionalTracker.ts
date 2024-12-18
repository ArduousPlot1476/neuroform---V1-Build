import { FTDEntry } from './types';

class EmotionalTracker {
  private entries: FTDEntry[] = [];

  public addEntry(intensity: number, feeling: string): void {
    const entry: FTDEntry = {
      id: Date.now().toString(),
      date: new Date(),
      intensity,
      feeling,
    };
    
    this.entries.push(entry);
  }

  public getWeeklyData(): { day: string; value: number; label: string }[] {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyEntries = this.entries.filter(entry => entry.date >= weekStart);

    return days.map(day => {
      const dayEntries = weeklyEntries.filter(entry => 
        days[entry.date.getDay()] === day
      );

      if (dayEntries.length === 0) {
        return { day, value: 5, label: 'No entry' };
      }

      // Get the latest entry for the day
      const latestEntry = dayEntries.reduce((latest, current) => 
        current.date > latest.date ? current : latest
      );

      return {
        day,
        value: latestEntry.intensity,
        label: latestEntry.feeling,
      };
    });
  }
}

export const emotionalTracker = new EmotionalTracker();