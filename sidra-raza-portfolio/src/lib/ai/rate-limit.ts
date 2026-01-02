import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create rate limiter instance (lazy initialization)
let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  // Return null if Upstash is not configured (for local dev)
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  if (!ratelimit) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 requests per hour
      analytics: true,
      prefix: "sidra-portfolio",
    });
  }

  return ratelimit;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check rate limit for an identifier (usually IP or session)
 */
export async function checkRateLimit(
  identifier: string,
  agentType?: string
): Promise<RateLimitResult> {
  const limiter = getRateLimiter();

  // If Upstash is not configured, allow all requests (local dev)
  if (!limiter) {
    return {
      success: true,
      limit: 999,
      remaining: 999,
      reset: Date.now() + 3600000,
    };
  }

  const key = agentType ? `${agentType}:${identifier}` : identifier;
  const result = await limiter.limit(key);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

/**
 * Get remaining requests for an identifier
 */
export async function getRemainingRequests(
  identifier: string,
  agentType?: string
): Promise<number> {
  const limiter = getRateLimiter();

  if (!limiter) {
    return 999;
  }

  const key = agentType ? `${agentType}:${identifier}` : identifier;
  const result = await limiter.limit(key);

  // We just want to check, not consume, so this is a bit of a workaround
  // In production, you might want to use a separate "check" method
  return result.remaining;
}

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.reset.toString(),
  };
}
