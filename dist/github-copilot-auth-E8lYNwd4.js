import { b as __toCommonJS, v as __esmMin, y as __exportAll } from "./paths-7Bb9F26w.js";
import { lt as loadOpenClawPlugins } from "./reply-Cq9qFKEL.js";
import { c as init_session_key, u as normalizeAgentId } from "./session-key-CD-TlcsJ.js";
import { n as init_subsystem, t as createSubsystemLogger } from "./subsystem-D_qnfThk.js";
import { n as listAgentIds, t as init_agent_scope } from "./agent-scope-BKxriAmP.js";
import { A as VENICE_BASE_URL, At as init_agent_paths, C as buildXiaomiProvider, Ct as ensureAuthProfileStore, F as SYNTHETIC_BASE_URL, I as SYNTHETIC_DEFAULT_MODEL_REF, L as SYNTHETIC_MODEL_CATALOG, Lt as DEFAULT_PROVIDER, M as VENICE_MODEL_CATALOG, N as buildVeniceModelDefinition, P as init_venice_models, R as buildSyntheticModelDefinition, Rt as init_defaults, S as buildQianfanProvider, St as upsertAuthProfile, _ as QIANFAN_BASE_URL, a as init_model_selection, c as normalizeProviderId, h as resolveModelRefFromString, it as resolveCloudflareAiGatewayBaseUrl, j as VENICE_DEFAULT_MODEL_REF, jt as resolveOpenClawAgentDir, nt as buildCloudflareAiGatewayModelDefinition, ot as init_auth_profiles, r as buildModelAliasIndex, rt as init_cloudflare_ai_gateway, tt as CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF, v as QIANFAN_DEFAULT_MODEL_ID, w as init_models_config_providers, x as XIAOMI_DEFAULT_MODEL_ID$1, z as init_synthetic_models } from "./model-selection-B4yu6Rbo.js";
import { n as init_command_format, t as formatCliCommand } from "./command-format-D7BB3K65.js";
import { c as writeConfigFile, o as readConfigFileSnapshot } from "./config-DBTnQ5MG.js";
import { r as isWSLEnv } from "./dispatcher-Dfaxw239.js";
import { r as stylePromptTitle } from "./prompt-style-BW5RIhxO.js";
import { n as logConfigUpdated } from "./logging-BMKH8Cp-.js";
import { intro, note, outro, spinner } from "@clack/prompts";

//#region src/commands/auth-token.ts
init_model_selection();
const ANTHROPIC_SETUP_TOKEN_PREFIX = "sk-ant-oat01-";
const ANTHROPIC_SETUP_TOKEN_MIN_LENGTH = 80;
const DEFAULT_TOKEN_PROFILE_NAME = "default";
function normalizeTokenProfileName(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return DEFAULT_TOKEN_PROFILE_NAME;
	return trimmed.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "") || DEFAULT_TOKEN_PROFILE_NAME;
}
function buildTokenProfileId(params) {
	return `${normalizeProviderId(params.provider)}:${normalizeTokenProfileName(params.name)}`;
}
function validateAnthropicSetupToken(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return "Required";
	if (!trimmed.startsWith(ANTHROPIC_SETUP_TOKEN_PREFIX)) return `Expected token starting with ${ANTHROPIC_SETUP_TOKEN_PREFIX}`;
	if (trimmed.length < ANTHROPIC_SETUP_TOKEN_MIN_LENGTH) return "Token looks too short; paste the full setup-token";
}

