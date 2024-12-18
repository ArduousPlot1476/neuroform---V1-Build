export type CalendarService = 'google' | 'outlook' | 'notion';

export interface CalendarToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  service: CalendarService;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface SyncResult {
  success: boolean;
  error?: string;
  eventsAdded?: number;
  eventsUpdated?: number;
  eventsRemoved?: number;
}