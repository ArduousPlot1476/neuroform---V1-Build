import { AchievementCriteria } from './types';

export const achievementCriteria: AchievementCriteria[] = [
  {
    type: 'COMPLETE_FOCUS_SESSION',
    threshold: 15,
    text: 'Completed 15 deep work sessions',
    metric: '15 sessions × 25 minutes'
  },
  {
    type: 'MAINTAIN_JOURNAL_STREAK',
    threshold: 7,
    text: 'Maintained daily journaling streak',
    metric: '7 days streak'
  },
  {
    type: 'COMPLETE_COURSE',
    threshold: 1,
    text: 'Completed advanced React course',
    metric: '12 hours of focused learning'
  },
  {
    type: 'REACH_TASK_COMPLETION_RATE',
    threshold: 80,
    text: 'Achieved 80% task completion rate',
    metric: '24/30 tasks completed'
  },
  {
    type: 'MAINTAIN_EXERCISE_ROUTINE',
    threshold: 5,
    text: 'Morning exercise routine maintained',
    metric: '5 workouts this week'
  },
  {
    type: 'COMPLETE_MENTOR_SESSION',
    threshold: 1,
    text: 'Successful mentor session',
    metric: '1 hour productive discussion'
  }
];