//#endregion
//#region src/commands/onboard-auth.models.ts
var onboard_auth_models_exports = /* @__PURE__ */ __exportAll({
	DASHSCOPE_BASE_URL: () => DASHSCOPE_BASE_URL,
	DASHSCOPE_DEFAULT_CONTEXT_WINDOW: () => DASHSCOPE_DEFAULT_CONTEXT_WINDOW,
	DASHSCOPE_DEFAULT_COST: () => DASHSCOPE_DEFAULT_COST,
	DASHSCOPE_DEFAULT_MAX_TOKENS: () => DASHSCOPE_DEFAULT_MAX_TOKENS,
	DASHSCOPE_DEFAULT_MODEL_ID: () => DASHSCOPE_DEFAULT_MODEL_ID,
	DASHSCOPE_DEFAULT_MODEL_REF: () => DASHSCOPE_DEFAULT_MODEL_REF,
	DEEPSEEK_BASE_URL: () => DEEPSEEK_BASE_URL,
	DEEPSEEK_DEFAULT_CONTEXT_WINDOW: () => DEEPSEEK_DEFAULT_CONTEXT_WINDOW,
	DEEPSEEK_DEFAULT_COST: () => DEEPSEEK_DEFAULT_COST,
	DEEPSEEK_DEFAULT_MAX_TOKENS: () => DEEPSEEK_DEFAULT_MAX_TOKENS,
	DEEPSEEK_DEFAULT_MODEL_ID: () => DEEPSEEK_DEFAULT_MODEL_ID,
	DEEPSEEK_DEFAULT_MODEL_REF: () => DEEPSEEK_DEFAULT_MODEL_REF,
	DEFAULT_MINIMAX_BASE_URL: () => DEFAULT_MINIMAX_BASE_URL,
	DEFAULT_MINIMAX_CONTEXT_WINDOW: () => DEFAULT_MINIMAX_CONTEXT_WINDOW,
	DEFAULT_MINIMAX_MAX_TOKENS: () => DEFAULT_MINIMAX_MAX_TOKENS,
	KIMI_CODE_BASE_URL: () => KIMI_CODE_BASE_URL,
	KIMI_CODE_COMPAT: () => KIMI_CODE_COMPAT,
	KIMI_CODE_CONTEXT_WINDOW: () => KIMI_CODE_CONTEXT_WINDOW,
	KIMI_CODE_DEFAULT_COST: () => KIMI_CODE_DEFAULT_COST,
	KIMI_CODE_HEADERS: () => KIMI_CODE_HEADERS,
	KIMI_CODE_MAX_TOKENS: () => KIMI_CODE_MAX_TOKENS,
	KIMI_CODE_MODEL_ID: () => KIMI_CODE_MODEL_ID,
	KIMI_CODE_MODEL_REF: () => KIMI_CODE_MODEL_REF,
	KIMI_CODING_MODEL_ID: () => KIMI_CODING_MODEL_ID,
	KIMI_CODING_MODEL_REF: () => KIMI_CODING_MODEL_REF,
	MINIMAX_API_BASE_URL: () => MINIMAX_API_BASE_URL,
	MINIMAX_API_COST: () => MINIMAX_API_COST,
	MINIMAX_HOSTED_COST: () => MINIMAX_HOSTED_COST,
	MINIMAX_HOSTED_MODEL_ID: () => MINIMAX_HOSTED_MODEL_ID,
	MINIMAX_HOSTED_MODEL_REF: () => MINIMAX_HOSTED_MODEL_REF,
	MINIMAX_LM_STUDIO_COST: () => MINIMAX_LM_STUDIO_COST,
	MOONSHOT_BASE_URL: () => MOONSHOT_BASE_URL,
	MOONSHOT_CN_BASE_URL: () => MOONSHOT_CN_BASE_URL,
	MOONSHOT_DEFAULT_CONTEXT_WINDOW: () => MOONSHOT_DEFAULT_CONTEXT_WINDOW,
	MOONSHOT_DEFAULT_COST: () => MOONSHOT_DEFAULT_COST,
	MOONSHOT_DEFAULT_MAX_TOKENS: () => MOONSHOT_DEFAULT_MAX_TOKENS,
	MOONSHOT_DEFAULT_MODEL_ID: () => MOONSHOT_DEFAULT_MODEL_ID,
	MOONSHOT_DEFAULT_MODEL_REF: () => MOONSHOT_DEFAULT_MODEL_REF,
	QIANFAN_BASE_URL: () => QIANFAN_BASE_URL,
	QIANFAN_DEFAULT_MODEL_ID: () => QIANFAN_DEFAULT_MODEL_ID,
	QIANFAN_DEFAULT_MODEL_REF: () => QIANFAN_DEFAULT_MODEL_REF,
	SILICONFLOW_BASE_URL: () => SILICONFLOW_BASE_URL,
	SILICONFLOW_DEFAULT_CONTEXT_WINDOW: () => SILICONFLOW_DEFAULT_CONTEXT_WINDOW,
	SILICONFLOW_DEFAULT_COST: () => SILICONFLOW_DEFAULT_COST,
	SILICONFLOW_DEFAULT_MAX_TOKENS: () => SILICONFLOW_DEFAULT_MAX_TOKENS,
	SILICONFLOW_DEFAULT_MODEL_ID: () => SILICONFLOW_DEFAULT_MODEL_ID,
	SILICONFLOW_DEFAULT_MODEL_REF: () => SILICONFLOW_DEFAULT_MODEL_REF,
	VOLCENGINE_BASE_URL: () => VOLCENGINE_BASE_URL,
	VOLCENGINE_DEFAULT_CONTEXT_WINDOW: () => VOLCENGINE_DEFAULT_CONTEXT_WINDOW,
	VOLCENGINE_DEFAULT_COST: () => VOLCENGINE_DEFAULT_COST,
	VOLCENGINE_DEFAULT_MAX_TOKENS: () => VOLCENGINE_DEFAULT_MAX_TOKENS,
	VOLCENGINE_DEFAULT_MODEL_ID: () => VOLCENGINE_DEFAULT_MODEL_ID,
	VOLCENGINE_DEFAULT_MODEL_REF: () => VOLCENGINE_DEFAULT_MODEL_REF,
	XAI_BASE_URL: () => XAI_BASE_URL,
	XAI_DEFAULT_CONTEXT_WINDOW: () => XAI_DEFAULT_CONTEXT_WINDOW,
	XAI_DEFAULT_COST: () => XAI_DEFAULT_COST,
	XAI_DEFAULT_MAX_TOKENS: () => XAI_DEFAULT_MAX_TOKENS,
	XAI_DEFAULT_MODEL_ID: () => XAI_DEFAULT_MODEL_ID,
	XAI_DEFAULT_MODEL_REF: () => XAI_DEFAULT_MODEL_REF,
	XIAOMI_API_BASE_URL: () => XIAOMI_API_BASE_URL,
	XIAOMI_DEFAULT_CONTEXT_WINDOW: () => XIAOMI_DEFAULT_CONTEXT_WINDOW,
	XIAOMI_DEFAULT_COST: () => XIAOMI_DEFAULT_COST,
	XIAOMI_DEFAULT_MAX_TOKENS: () => XIAOMI_DEFAULT_MAX_TOKENS,
	XIAOMI_DEFAULT_MODEL_ID: () => XIAOMI_DEFAULT_MODEL_ID,
	XIAOMI_DEFAULT_MODEL_REF: () => XIAOMI_DEFAULT_MODEL_REF$1,
	buildDashscopeModelDefinition: () => buildDashscopeModelDefinition,
	buildDeepseekModelDefinition: () => buildDeepseekModelDefinition,
	buildKimiCodeModelDefinition: () => buildKimiCodeModelDefinition,
	buildMinimaxApiModelDefinition: () => buildMinimaxApiModelDefinition,
	buildMinimaxModelDefinition: () => buildMinimaxModelDefinition,
	buildMoonshotModelDefinition: () => buildMoonshotModelDefinition,
	buildSiliconflowModelDefinition: () => buildSiliconflowModelDefinition,
	buildVolcengineModelDefinition: () => buildVolcengineModelDefinition,
	buildXaiModelDefinition: () => buildXaiModelDefinition,
	buildXiaomiModelDefinition: () => buildXiaomiModelDefinition
});
function buildMinimaxModelDefinition(params) {
	const catalog = MINIMAX_MODEL_CATALOG[params.id];
	return {
		id: params.id,
		name: params.name ?? catalog?.name ?? `MiniMax ${params.id}`,
		reasoning: params.reasoning ?? catalog?.reasoning ?? false,
		input: ["text"],
		cost: params.cost,
		contextWindow: params.contextWindow,
		maxTokens: params.maxTokens
	};
}
function buildMinimaxApiModelDefinition(modelId) {
	return buildMinimaxModelDefinition({
		id: modelId,
		cost: MINIMAX_API_COST,
		contextWindow: DEFAULT_MINIMAX_CONTEXT_WINDOW,
		maxTokens: DEFAULT_MINIMAX_MAX_TOKENS
	});
}
function buildMoonshotModelDefinition() {
	return {
		id: MOONSHOT_DEFAULT_MODEL_ID,
		name: "Kimi K2.5",
		reasoning: false,
		input: ["text"],
		cost: MOONSHOT_DEFAULT_COST,
		contextWindow: MOONSHOT_DEFAULT_CONTEXT_WINDOW,
		maxTokens: MOONSHOT_DEFAULT_MAX_TOKENS
	};
}
function buildXaiModelDefinition() {
	return {
		id: XAI_DEFAULT_MODEL_ID,
		name: "Grok 4",
		reasoning: false,
		input: ["text"],
		cost: XAI_DEFAULT_COST,
		contextWindow: XAI_DEFAULT_CONTEXT_WINDOW,
		maxTokens: XAI_DEFAULT_MAX_TOKENS
	};
}
function buildSiliconflowModelDefinition() {
	return {
		id: SILICONFLOW_DEFAULT_MODEL_ID,
		name: "SiliconFlow Auto",
		reasoning: false,
		input: ["text"],
		cost: SILICONFLOW_DEFAULT_COST,
		contextWindow: SILICONFLOW_DEFAULT_CONTEXT_WINDOW,
		maxTokens: SILICONFLOW_DEFAULT_MAX_TOKENS
	};
}
function buildDashscopeModelDefinition() {
	return {
		id: DASHSCOPE_DEFAULT_MODEL_ID,
		name: "Qwen Plus",
		reasoning: false,
		input: ["text"],
		cost: DASHSCOPE_DEFAULT_COST,
		contextWindow: DASHSCOPE_DEFAULT_CONTEXT_WINDOW,
		maxTokens: DASHSCOPE_DEFAULT_MAX_TOKENS
	};
}
function buildDeepseekModelDefinition() {
	return {
		id: DEEPSEEK_DEFAULT_MODEL_ID,
		name: "DeepSeek Chat",
		reasoning: false,
		input: ["text"],
		cost: DEEPSEEK_DEFAULT_COST,
		contextWindow: DEEPSEEK_DEFAULT_CONTEXT_WINDOW,
		maxTokens: DEEPSEEK_DEFAULT_MAX_TOKENS
	};
}
function buildKimiCodeModelDefinition() {
	return {
		id: KIMI_CODE_MODEL_ID,
		name: "Kimi For Coding",
		reasoning: true,
		input: ["text"],
		cost: KIMI_CODE_DEFAULT_COST,
		contextWindow: KIMI_CODE_CONTEXT_WINDOW,
		maxTokens: KIMI_CODE_MAX_TOKENS,
		headers: KIMI_CODE_HEADERS,
		compat: KIMI_CODE_COMPAT
	};
}
function buildVolcengineModelDefinition() {
	return {
		id: VOLCENGINE_DEFAULT_MODEL_ID,
		name: "Volcengine ARK",
		reasoning: false,
		input: ["text"],
		cost: VOLCENGINE_DEFAULT_COST,
		contextWindow: VOLCENGINE_DEFAULT_CONTEXT_WINDOW,
		maxTokens: VOLCENGINE_DEFAULT_MAX_TOKENS
	};
}
function buildXiaomiModelDefinition() {
	return {
		id: XIAOMI_DEFAULT_MODEL_ID,
		name: "Xiaomi Mimo V2 Flash",
		reasoning: false,
		input: ["text"],
		cost: XIAOMI_DEFAULT_COST,
		contextWindow: XIAOMI_DEFAULT_CONTEXT_WINDOW,
		maxTokens: XIAOMI_DEFAULT_MAX_TOKENS
	};
}
var DEFAULT_MINIMAX_BASE_URL, MINIMAX_API_BASE_URL, MINIMAX_HOSTED_MODEL_ID, MINIMAX_HOSTED_MODEL_REF, DEFAULT_MINIMAX_CONTEXT_WINDOW, DEFAULT_MINIMAX_MAX_TOKENS, MOONSHOT_BASE_URL, MOONSHOT_CN_BASE_URL, MOONSHOT_DEFAULT_MODEL_ID, MOONSHOT_DEFAULT_MODEL_REF, MOONSHOT_DEFAULT_CONTEXT_WINDOW, MOONSHOT_DEFAULT_MAX_TOKENS, KIMI_CODING_MODEL_ID, KIMI_CODING_MODEL_REF, QIANFAN_DEFAULT_MODEL_REF, MINIMAX_API_COST, MINIMAX_HOSTED_COST, MINIMAX_LM_STUDIO_COST, MOONSHOT_DEFAULT_COST, MINIMAX_MODEL_CATALOG, XAI_BASE_URL, XAI_DEFAULT_MODEL_ID, XAI_DEFAULT_MODEL_REF, XAI_DEFAULT_CONTEXT_WINDOW, XAI_DEFAULT_MAX_TOKENS, XAI_DEFAULT_COST, SILICONFLOW_BASE_URL, SILICONFLOW_DEFAULT_MODEL_ID, SILICONFLOW_DEFAULT_MODEL_REF, SILICONFLOW_DEFAULT_CONTEXT_WINDOW, SILICONFLOW_DEFAULT_MAX_TOKENS, SILICONFLOW_DEFAULT_COST, DASHSCOPE_BASE_URL, DASHSCOPE_DEFAULT_MODEL_ID, DASHSCOPE_DEFAULT_MODEL_REF, DASHSCOPE_DEFAULT_CONTEXT_WINDOW, DASHSCOPE_DEFAULT_MAX_TOKENS, DASHSCOPE_DEFAULT_COST, DEEPSEEK_BASE_URL, DEEPSEEK_DEFAULT_MODEL_ID, DEEPSEEK_DEFAULT_MODEL_REF, DEEPSEEK_DEFAULT_CONTEXT_WINDOW, DEEPSEEK_DEFAULT_MAX_TOKENS, DEEPSEEK_DEFAULT_COST, KIMI_CODE_BASE_URL, KIMI_CODE_MODEL_ID, KIMI_CODE_MODEL_REF, KIMI_CODE_CONTEXT_WINDOW, KIMI_CODE_MAX_TOKENS, KIMI_CODE_HEADERS, KIMI_CODE_COMPAT, KIMI_CODE_DEFAULT_COST, VOLCENGINE_BASE_URL, VOLCENGINE_DEFAULT_MODEL_ID, VOLCENGINE_DEFAULT_MODEL_REF, VOLCENGINE_DEFAULT_CONTEXT_WINDOW, VOLCENGINE_DEFAULT_MAX_TOKENS, VOLCENGINE_DEFAULT_COST, XIAOMI_API_BASE_URL, XIAOMI_DEFAULT_MODEL_ID, XIAOMI_DEFAULT_MODEL_REF$1, XIAOMI_DEFAULT_CONTEXT_WINDOW, XIAOMI_DEFAULT_MAX_TOKENS, XIAOMI_DEFAULT_COST;
var init_onboard_auth_models = __esmMin((() => {
	init_models_config_providers();
	DEFAULT_MINIMAX_BASE_URL = "https://api.minimax.io/v1";
	MINIMAX_API_BASE_URL = "https://api.minimax.io/anthropic";
	MINIMAX_HOSTED_MODEL_ID = "MiniMax-M2.1";
	MINIMAX_HOSTED_MODEL_REF = `minimax/${MINIMAX_HOSTED_MODEL_ID}`;
	DEFAULT_MINIMAX_CONTEXT_WINDOW = 2e5;
	DEFAULT_MINIMAX_MAX_TOKENS = 8192;
	MOONSHOT_BASE_URL = "https://api.moonshot.ai/v1";
	MOONSHOT_CN_BASE_URL = "https://api.moonshot.cn/v1";
	MOONSHOT_DEFAULT_MODEL_ID = "kimi-k2.5";
	MOONSHOT_DEFAULT_MODEL_REF = `moonshot/${MOONSHOT_DEFAULT_MODEL_ID}`;
	MOONSHOT_DEFAULT_CONTEXT_WINDOW = 256e3;
	MOONSHOT_DEFAULT_MAX_TOKENS = 8192;
	KIMI_CODING_MODEL_ID = "k2p5";
	KIMI_CODING_MODEL_REF = `kimi-coding/${KIMI_CODING_MODEL_ID}`;
	QIANFAN_DEFAULT_MODEL_REF = `qianfan/${QIANFAN_DEFAULT_MODEL_ID}`;
	MINIMAX_API_COST = {
		input: 15,
		output: 60,
		cacheRead: 2,
		cacheWrite: 10
	};
	MINIMAX_HOSTED_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	MINIMAX_LM_STUDIO_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	MOONSHOT_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	MINIMAX_MODEL_CATALOG = {
		"MiniMax-M2.1": {
			name: "MiniMax M2.1",
			reasoning: false
		},
		"MiniMax-M2.1-lightning": {
			name: "MiniMax M2.1 Lightning",
			reasoning: false
		}
	};
	XAI_BASE_URL = "https://api.x.ai/v1";
	XAI_DEFAULT_MODEL_ID = "grok-4";
	XAI_DEFAULT_MODEL_REF = `xai/${XAI_DEFAULT_MODEL_ID}`;
	XAI_DEFAULT_CONTEXT_WINDOW = 131072;
	XAI_DEFAULT_MAX_TOKENS = 8192;
	XAI_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	SILICONFLOW_BASE_URL = "https://api.siliconflow.cn/v1";
	SILICONFLOW_DEFAULT_MODEL_ID = "Qwen/Qwen2.5-32B-Instruct";
	SILICONFLOW_DEFAULT_MODEL_REF = `siliconflow/${SILICONFLOW_DEFAULT_MODEL_ID}`;
	SILICONFLOW_DEFAULT_CONTEXT_WINDOW = 128e3;
	SILICONFLOW_DEFAULT_MAX_TOKENS = 8192;
	SILICONFLOW_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	DASHSCOPE_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
	DASHSCOPE_DEFAULT_MODEL_ID = "qwen-plus";
	DASHSCOPE_DEFAULT_MODEL_REF = `dashscope/${DASHSCOPE_DEFAULT_MODEL_ID}`;
	DASHSCOPE_DEFAULT_CONTEXT_WINDOW = 128e3;
	DASHSCOPE_DEFAULT_MAX_TOKENS = 8192;
	DASHSCOPE_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	DEEPSEEK_BASE_URL = "https://api.deepseek.com/v1";
	DEEPSEEK_DEFAULT_MODEL_ID = "deepseek-chat";
	DEEPSEEK_DEFAULT_MODEL_REF = `deepseek/${DEEPSEEK_DEFAULT_MODEL_ID}`;
	DEEPSEEK_DEFAULT_CONTEXT_WINDOW = 128e3;
	DEEPSEEK_DEFAULT_MAX_TOKENS = 8192;
	DEEPSEEK_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	KIMI_CODE_BASE_URL = "https://api.kimi.com/coding/v1";
	KIMI_CODE_MODEL_ID = "kimi-for-coding";
	KIMI_CODE_MODEL_REF = `kimi-code/${KIMI_CODE_MODEL_ID}`;
	KIMI_CODE_CONTEXT_WINDOW = 262144;
	KIMI_CODE_MAX_TOKENS = 32768;
	KIMI_CODE_HEADERS = { "User-Agent": "KimiCLI/0.77" };
	KIMI_CODE_COMPAT = { supportsDeveloperRole: false };
	KIMI_CODE_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	VOLCENGINE_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3";
	VOLCENGINE_DEFAULT_MODEL_ID = "ep-20241230155555-xxxxx";
	VOLCENGINE_DEFAULT_MODEL_REF = `volcengine/${VOLCENGINE_DEFAULT_MODEL_ID}`;
	VOLCENGINE_DEFAULT_CONTEXT_WINDOW = 128e3;
	VOLCENGINE_DEFAULT_MAX_TOKENS = 8192;
	VOLCENGINE_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
	XIAOMI_API_BASE_URL = "https://api.xiaomimimo.com/v1";
	XIAOMI_DEFAULT_MODEL_ID = "mimo-v2-flash";
	XIAOMI_DEFAULT_MODEL_REF$1 = `xiaomi/${XIAOMI_DEFAULT_MODEL_ID}`;
	XIAOMI_DEFAULT_CONTEXT_WINDOW = 262144;
	XIAOMI_DEFAULT_MAX_TOKENS = 8192;
	XIAOMI_DEFAULT_COST = {
		input: 0,
		output: 0,
		cacheRead: 0,
		cacheWrite: 0
	};
}));

