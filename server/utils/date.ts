export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const getStartOfWeek = (date: Date = new Date()): Date => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day;
  return new Date(newDate.setDate(diff));
};

export const getEndOfWeek = (date: Date = new Date()): Date => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = 6 - day;
  return new Date(newDate.setDate(newDate.getDate() + diff));
};

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};