import type { OpenClawConfig } from "../config/config.js";
import { type GeminiEmbeddingClient } from "./embeddings-gemini.js";
import { type OpenAiEmbeddingClient } from "./embeddings-openai.js";
import { type VoyageEmbeddingClient } from "./embeddings-voyage.js";
export type { GeminiEmbeddingClient } from "./embeddings-gemini.js";
export type { OpenAiEmbeddingClient } from "./embeddings-openai.js";
export type { VoyageEmbeddingClient } from "./embeddings-voyage.js";
export type EmbeddingProvider = {
    id: string;
    model: string;
    embedQuery: (text: string) => Promise<number[]>;
    embedBatch: (texts: string[]) => Promise<number[][]>;
};
export type EmbeddingProviderResult = {
    provider: EmbeddingProvider;
    requestedProvider: "openai" | "local" | "gemini" | "voyage" | "auto";
    fallbackFrom?: "openai" | "local" | "gemini" | "voyage";
    fallbackReason?: string;
    openAi?: OpenAiEmbeddingClient;
    gemini?: GeminiEmbeddingClient;
    voyage?: VoyageEmbeddingClient;
};
export type EmbeddingProviderOptions = {
    config: OpenClawConfig;
    agentDir?: string;
    provider: "openai" | "local" | "gemini" | "voyage" | "auto";
    remote?: {
        baseUrl?: string;
        apiKey?: string;
        headers?: Record<string, string>;
    };
    model: string;
    fallback: "openai" | "gemini" | "local" | "voyage" | "none";
    local?: {
        modelPath?: string;
        modelCacheDir?: string;
    };
};
export declare function createEmbeddingProvider(options: EmbeddingProviderOptions): Promise<EmbeddingProviderResult>;
