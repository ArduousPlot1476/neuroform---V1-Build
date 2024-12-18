import { TimeFormatOptions } from '../types';

export const convertTo12Hour = (time24h: string): string => {
  const [hours, minutes] = time24h.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${period}`;
};

export const convertTo24Hour = (time12h: string): string => {
  const [time, period] = time12h.split(' ');
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours);
  
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }
  
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
};

export const formatTime = (time: string, format: TimeFormatOptions = '12h'): string => {
  if (time.includes(' ')) {
    return format === '24h' ? convertTo24Hour(time) : time;
  }
  return format === '12h' ? convertTo12Hour(time) : time;
};