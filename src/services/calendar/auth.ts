import { CalendarService, CalendarToken } from './types';

const STORAGE_KEY = 'calendar_tokens';

export const getStoredToken = (service: CalendarService): CalendarToken | null => {
  try {
    const tokens = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return tokens[service] || null;
  } catch {
    return null;
  }
};

export const storeToken = (token: CalendarToken): void => {
  try {
    const tokens = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    tokens[token.service] = token;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Failed to store token:', error);
  }
};

export const removeToken = (service: CalendarService): void => {
  try {
    const tokens = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    delete tokens[service];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

export const isTokenExpired = (token: CalendarToken): boolean => {
  // Add 5-minute buffer
  return Date.now() >= (token.expiresAt - 300000);
};