export interface MentorSessionFilters {
  userId: string;
  mentorId?: string;
  startDate?: Date;
  endDate?: Date;
  completed?: boolean;
}

export interface MentorStats {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  averageDuration: number;
  totalHours: number;
  mentorBreakdown: {
    mentorId: string;
    sessionCount: number;
    totalHours: number;
  }[];
}

export interface CreateMentorSessionData {
  userId: string;
  mentorId: string;
  startTime: Date;
  duration: number;
  notes?: string;
}

export interface UpdateMentorSessionData {
  startTime?: Date;
  duration?: number;
  notes?: string;
  completed?: boolean;
}

export interface AvailabilityCheck {
  mentorId: string;
  startTime: Date;
  duration: number;
}