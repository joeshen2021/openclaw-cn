import type { OpenClawConfig } from "../config/config.js";
import type { SessionSendPolicyConfig } from "../config/types.base.js";
import type { MemoryBackend, MemoryCitationsMode } from "../config/types.memory.js";
export type ResolvedMemoryBackendConfig = {
    backend: MemoryBackend;
    citations: MemoryCitationsMode;
    qmd?: ResolvedQmdConfig;
};
export type ResolvedQmdCollection = {
    name: string;
    path: string;
    pattern: string;
    kind: "memory" | "custom" | "sessions";
};
export type ResolvedQmdUpdateConfig = {
    intervalMs: number;
    debounceMs: number;
    onBoot: boolean;
    embedIntervalMs: number;
};
export type ResolvedQmdLimitsConfig = {
    maxResults: number;
    maxSnippetChars: number;
    maxInjectedChars: number;
    timeoutMs: number;
};
export type ResolvedQmdSessionConfig = {
    enabled: boolean;
    exportDir?: string;
    retentionDays?: number;
};
export type ResolvedQmdConfig = {
    command: string;
    collections: ResolvedQmdCollection[];
    sessions: ResolvedQmdSessionConfig;
    update: ResolvedQmdUpdateConfig;
    limits: ResolvedQmdLimitsConfig;
    includeDefaultMemory: boolean;
    scope?: SessionSendPolicyConfig;
};
export declare function resolveMemoryBackendConfig(params: {
    cfg: OpenClawConfig;
    agentId: string;
}): ResolvedMemoryBackendConfig;
