import { CalendarToken, CalendarEvent, SyncResult } from '../types';
import { getStoredToken, storeToken, isTokenExpired } from '../auth';

const CLIENT_ID = process.env.GOOGLE_CALENDAR_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export const initiateGoogleAuth = (): void => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${CLIENT_ID}&
    redirect_uri=${REDIRECT_URI}&
    response_type=code&
    scope=${SCOPES.join(' ')}&
    access_type=offline&
    prompt=consent`;
  
  window.location.href = authUrl;
};

export const handleGoogleCallback = async (code: string): Promise<CalendarToken> => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) throw new Error('Token request failed');

    const data = await response.json();
    const token: CalendarToken = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
      service: 'google',
    };

    storeToken(token);
    return token;
  } catch (error) {
    console.error('Google auth error:', error);
    throw error;
  }
};

export const refreshGoogleToken = async (token: CalendarToken): Promise<CalendarToken> => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: token.refreshToken,
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) throw new Error('Token refresh failed');

    const data = await response.json();
    const newToken: CalendarToken = {
      ...token,
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
    };

    storeToken(newToken);
    return newToken;
  } catch (error) {
    console.error('Google token refresh error:', error);
    throw error;
  }
};

export const syncGoogleCalendar = async (events: CalendarEvent[]): Promise<SyncResult> => {
  try {
    let token = getStoredToken('google');
    if (!token) throw new Error('Not authenticated with Google Calendar');

    if (isTokenExpired(token)) {
      token = await refreshGoogleToken(token);
    }

    const existingEvents = await fetchGoogleEvents(token);
    const result = await updateGoogleEvents(token, events, existingEvents);
    
    return result;
  } catch (error) {
    console.error('Google calendar sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

const fetchGoogleEvents = async (token: CalendarToken): Promise<CalendarEvent[]> => {
  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    }
  );

  if (!response.ok) throw new Error('Failed to fetch events');

  const data = await response.json();
  return data.items.map((item: any) => ({
    id: item.id,
    title: item.summary,
    startTime: item.start.dateTime,
    endTime: item.end.dateTime,
    description: item.description,
  }));
};

const updateGoogleEvents = async (
  token: CalendarToken,
  newEvents: CalendarEvent[],
  existingEvents: CalendarEvent[]
): Promise<SyncResult> => {
  let added = 0, updated = 0, removed = 0;

  // Implementation details for updating Google Calendar
  // This would include creating, updating, and deleting events as needed

  return {
    success: true,
    eventsAdded: added,
    eventsUpdated: updated,
    eventsRemoved: removed,
  };
};