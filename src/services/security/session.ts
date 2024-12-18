// Secure Session Management
interface SessionData {
  id: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

class SessionManager {
  private readonly SESSION_KEY = 'secure_session';
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  public createSession(userId: string): SessionData {
    const session: SessionData = {
      id: crypto.randomUUID(),
      userId,
      createdAt: Date.now(),
      expiresAt: Date.now() + this.SESSION_DURATION,
    };

    this.saveSession(session);
    return session;
  }

  public getSession(): SessionData | null {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return null;

    try {
      const session: SessionData = JSON.parse(sessionData);
      if (this.isSessionExpired(session)) {
        this.clearSession();
        return null;
      }
      return session;
    } catch {
      this.clearSession();
      return null;
    }
  }

  public refreshSession(): SessionData | null {
    const session = this.getSession();
    if (!session) return null;

    const refreshedSession: SessionData = {
      ...session,
      expiresAt: Date.now() + this.SESSION_DURATION,
    };

    this.saveSession(refreshedSession);
    return refreshedSession;
  }

  public clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  private saveSession(session: SessionData): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  private isSessionExpired(session: SessionData): boolean {
    return Date.now() >= session.expiresAt;
  }
}

export const sessionManager = new SessionManager();