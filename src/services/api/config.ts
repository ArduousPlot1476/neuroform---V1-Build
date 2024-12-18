export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'https://api.neuroform.app',
  version: 'v1',
  timeout: 10000,
};

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    verify: '/auth/verify',
    resetPassword: '/auth/reset-password',
    profile: '/auth/profile',
  },
  data: {
    sync: '/data/sync',
    tasks: '/data/tasks',
    journal: '/data/journal',
    focus: '/data/focus',
    mentors: '/data/mentors',
  },
};