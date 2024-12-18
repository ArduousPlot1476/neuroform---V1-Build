import { CalendarService, CalendarEvent, SyncResult } from './types';
import * as googleProvider from './providers/google';
import * as outlookProvider from './providers/outlook';
import * as notionProvider from './providers/notion';
import { getStoredToken, removeToken } from './auth';

export const initiateCalendarAuth = (service: CalendarService): void => {
  switch (service) {
    case 'google':
      googleProvider.initiateGoogleAuth();
      break;
    case 'outlook':
      outlookProvider.initiateOutlookAuth();
      break;
    case 'notion':
      notionProvider.initiateNotionAuth();
      break;
  }
};

export const handleAuthCallback = async (
  service: CalendarService,
  code: string
) => {
  switch (service) {
    case 'google':
      return googleProvider.handleGoogleCallback(code);
    case 'outlook':
      return outlookProvider.handleOutlookCallback(code);
    case 'notion':
      return notionProvider.handleNotionCallback(code);
  }
};

export const syncCalendar = async (
  service: CalendarService,
  events: CalendarEvent[]
): Promise<SyncResult> => {
  switch (service) {
    case 'google':
      return googleProvider.syncGoogleCalendar(events);
    case 'outlook':
      return outlookProvider.syncOutlookCalendar(events);
    case 'notion':
      return notionProvider.syncNotionCalendar(events);
    default:
      return {
        success: false,
        error: 'Unsupported calendar service',
      };
  }
};

export const isAuthenticated = (service: CalendarService): boolean => {
  const token = getStoredToken(service);
  return !!token;
};

export const disconnectCalendar = (service: CalendarService): void => {
  removeToken(service);
};