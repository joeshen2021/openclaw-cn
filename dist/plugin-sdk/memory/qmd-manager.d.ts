import type { OpenClawConfig } from "../config/config.js";
import type { MemoryEmbeddingProbeResult, MemoryProviderStatus, MemorySearchManager, MemorySearchResult, MemorySyncProgressUpdate } from "./types.js";
import type { ResolvedMemoryBackendConfig } from "./backend-config.js";
export declare class QmdMemoryManager implements MemorySearchManager {
    static create(params: {
        cfg: OpenClawConfig;
        agentId: string;
        resolved: ResolvedMemoryBackendConfig;
    }): Promise<QmdMemoryManager | null>;
    private readonly cfg;
    private readonly agentId;
    private readonly qmd;
    private readonly workspaceDir;
    private readonly stateDir;
    private readonly agentStateDir;
    private readonly qmdDir;
    private readonly xdgConfigHome;
    private readonly xdgCacheHome;
    private readonly indexPath;
    private readonly env;
    private readonly collectionRoots;
    private readonly sources;
    private readonly docPathCache;
    private readonly sessionExporter;
    private updateTimer;
    private pendingUpdate;
    private closed;
    private db;
    private lastUpdateAt;
    private lastEmbedAt;
    private constructor();
    private initialize;
    private bootstrapCollections;
    private ensureCollections;
    search(query: string, opts?: {
        maxResults?: number;
        minScore?: number;
        sessionKey?: string;
    }): Promise<MemorySearchResult[]>;
    sync(params?: {
        reason?: string;
        force?: boolean;
        progress?: (update: MemorySyncProgressUpdate) => void;
    }): Promise<void>;
    readFile(params: {
        relPath: string;
        from?: number;
        lines?: number;
    }): Promise<{
        text: string;
        path: string;
    }>;
    status(): MemoryProviderStatus;
    probeEmbeddingAvailability(): Promise<MemoryEmbeddingProbeResult>;
    probeVectorAvailability(): Promise<boolean>;
    close(): Promise<void>;
    private runUpdate;
    private runQmd;
    private ensureDb;
    private exportSessions;
    private renderSessionMarkdown;
    private pickSessionCollectionName;
    private resolveDocLocation;
    private extractSnippetLines;
    private readCounts;
    private isScopeAllowed;
    private deriveChannelFromKey;
    private deriveChatTypeFromKey;
    private normalizeSessionKey;
    private toDocLocation;
    private buildSearchPath;
    private isInsideWorkspace;
    private resolveReadPath;
    private isWithinWorkspace;
    private isWithinRoot;
    private clampResultsByInjectedChars;
    private shouldSkipUpdate;
}
