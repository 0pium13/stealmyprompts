import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// User limit: 3 requests per 24h
export const userRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "24 h"), // Increased for testing
    analytics: true,
    prefix: "user_v8",
});

// Global kill switch: 95 requests per 24h (safety buffer)
export const globalRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(95, "24 h"),
    analytics: true,
    prefix: "global",
});

// Circuit Breaker Logic
const CIRCUIT_BREAKER_KEY = "circuit_breaker:gemini:v3";
const CIRCUIT_BREAKER_TTL = 60; // 60 seconds

export async function checkCircuitBreaker(): Promise<boolean> {
    const isOpen = await redis.get(CIRCUIT_BREAKER_KEY);
    return !!isOpen;
}

export async function tripCircuitBreaker(): Promise<void> {
    await redis.set(CIRCUIT_BREAKER_KEY, "OPEN", { ex: CIRCUIT_BREAKER_TTL });
    console.log("🔴 Circuit Breaker TRIPPED! Pausing all generations for 60s.");
}

export async function checkRateLimits(userId: string, ip: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
    reason?: string;
}> {
    // 0. Check Circuit Breaker first (Fail Fast)
    const isCircuitOpen = await checkCircuitBreaker();
    if (isCircuitOpen) {
        return { success: false, limit: 0, remaining: 0, reset: 0, reason: "Global API protection active. Please try again in 1 minute." };
    }

    // 1. Check Global Kill Switch
    const globalLimit = await globalRateLimit.limit("global_daily_limit");
    if (!globalLimit.success) {
        return { ...globalLimit, success: false, reason: "Daily app limit reached" };
    }

    // 2. Check User Limit
    const identifier = userId || ip;
    const userLimit = await userRateLimit.limit(identifier);

    if (!userLimit.success) {
        return { ...userLimit, success: false, reason: "Daily limit reached. Come back tomorrow for more generations!" };
    }

    return { ...userLimit, success: true };
}
