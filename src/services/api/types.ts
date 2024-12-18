export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

export interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

export interface SyncData {
  tasks: unknown[];
  journal: unknown[];
  focus: unknown[];
  lastSyncTimestamp: number;
}

export interface ErrorResponse {
  message: string;
  code: string;
  details?: unknown;
}