//#endregion
//#region src/commands/onboard-auth.credentials.ts
init_agent_paths();
init_auth_profiles();
init_cloudflare_ai_gateway();
init_onboard_auth_models();
const resolveAuthAgentDir = (agentDir) => agentDir ?? resolveOpenClawAgentDir();
async function writeOAuthCredentials(provider, creds, agentDir) {
	upsertAuthProfile({
		profileId: `${provider}:${typeof creds.email === "string" && creds.email.trim() ? creds.email.trim() : "default"}`,
		credential: {
			type: "oauth",
			provider,
			...creds
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setAnthropicApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "anthropic:default",
		credential: {
			type: "api_key",
			provider: "anthropic",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setGeminiApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "google:default",
		credential: {
			type: "api_key",
			provider: "google",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setMinimaxApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "minimax:default",
		credential: {
			type: "api_key",
			provider: "minimax",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setMoonshotApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "moonshot:default",
		credential: {
			type: "api_key",
			provider: "moonshot",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setKimiCodingApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "kimi-coding:default",
		credential: {
			type: "api_key",
			provider: "kimi-coding",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setSyntheticApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "synthetic:default",
		credential: {
			type: "api_key",
			provider: "synthetic",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setVeniceApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "venice:default",
		credential: {
			type: "api_key",
			provider: "venice",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
const ZAI_DEFAULT_MODEL_REF = "zai/glm-4.7";
const XIAOMI_DEFAULT_MODEL_REF = "xiaomi/mimo-v2-flash";
const OPENROUTER_DEFAULT_MODEL_REF = "openrouter/auto";
const VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF = "vercel-ai-gateway/anthropic/claude-opus-4.6";
async function setZaiApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "zai:default",
		credential: {
			type: "api_key",
			provider: "zai",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setXiaomiApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "xiaomi:default",
		credential: {
			type: "api_key",
			provider: "xiaomi",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setSiliconflowApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "siliconflow:default",
		credential: {
			type: "api_key",
			provider: "siliconflow",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setDashscopeApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "dashscope:default",
		credential: {
			type: "api_key",
			provider: "dashscope",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setDeepseekApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "deepseek:default",
		credential: {
			type: "api_key",
			provider: "deepseek",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setVolcengineApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "volcengine:default",
		credential: {
			type: "api_key",
			provider: "volcengine",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setOpenrouterApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "openrouter:default",
		credential: {
			type: "api_key",
			provider: "openrouter",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setCloudflareAiGatewayConfig(accountId, gatewayId, apiKey, agentDir) {
	const normalizedAccountId = accountId.trim();
	const normalizedGatewayId = gatewayId.trim();
	upsertAuthProfile({
		profileId: "cloudflare-ai-gateway:default",
		credential: {
			type: "api_key",
			provider: "cloudflare-ai-gateway",
			key: apiKey.trim(),
			metadata: {
				accountId: normalizedAccountId,
				gatewayId: normalizedGatewayId
			}
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setVercelAiGatewayApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "vercel-ai-gateway:default",
		credential: {
			type: "api_key",
			provider: "vercel-ai-gateway",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
async function setOpencodeZenApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "opencode:default",
		credential: {
			type: "api_key",
			provider: "opencode",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
function setQianfanApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "qianfan:default",
		credential: {
			type: "api_key",
			provider: "qianfan",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}
function setXaiApiKey(key, agentDir) {
	upsertAuthProfile({
		profileId: "xai:default",
		credential: {
			type: "api_key",
			provider: "xai",
			key
		},
		agentDir: resolveAuthAgentDir(agentDir)
	});
}

//#endregion
//#region src/commands/onboard-auth.config-core.ts
init_cloudflare_ai_gateway();
init_models_config_providers();
init_synthetic_models();
init_venice_models();
init_onboard_auth_models();
function applyZaiConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[ZAI_DEFAULT_MODEL_REF] = {
		...models[ZAI_DEFAULT_MODEL_REF],
		alias: models[ZAI_DEFAULT_MODEL_REF]?.alias ?? "GLM"
	};
	const existingModel = cfg.agents?.defaults?.model;
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: ZAI_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyOpenrouterProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[OPENROUTER_DEFAULT_MODEL_REF] = {
		...models[OPENROUTER_DEFAULT_MODEL_REF],
		alias: models[OPENROUTER_DEFAULT_MODEL_REF]?.alias ?? "OpenRouter"
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		}
	};
}
function applyVercelAiGatewayProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF] = {
		...models[VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF],
		alias: models[VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF]?.alias ?? "Vercel AI Gateway"
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		}
	};
}
function applyCloudflareAiGatewayProviderConfig(cfg, params) {
	const models = { ...cfg.agents?.defaults?.models };
	models[CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF] = {
		...models[CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF],
		alias: models[CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF]?.alias ?? "Cloudflare AI Gateway"
	};
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers["cloudflare-ai-gateway"];
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModel = buildCloudflareAiGatewayModelDefinition();
	const mergedModels = existingModels.some((model) => model.id === defaultModel.id) ? existingModels : [...existingModels, defaultModel];
	const baseUrl = params?.accountId && params?.gatewayId ? resolveCloudflareAiGatewayBaseUrl({
		accountId: params.accountId,
		gatewayId: params.gatewayId
	}) : existingProvider?.baseUrl;
	if (!baseUrl) return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		}
	};
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers["cloudflare-ai-gateway"] = {
		...existingProviderRest,
		baseUrl,
		api: "anthropic-messages",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : [defaultModel]
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyVercelAiGatewayConfig(cfg) {
	const next = applyVercelAiGatewayProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyCloudflareAiGatewayConfig(cfg, params) {
	const next = applyCloudflareAiGatewayProviderConfig(cfg, params);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyOpenrouterConfig(cfg) {
	const next = applyOpenrouterProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: OPENROUTER_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyMoonshotProviderConfig(cfg) {
	return applyMoonshotProviderConfigWithBaseUrl(cfg, MOONSHOT_BASE_URL);
}
function applyMoonshotProviderConfigCn(cfg) {
	return applyMoonshotProviderConfigWithBaseUrl(cfg, MOONSHOT_CN_BASE_URL);
}
function applyMoonshotProviderConfigWithBaseUrl(cfg, baseUrl) {
	const models = { ...cfg.agents?.defaults?.models };
	models[MOONSHOT_DEFAULT_MODEL_REF] = {
		...models[MOONSHOT_DEFAULT_MODEL_REF],
		alias: models[MOONSHOT_DEFAULT_MODEL_REF]?.alias ?? "Kimi"
	};
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.moonshot;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModel = buildMoonshotModelDefinition();
	const mergedModels = existingModels.some((model) => model.id === MOONSHOT_DEFAULT_MODEL_ID) ? existingModels : [...existingModels, defaultModel];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.moonshot = {
		...existingProviderRest,
		baseUrl,
		api: "openai-completions",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : [defaultModel]
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyMoonshotConfig(cfg) {
	const next = applyMoonshotProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: MOONSHOT_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyMoonshotConfigCn(cfg) {
	const next = applyMoonshotProviderConfigCn(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: MOONSHOT_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyKimiCodeProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[KIMI_CODING_MODEL_REF] = {
		...models[KIMI_CODING_MODEL_REF],
		alias: models[KIMI_CODING_MODEL_REF]?.alias ?? "Kimi K2.5"
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		}
	};
}
function applyKimiCodeConfig(cfg) {
	const next = applyKimiCodeProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: KIMI_CODING_MODEL_REF
				}
			}
		}
	};
}
function applySyntheticProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[SYNTHETIC_DEFAULT_MODEL_REF] = {
		...models[SYNTHETIC_DEFAULT_MODEL_REF],
		alias: models[SYNTHETIC_DEFAULT_MODEL_REF]?.alias ?? "MiniMax M2.1"
	};
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.synthetic;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const syntheticModels = SYNTHETIC_MODEL_CATALOG.map(buildSyntheticModelDefinition);
	const mergedModels = [...existingModels, ...syntheticModels.filter((model) => !existingModels.some((existing) => existing.id === model.id))];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.synthetic = {
		...existingProviderRest,
		baseUrl: SYNTHETIC_BASE_URL,
		api: "anthropic-messages",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : syntheticModels
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applySyntheticConfig(cfg) {
	const next = applySyntheticProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: SYNTHETIC_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyXiaomiProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[XIAOMI_DEFAULT_MODEL_REF] = {
		...models[XIAOMI_DEFAULT_MODEL_REF],
		alias: models[XIAOMI_DEFAULT_MODEL_REF]?.alias ?? "Xiaomi"
	};
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.xiaomi;
	const defaultProvider = buildXiaomiProvider();
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModels = defaultProvider.models ?? [];
	const hasDefaultModel = existingModels.some((model) => model.id === XIAOMI_DEFAULT_MODEL_ID$1);
	const mergedModels = existingModels.length > 0 ? hasDefaultModel ? existingModels : [...existingModels, ...defaultModels] : defaultModels;
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.xiaomi = {
		...existingProviderRest,
		baseUrl: defaultProvider.baseUrl,
		api: defaultProvider.api,
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : defaultProvider.models
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyXiaomiConfig(cfg) {
	const next = applyXiaomiProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: XIAOMI_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
/**
* Apply Venice provider configuration without changing the default model.
* Registers Venice models and sets up the provider, but preserves existing model selection.
*/
function applyVeniceProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[VENICE_DEFAULT_MODEL_REF] = {
		...models[VENICE_DEFAULT_MODEL_REF],
		alias: models[VENICE_DEFAULT_MODEL_REF]?.alias ?? "Llama 3.3 70B"
	};
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.venice;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const veniceModels = VENICE_MODEL_CATALOG.map(buildVeniceModelDefinition);
	const mergedModels = [...existingModels, ...veniceModels.filter((model) => !existingModels.some((existing) => existing.id === model.id))];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.venice = {
		...existingProviderRest,
		baseUrl: VENICE_BASE_URL,
		api: "openai-completions",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : veniceModels
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
/**
* Apply Venice provider configuration AND set Venice as the default model.
* Use this when Venice is the primary provider choice during onboarding.
*/
function applyVeniceConfig(cfg) {
	const next = applyVeniceProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: VENICE_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applyXaiProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[XAI_DEFAULT_MODEL_REF] = {
		...models[XAI_DEFAULT_MODEL_REF],
		alias: models[XAI_DEFAULT_MODEL_REF]?.alias ?? "Grok"
	};
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.xai;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModel = buildXaiModelDefinition();
	const mergedModels = existingModels.some((model) => model.id === XAI_DEFAULT_MODEL_ID) ? existingModels : [...existingModels, defaultModel];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.xai = {
		...existingProviderRest,
		baseUrl: XAI_BASE_URL,
		api: "openai-completions",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : [defaultModel]
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyXaiConfig(cfg) {
	const next = applyXaiProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: XAI_DEFAULT_MODEL_REF
				}
			}
		}
	};
}
function applySiliconflowProviderConfig(cfg) {
	const { SILICONFLOW_BASE_URL, SILICONFLOW_DEFAULT_MODEL_ID, SILICONFLOW_DEFAULT_CONTEXT_WINDOW, SILICONFLOW_DEFAULT_MAX_TOKENS, SILICONFLOW_DEFAULT_COST } = (init_onboard_auth_models(), __toCommonJS(onboard_auth_models_exports));
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.siliconflow;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModel = {
		id: SILICONFLOW_DEFAULT_MODEL_ID,
		name: "SiliconFlow Auto",
		reasoning: false,
		input: ["text"],
		cost: SILICONFLOW_DEFAULT_COST,
		contextWindow: SILICONFLOW_DEFAULT_CONTEXT_WINDOW,
		maxTokens: SILICONFLOW_DEFAULT_MAX_TOKENS
	};
	const mergedModels = existingModels.some((model) => model.id === SILICONFLOW_DEFAULT_MODEL_ID) ? existingModels : [...existingModels, defaultModel];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.siliconflow = {
		...existingProviderRest,
		baseUrl: SILICONFLOW_BASE_URL,
		api: "openai-completions",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : [defaultModel]
	};
	return {
		...cfg,
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applySiliconflowConfig(cfg, modelId) {
	const { SILICONFLOW_DEFAULT_MODEL_ID } = (init_onboard_auth_models(), __toCommonJS(onboard_auth_models_exports));
	const next = applySiliconflowProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	const finalModelId = modelId ?? SILICONFLOW_DEFAULT_MODEL_ID;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: `siliconflow/${finalModelId}`
				}
			}
		}
	};
}
function applyDashscopeProviderConfig(cfg) {
	const { DASHSCOPE_BASE_URL, DASHSCOPE_DEFAULT_MODEL_ID, DASHSCOPE_DEFAULT_CONTEXT_WINDOW, DASHSCOPE_DEFAULT_MAX_TOKENS, DASHSCOPE_DEFAULT_COST } = (init_onboard_auth_models(), __toCommonJS(onboard_auth_models_exports));
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.dashscope;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModel = {
		id: DASHSCOPE_DEFAULT_MODEL_ID,
		name: "Qwen Plus",
		reasoning: false,
		input: ["text"],
		cost: DASHSCOPE_DEFAULT_COST,
		contextWindow: DASHSCOPE_DEFAULT_CONTEXT_WINDOW,
		maxTokens: DASHSCOPE_DEFAULT_MAX_TOKENS
	};
	const mergedModels = existingModels.some((model) => model.id === DASHSCOPE_DEFAULT_MODEL_ID) ? existingModels : [...existingModels, defaultModel];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.dashscope = {
		...existingProviderRest,
		baseUrl: DASHSCOPE_BASE_URL,
		api: "openai-completions",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : [defaultModel]
	};
	return {
		...cfg,
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyDashscopeConfig(cfg, modelId) {
	const { DASHSCOPE_DEFAULT_MODEL_ID } = (init_onboard_auth_models(), __toCommonJS(onboard_auth_models_exports));
	const next = applyDashscopeProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	const finalModelId = modelId ?? DASHSCOPE_DEFAULT_MODEL_ID;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: `dashscope/${finalModelId}`
				}
			}
		}
	};
}
function applyDeepseekProviderConfig(cfg) {
	const { DEEPSEEK_BASE_URL, DEEPSEEK_DEFAULT_MODEL_ID, DEEPSEEK_DEFAULT_CONTEXT_WINDOW, DEEPSEEK_DEFAULT_MAX_TOKENS, DEEPSEEK_DEFAULT_COST } = (init_onboard_auth_models(), __toCommonJS(onboard_auth_models_exports));
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.deepseek;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModel = {
		id: DEEPSEEK_DEFAULT_MODEL_ID,
		name: "DeepSeek Chat",
		reasoning: false,
		input: ["text"],
		cost: DEEPSEEK_DEFAULT_COST,
		contextWindow: DEEPSEEK_DEFAULT_CONTEXT_WINDOW,
		maxTokens: DEEPSEEK_DEFAULT_MAX_TOKENS
	};
	const mergedModels = existingModels.some((model) => model.id === DEEPSEEK_DEFAULT_MODEL_ID) ? existingModels : [...existingModels, defaultModel];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.deepseek = {
		...existingProviderRest,
		baseUrl: DEEPSEEK_BASE_URL,
		api: "openai-completions",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : [defaultModel]
	};
	return {
		...cfg,
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyDeepseekConfig(cfg, modelId) {
	const { DEEPSEEK_DEFAULT_MODEL_ID } = (init_onboard_auth_models(), __toCommonJS(onboard_auth_models_exports));
	const next = applyDeepseekProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	const finalModelId = modelId ?? DEEPSEEK_DEFAULT_MODEL_ID;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: `deepseek/${finalModelId}`
				}
			}
		}
	};
}
function applyAuthProfileConfig(cfg, params) {
	const profiles = {
		...cfg.auth?.profiles,
		[params.profileId]: {
			provider: params.provider,
			mode: params.mode,
			...params.email ? { email: params.email } : {}
		}
	};
	const existingProviderOrder = cfg.auth?.order?.[params.provider];
	const preferProfileFirst = params.preferProfileFirst ?? true;
	const reorderedProviderOrder = existingProviderOrder && preferProfileFirst ? [params.profileId, ...existingProviderOrder.filter((profileId) => profileId !== params.profileId)] : existingProviderOrder;
	const order = existingProviderOrder !== void 0 ? {
		...cfg.auth?.order,
		[params.provider]: reorderedProviderOrder?.includes(params.profileId) ? reorderedProviderOrder : [...reorderedProviderOrder ?? [], params.profileId]
	} : cfg.auth?.order;
	return {
		...cfg,
		auth: {
			...cfg.auth,
			profiles,
			...order ? { order } : {}
		}
	};
}
function applyQianfanProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[QIANFAN_DEFAULT_MODEL_REF] = {
		...models[QIANFAN_DEFAULT_MODEL_REF],
		alias: models[QIANFAN_DEFAULT_MODEL_REF]?.alias ?? "QIANFAN"
	};
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.qianfan;
	const defaultProvider = buildQianfanProvider();
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const defaultModels = defaultProvider.models ?? [];
	const hasDefaultModel = existingModels.some((model) => model.id === QIANFAN_DEFAULT_MODEL_ID);
	const mergedModels = existingModels.length > 0 ? hasDefaultModel ? existingModels : [...existingModels, ...defaultModels] : defaultModels;
	const { apiKey: existingApiKey, baseUrl: existingBaseUrl, api: existingApi, ...existingProviderRest } = existingProvider ?? {};
	const normalizedApiKey = (typeof existingApiKey === "string" ? existingApiKey : void 0)?.trim();
	providers.qianfan = {
		...existingProviderRest,
		baseUrl: existingBaseUrl ?? QIANFAN_BASE_URL,
		api: existingApi ?? "openai-completions",
		...normalizedApiKey ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : defaultProvider.models
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyQianfanConfig(cfg) {
	const next = applyQianfanProviderConfig(cfg);
	const existingModel = next.agents?.defaults?.model;
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...existingModel && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: QIANFAN_DEFAULT_MODEL_REF
				}
			}
		}
	};
}

//#endregion
//#region src/commands/onboard-auth.config-minimax.ts
init_onboard_auth_models();
function applyMinimaxProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models["anthropic/claude-opus-4-6"] = {
		...models["anthropic/claude-opus-4-6"],
		alias: models["anthropic/claude-opus-4-6"]?.alias ?? "Opus"
	};
	models["lmstudio/minimax-m2.1-gs32"] = {
		...models["lmstudio/minimax-m2.1-gs32"],
		alias: models["lmstudio/minimax-m2.1-gs32"]?.alias ?? "Minimax"
	};
	const providers = { ...cfg.models?.providers };
	if (!providers.lmstudio) providers.lmstudio = {
		baseUrl: "http://127.0.0.1:1234/v1",
		apiKey: "lmstudio",
		api: "openai-responses",
		models: [buildMinimaxModelDefinition({
			id: "minimax-m2.1-gs32",
			name: "MiniMax M2.1 GS32",
			reasoning: false,
			cost: MINIMAX_LM_STUDIO_COST,
			contextWindow: 196608,
			maxTokens: 8192
		})]
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyMinimaxConfig(cfg) {
	const next = applyMinimaxProviderConfig(cfg);
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...next.agents?.defaults?.model && "fallbacks" in next.agents.defaults.model ? { fallbacks: next.agents.defaults.model.fallbacks } : void 0,
					primary: "lmstudio/minimax-m2.1-gs32"
				}
			}
		}
	};
}
function applyMinimaxApiProviderConfig(cfg, modelId = "MiniMax-M2.1") {
	const providers = { ...cfg.models?.providers };
	const existingProvider = providers.minimax;
	const existingModels = Array.isArray(existingProvider?.models) ? existingProvider.models : [];
	const apiModel = buildMinimaxApiModelDefinition(modelId);
	const mergedModels = existingModels.some((model) => model.id === modelId) ? existingModels : [...existingModels, apiModel];
	const { apiKey: existingApiKey, ...existingProviderRest } = existingProvider ?? {};
	const resolvedApiKey = typeof existingApiKey === "string" ? existingApiKey : void 0;
	const normalizedApiKey = resolvedApiKey?.trim() === "minimax" ? "" : resolvedApiKey;
	providers.minimax = {
		...existingProviderRest,
		baseUrl: MINIMAX_API_BASE_URL,
		api: "anthropic-messages",
		...normalizedApiKey?.trim() ? { apiKey: normalizedApiKey } : {},
		models: mergedModels.length > 0 ? mergedModels : [apiModel]
	};
	const models = { ...cfg.agents?.defaults?.models };
	models[`minimax/${modelId}`] = {
		...models[`minimax/${modelId}`],
		alias: "Minimax"
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		},
		models: {
			mode: cfg.models?.mode ?? "merge",
			providers
		}
	};
}
function applyMinimaxApiConfig(cfg, modelId = "MiniMax-M2.1") {
	const next = applyMinimaxApiProviderConfig(cfg, modelId);
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...next.agents?.defaults?.model && "fallbacks" in next.agents.defaults.model ? { fallbacks: next.agents.defaults.model.fallbacks } : void 0,
					primary: `minimax/${modelId}`
				}
			}
		}
	};
}

//#endregion
//#region src/agents/opencode-zen-models.ts
const OPENCODE_ZEN_DEFAULT_MODEL = "claude-opus-4-6";
const OPENCODE_ZEN_DEFAULT_MODEL_REF = `opencode/${OPENCODE_ZEN_DEFAULT_MODEL}`;
const CACHE_TTL_MS = 3600 * 1e3;

//#endregion
//#region src/commands/onboard-auth.config-opencode.ts
function applyOpencodeZenProviderConfig(cfg) {
	const models = { ...cfg.agents?.defaults?.models };
	models[OPENCODE_ZEN_DEFAULT_MODEL_REF] = {
		...models[OPENCODE_ZEN_DEFAULT_MODEL_REF],
		alias: models[OPENCODE_ZEN_DEFAULT_MODEL_REF]?.alias ?? "Opus"
	};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models
			}
		}
	};
}
function applyOpencodeZenConfig(cfg) {
	const next = applyOpencodeZenProviderConfig(cfg);
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: {
					...next.agents?.defaults?.model && "fallbacks" in next.agents.defaults.model ? { fallbacks: next.agents.defaults.model.fallbacks } : void 0,
					primary: OPENCODE_ZEN_DEFAULT_MODEL_REF
				}
			}
		}
	};
}

//#endregion
//#region src/commands/onboard-auth.ts
init_synthetic_models();
init_venice_models();
init_onboard_auth_models();

//#endregion
//#region src/plugins/providers.ts
init_subsystem();
const log = createSubsystemLogger("plugins");
function resolvePluginProviders(params) {
	return loadOpenClawPlugins({
		config: params.config,
		workspaceDir: params.workspaceDir,
		logger: {
			info: (msg) => log.info(msg),
			warn: (msg) => log.warn(msg),
			error: (msg) => log.error(msg),
			debug: (msg) => log.debug(msg)
		}
	}).providers.map((entry) => entry.provider);
}

//#endregion
//#region src/commands/oauth-env.ts
function isRemoteEnvironment() {
	if (process.env.SSH_CLIENT || process.env.SSH_TTY || process.env.SSH_CONNECTION) return true;
	if (process.env.REMOTE_CONTAINERS || process.env.CODESPACES) return true;
	if (process.platform === "linux" && !process.env.DISPLAY && !process.env.WAYLAND_DISPLAY && !isWSLEnv()) return true;
	return false;
}

//#endregion
//#region src/commands/oauth-flow.ts
const validateRequiredInput = (value) => value.trim().length > 0 ? void 0 : "Required";
function createVpsAwareOAuthHandlers(params) {
	const manualPromptMessage = params.manualPromptMessage ?? "Paste the redirect URL (or authorization code)";
	let manualCodePromise;
	return {
		onAuth: async ({ url }) => {
			if (params.isRemote) {
				params.spin.stop("OAuth URL ready");
				params.runtime.log(`\nOpen this URL in your LOCAL browser:\n\n${url}\n`);
				manualCodePromise = params.prompter.text({
					message: manualPromptMessage,
					validate: validateRequiredInput
				}).then((value) => String(value));
				return;
			}
			params.spin.update(params.localBrowserMessage);
			await params.openUrl(url);
			params.runtime.log(`Open: ${url}`);
		},
		onPrompt: async (prompt) => {
			if (manualCodePromise) return manualCodePromise;
			const code = await params.prompter.text({
				message: prompt.message,
				placeholder: prompt.placeholder,
				validate: validateRequiredInput
			});
			return String(code);
		}
	};
}

//#endregion
//#region src/commands/models/shared.ts
init_agent_scope();
init_defaults();
init_model_selection();
init_command_format();
init_session_key();
const ensureFlagCompatibility = (opts) => {
	if (opts.json && opts.plain) throw new Error("Choose either --json or --plain, not both.");
};
const formatTokenK = (value) => {
	if (!value || !Number.isFinite(value)) return "-";
	if (value < 1024) return `${Math.round(value)}`;
	return `${Math.round(value / 1024)}k`;
};
const formatMs = (value) => {
	if (value === null || value === void 0) return "-";
	if (!Number.isFinite(value)) return "-";
	if (value < 1e3) return `${Math.round(value)}ms`;
	return `${Math.round(value / 100) / 10}s`;
};
async function updateConfig(mutator) {
	const snapshot = await readConfigFileSnapshot();
	if (!snapshot.valid) {
		const issues = snapshot.issues.map((issue) => `- ${issue.path}: ${issue.message}`).join("\n");
		throw new Error(`Invalid config at ${snapshot.path}\n${issues}`);
	}
	const next = mutator(snapshot.config);
	await writeConfigFile(next);
	return next;
}
function resolveModelTarget(params) {
	const aliasIndex = buildModelAliasIndex({
		cfg: params.cfg,
		defaultProvider: DEFAULT_PROVIDER
	});
	const resolved = resolveModelRefFromString({
		raw: params.raw,
		defaultProvider: DEFAULT_PROVIDER,
		aliasIndex
	});
	if (!resolved) throw new Error(`Invalid model reference: ${params.raw}`);
	return resolved.ref;
}
function normalizeAlias(alias) {
	const trimmed = alias.trim();
	if (!trimmed) throw new Error("Alias cannot be empty.");
	if (!/^[A-Za-z0-9_.:-]+$/.test(trimmed)) throw new Error("Alias must use letters, numbers, dots, underscores, colons, or dashes.");
	return trimmed;
}
function resolveKnownAgentId(params) {
	const raw = params.rawAgentId?.trim();
	if (!raw) return;
	const agentId = normalizeAgentId(raw);
	if (!listAgentIds(params.cfg).includes(agentId)) throw new Error(`Unknown agent id "${raw}". Use "${formatCliCommand("openclaw agents list")}" to see configured agents.`);
	return agentId;
}
/**
* Model key format: "provider/model"
*
* The model key is displayed in `/model status` and used to reference models.
* When using `/model <key>`, use the exact format shown (e.g., "openrouter/moonshotai/kimi-k2").
*
* For providers with hierarchical model IDs (e.g., OpenRouter), the model ID may include
* sub-providers (e.g., "moonshotai/kimi-k2"), resulting in a key like "openrouter/moonshotai/kimi-k2".
*/

//#endregion
//#region src/providers/github-copilot-auth.ts
init_auth_profiles();
const CLIENT_ID = "Iv1.b507a08c87ecfe98";
const DEVICE_CODE_URL = "https://github.com/login/device/code";
const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
function parseJsonResponse(value) {
	if (!value || typeof value !== "object") throw new Error("Unexpected response from GitHub");
	return value;
}
async function requestDeviceCode(params) {
	const body = new URLSearchParams({
		client_id: CLIENT_ID,
		scope: params.scope
	});
	const res = await fetch(DEVICE_CODE_URL, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body
	});
	if (!res.ok) throw new Error(`GitHub device code failed: HTTP ${res.status}`);
	const json = parseJsonResponse(await res.json());
	if (!json.device_code || !json.user_code || !json.verification_uri) throw new Error("GitHub device code response missing fields");
	return json;
}
async function pollForAccessToken(params) {
	const bodyBase = new URLSearchParams({
		client_id: CLIENT_ID,
		device_code: params.deviceCode,
		grant_type: "urn:ietf:params:oauth:grant-type:device_code"
	});
	while (Date.now() < params.expiresAt) {
		const res = await fetch(ACCESS_TOKEN_URL, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: bodyBase
		});
		if (!res.ok) throw new Error(`GitHub device token failed: HTTP ${res.status}`);
		const json = parseJsonResponse(await res.json());
		if ("access_token" in json && typeof json.access_token === "string") return json.access_token;
		const err = "error" in json ? json.error : "unknown";
		if (err === "authorization_pending") {
			await new Promise((r) => setTimeout(r, params.intervalMs));
			continue;
		}
		if (err === "slow_down") {
			await new Promise((r) => setTimeout(r, params.intervalMs + 2e3));
			continue;
		}
		if (err === "expired_token") throw new Error("GitHub device code expired; run login again");
		if (err === "access_denied") throw new Error("GitHub login cancelled");
		throw new Error(`GitHub device flow error: ${err}`);
	}
	throw new Error("GitHub device code expired; run login again");
}
async function githubCopilotLoginCommand(opts, runtime) {
	if (!process.stdin.isTTY) throw new Error("github-copilot login requires an interactive TTY.");
	intro(stylePromptTitle("GitHub Copilot login"));
	const profileId = opts.profileId?.trim() || "github-copilot:github";
	if (ensureAuthProfileStore(void 0, { allowKeychainPrompt: false }).profiles[profileId] && !opts.yes) note(`Auth profile already exists: ${profileId}\nRe-running will overwrite it.`, stylePromptTitle("Existing credentials"));
	const spin = spinner();
	spin.start("Requesting device code from GitHub...");
	const device = await requestDeviceCode({ scope: "read:user" });
	spin.stop("Device code ready");
	note([`Visit: ${device.verification_uri}`, `Code: ${device.user_code}`].join("\n"), stylePromptTitle("Authorize"));
	const expiresAt = Date.now() + device.expires_in * 1e3;
	const intervalMs = Math.max(1e3, device.interval * 1e3);
	const polling = spinner();
	polling.start("Waiting for GitHub authorization...");
	const accessToken = await pollForAccessToken({
		deviceCode: device.device_code,
		intervalMs,
		expiresAt
	});
	polling.stop("GitHub access token acquired");
	upsertAuthProfile({
		profileId,
		credential: {
			type: "token",
			provider: "github-copilot",
			token: accessToken
		}
	});
	await updateConfig((cfg) => applyAuthProfileConfig(cfg, {
		provider: "github-copilot",
		profileId,
		mode: "token"
	}));
	logConfigUpdated(runtime);
	runtime.log(`Auth profile: ${profileId} (github-copilot/token)`);
	outro("Done");
}

