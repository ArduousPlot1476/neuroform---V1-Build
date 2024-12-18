const SYNC_TIMESTAMP_KEY = 'last_sync_timestamp';

export const getLastSyncTimestamp = (): number => {
  const timestamp = localStorage.getItem(SYNC_TIMESTAMP_KEY);
  return timestamp ? parseInt(timestamp, 10) : 0;
};

export const setLastSyncTimestamp = (timestamp: number): void => {
  localStorage.setItem(SYNC_TIMESTAMP_KEY, timestamp.toString());
};