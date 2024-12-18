import { Calendar } from 'lucide-react';
import type { CalendarService } from './types';

export const getServiceIcon = (service: CalendarService) => {
  // In a real app, you might want to use specific icons for each service
  return Calendar;
};

export const getServiceName = (service: CalendarService): string => {
  const names: Record<CalendarService, string> = {
    google: 'Google Calendar',
    outlook: 'Microsoft Outlook',
    notion: 'Notion Calendar',
  };
  return names[service];
};