//#endregion
export { setCloudflareAiGatewayConfig as $, applyMoonshotProviderConfigCn as A, applyVeniceProviderConfig as B, applyDeepseekConfig as C, SILICONFLOW_DEFAULT_MODEL_REF as Ct, applyMoonshotConfig as D, applyKimiCodeProviderConfig as E, validateAnthropicSetupToken as Et, applySiliconflowConfig as F, applyXiaomiConfig as G, applyVercelAiGatewayProviderConfig as H, applySiliconflowProviderConfig as I, OPENROUTER_DEFAULT_MODEL_REF as J, applyXiaomiProviderConfig as K, applySyntheticConfig as L, applyOpenrouterProviderConfig as M, applyQianfanConfig as N, applyMoonshotConfigCn as O, applyQianfanProviderConfig as P, setAnthropicApiKey as Q, applySyntheticProviderConfig as R, applyDashscopeProviderConfig as S, QIANFAN_DEFAULT_MODEL_REF as St, applyKimiCodeConfig as T, buildTokenProfileId as Tt, applyXaiConfig as U, applyVercelAiGatewayConfig as V, applyXaiProviderConfig as W, XIAOMI_DEFAULT_MODEL_REF as X, VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF as Y, ZAI_DEFAULT_MODEL_REF as Z, applyMinimaxProviderConfig as _, writeOAuthCredentials as _t, normalizeAlias as a, setMoonshotApiKey as at, applyCloudflareAiGatewayProviderConfig as b, KIMI_CODING_MODEL_REF as bt, updateConfig as c, setQianfanApiKey as ct, resolvePluginProviders as d, setVeniceApiKey as dt, setDashscopeApiKey as et, applyOpencodeZenConfig as f, setVercelAiGatewayApiKey as ft, applyMinimaxConfig as g, setZaiApiKey as gt, applyMinimaxApiProviderConfig as h, setXiaomiApiKey as ht, formatTokenK as i, setMinimaxApiKey as it, applyOpenrouterConfig as j, applyMoonshotProviderConfig as k, createVpsAwareOAuthHandlers as l, setSiliconflowApiKey as lt, applyMinimaxApiConfig as m, setXaiApiKey as mt, ensureFlagCompatibility as n, setGeminiApiKey as nt, resolveKnownAgentId as o, setOpencodeZenApiKey as ot, applyOpencodeZenProviderConfig as p, setVolcengineApiKey as pt, applyZaiConfig as q, formatMs as r, setKimiCodingApiKey as rt, resolveModelTarget as s, setOpenrouterApiKey as st, githubCopilotLoginCommand as t, setDeepseekApiKey as tt, isRemoteEnvironment as u, setSyntheticApiKey as ut, applyAuthProfileConfig as v, DASHSCOPE_DEFAULT_MODEL_REF as vt, applyDeepseekProviderConfig as w, XAI_DEFAULT_MODEL_REF as wt, applyDashscopeConfig as x, MOONSHOT_DEFAULT_MODEL_REF as xt, applyCloudflareAiGatewayConfig as y, DEEPSEEK_DEFAULT_MODEL_REF as yt, applyVeniceConfig as z };