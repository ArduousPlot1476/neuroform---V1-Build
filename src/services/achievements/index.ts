import { achievementCriteria } from './criteria';
import type { Achievement } from '../../components/Summary/Achievements/types';
import type { AchievementTrigger, AchievementProgress } from './types';

class AchievementsService {
  private progress: AchievementProgress = {
    focusSessions: 0,
    journalStreak: 0,
    coursesCompleted: 0,
    taskCompletionRate: 0,
    weeklyWorkouts: 0,
    mentorSessions: 0
  };

  private achievements: Achievement[] = [];

  public trackProgress(trigger: AchievementTrigger): void {
    switch (trigger) {
      case 'COMPLETE_FOCUS_SESSION':
        this.progress.focusSessions++;
        break;
      case 'MAINTAIN_JOURNAL_STREAK':
        this.progress.journalStreak++;
        break;
      case 'COMPLETE_COURSE':
        this.progress.coursesCompleted++;
        break;
      case 'MAINTAIN_EXERCISE_ROUTINE':
        this.progress.weeklyWorkouts++;
        break;
      case 'COMPLETE_MENTOR_SESSION':
        this.progress.mentorSessions++;
        break;
    }

    this.checkAchievements();
  }

  public updateTaskCompletionRate(completed: number, total: number): void {
    this.progress.taskCompletionRate = (completed / total) * 100;
    this.checkAchievements();
  }

  private checkAchievements(): void {
    achievementCriteria.forEach(criteria => {
      const isAchieved = this.checkCriteria(criteria.type, criteria.threshold);
      const existingAchievement = this.achievements.find(
        a => a.text === criteria.text
      );

      if (isAchieved && !existingAchievement) {
        this.achievements.push({
          id: Date.now().toString(),
          text: criteria.text,
          type: this.getAchievementType(criteria.type),
          metric: criteria.metric,
          date: new Date()
        });
      }
    });
  }

  private checkCriteria(type: AchievementTrigger, threshold: number): boolean {
    switch (type) {
      case 'COMPLETE_FOCUS_SESSION':
        return this.progress.focusSessions >= threshold;
      case 'MAINTAIN_JOURNAL_STREAK':
        return this.progress.journalStreak >= threshold;
      case 'COMPLETE_COURSE':
        return this.progress.coursesCompleted >= threshold;
      case 'REACH_TASK_COMPLETION_RATE':
        return this.progress.taskCompletionRate >= threshold;
      case 'MAINTAIN_EXERCISE_ROUTINE':
        return this.progress.weeklyWorkouts >= threshold;
      case 'COMPLETE_MENTOR_SESSION':
        return this.progress.mentorSessions >= threshold;
      default:
        return false;
    }
  }

  private getAchievementType(trigger: AchievementTrigger) {
    const typeMap: Record<AchievementTrigger, Achievement['type']> = {
      'COMPLETE_FOCUS_SESSION': 'focus',
      'MAINTAIN_JOURNAL_STREAK': 'productivity',
      'COMPLETE_COURSE': 'learning',
      'REACH_TASK_COMPLETION_RATE': 'milestone',
      'MAINTAIN_EXERCISE_ROUTINE': 'health',
      'COMPLETE_MENTOR_SESSION': 'social'
    };
    return typeMap[trigger];
  }

  public getAchievements(): Achievement[] {
    return [...this.achievements];
  }

  public getProgress(): AchievementProgress {
    return { ...this.progress };
  }
}

export const achievementsService = new AchievementsService();