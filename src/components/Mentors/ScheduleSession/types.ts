export interface ScheduleSessionProps {
  mentorId: string;
  mentorName: string;
  sessionLength: number;
  calendarUrl?: string;
}

export interface CalendarConfig {
  url: string;
  duration: number;
  name: string;
}