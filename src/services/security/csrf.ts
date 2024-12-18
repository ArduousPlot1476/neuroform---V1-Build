// CSRF Protection
export const CSRF_HEADER = 'X-CSRF-Token';

export const generateCsrfToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const getCsrfToken = (): string => {
  let token = localStorage.getItem(CSRF_HEADER);
  if (!token) {
    token = generateCsrfToken();
    localStorage.setItem(CSRF_HEADER, token);
  }
  return token;
};