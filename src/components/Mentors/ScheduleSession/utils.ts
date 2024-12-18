export const generateCalendarUrl = (mentorId: string, duration: number, calendarUrl?: string): string => {
  // If mentor has a custom calendar URL, use that
  if (calendarUrl) {
    return calendarUrl;
  }

  // Fallback to default URL structure
  const baseUrl = 'https://calendly.com';
  const mentorUsername = `mentor-${mentorId}`;
  return `${baseUrl}/${mentorUsername}/${duration}-min-session`;
};