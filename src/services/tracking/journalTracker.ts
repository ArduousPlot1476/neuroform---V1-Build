import { achievementsService } from '../achievements';
import { JournalEntry } from './types';

class JournalTracker {
  private entries: JournalEntry[] = [];

  public addEntry(type: JournalEntry['type']): void {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      type
    };
    
    this.entries.push(entry);
    this.checkStreak();
  }

  private checkStreak(): void {
    const streak = this.getCurrentStreak();
    if (streak > 0) {
      achievementsService.trackProgress('MAINTAIN_JOURNAL_STREAK');
    }
  }

  public getCurrentStreak(): number {
    const today = new Date();
    let streak = 0;
    let currentDate = today;

    while (true) {
      const hasEntry = this.entries.some(entry => 
        entry.date.toDateString() === currentDate.toDateString()
      );

      if (!hasEntry) break;
      
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }

  public getEntries(): JournalEntry[] {
    return [...this.entries];
  }
}

export const journalTracker = new JournalTracker();