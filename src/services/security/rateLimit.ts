// Rate Limiting
interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  public checkLimit(endpoint: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Get existing requests for this endpoint
    let timestamps = this.requests.get(endpoint) || [];
    
    // Remove old timestamps
    timestamps = timestamps.filter(time => time > windowStart);
    
    // Check if we're over the limit
    if (timestamps.length >= this.config.maxRequests) {
      return false;
    }
    
    // Add new timestamp
    timestamps.push(now);
    this.requests.set(endpoint, timestamps);
    
    return true;
  }

  public getRemainingRequests(endpoint: string): number {
    const timestamps = this.requests.get(endpoint) || [];
    return Math.max(0, this.config.maxRequests - timestamps.length);
  }
}

export const rateLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60000 // 1 minute
});