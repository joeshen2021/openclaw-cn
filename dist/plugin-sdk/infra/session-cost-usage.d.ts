import type { OpenClawConfig } from "../config/config.js";
import type { SessionEntry } from "../config/sessions/types.js";
export type CostUsageTotals = {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    totalTokens: number;
    totalCost: number;
    inputCost: number;
    outputCost: number;
    cacheReadCost: number;
    cacheWriteCost: number;
    missingCostEntries: number;
};
export type CostUsageDailyEntry = CostUsageTotals & {
    date: string;
};
export type CostUsageSummary = {
    updatedAt: number;
    days: number;
    daily: CostUsageDailyEntry[];
    totals: CostUsageTotals;
};
export type SessionDailyUsage = {
    date: string;
    tokens: number;
    cost: number;
};
export type SessionDailyMessageCounts = {
    date: string;
    total: number;
    user: number;
    assistant: number;
    toolCalls: number;
    toolResults: number;
    errors: number;
};
export type SessionLatencyStats = {
    count: number;
    avgMs: number;
    p95Ms: number;
    minMs: number;
    maxMs: number;
};
export type SessionDailyLatency = SessionLatencyStats & {
    date: string;
};
export type SessionDailyModelUsage = {
    date: string;
    provider?: string;
    model?: string;
    tokens: number;
    cost: number;
    count: number;
};
export type SessionMessageCounts = {
    total: number;
    user: number;
    assistant: number;
    toolCalls: number;
    toolResults: number;
    errors: number;
};
export type SessionToolUsage = {
    totalCalls: number;
    uniqueTools: number;
    tools: Array<{
        name: string;
        count: number;
    }>;
};
export type SessionModelUsage = {
    provider?: string;
    model?: string;
    count: number;
    totals: CostUsageTotals;
};
export type SessionCostSummary = CostUsageTotals & {
    sessionId?: string;
    sessionFile?: string;
    firstActivity?: number;
    lastActivity?: number;
    durationMs?: number;
    activityDates?: string[];
    dailyBreakdown?: SessionDailyUsage[];
    dailyMessageCounts?: SessionDailyMessageCounts[];
    dailyLatency?: SessionDailyLatency[];
    dailyModelUsage?: SessionDailyModelUsage[];
    messageCounts?: SessionMessageCounts;
    toolUsage?: SessionToolUsage;
    modelUsage?: SessionModelUsage[];
    latency?: SessionLatencyStats;
};
export declare function loadCostUsageSummary(params?: {
    startMs?: number;
    endMs?: number;
    days?: number;
    config?: OpenClawConfig;
    agentId?: string;
}): Promise<CostUsageSummary>;
export type DiscoveredSession = {
    sessionId: string;
    sessionFile: string;
    mtime: number;
    firstUserMessage?: string;
};
/**
 * Scan all transcript files to discover sessions not in the session store.
 * Returns basic metadata for each discovered session.
 */
export declare function discoverAllSessions(params?: {
    agentId?: string;
    startMs?: number;
    endMs?: number;
}): Promise<DiscoveredSession[]>;
export declare function loadSessionCostSummary(params: {
    sessionId?: string;
    sessionEntry?: SessionEntry;
    sessionFile?: string;
    config?: OpenClawConfig;
    startMs?: number;
    endMs?: number;
}): Promise<SessionCostSummary | null>;
export type SessionUsageTimePoint = {
    timestamp: number;
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    totalTokens: number;
    cost: number;
    cumulativeTokens: number;
    cumulativeCost: number;
};
export type SessionUsageTimeSeries = {
    sessionId?: string;
    points: SessionUsageTimePoint[];
};
export declare function loadSessionUsageTimeSeries(params: {
    sessionId?: string;
    sessionEntry?: SessionEntry;
    sessionFile?: string;
    config?: OpenClawConfig;
    maxPoints?: number;
}): Promise<SessionUsageTimeSeries | null>;
export type SessionLogEntry = {
    timestamp: number;
    role: "user" | "assistant" | "tool" | "toolResult";
    content: string;
    tokens?: number;
    cost?: number;
};
export declare function loadSessionLogs(params: {
    sessionId?: string;
    sessionEntry?: SessionEntry;
    sessionFile?: string;
    config?: OpenClawConfig;
    limit?: number;
}): Promise<SessionLogEntry[] | null>;
