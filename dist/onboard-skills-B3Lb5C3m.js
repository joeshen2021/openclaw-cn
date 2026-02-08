import { A as buildModelAliasIndex, D as resolveOpenClawAgentDir, E as init_agent_paths, F as normalizeProviderId, Ft as init_defaults, K as VOLCENGINE_API_BASE_URL, M as init_model_selection, Nt as DEFAULT_MODEL, O as buildAllowedModelSet, Ot as CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF, P as modelKey, Pt as DEFAULT_PROVIDER, R as resolveAllowlistModelKey, Z as init_models_config_providers, d as generateChutesPkce, f as init_chutes_oauth, h as listProfilesForProvider, ht as init_model_auth, it as VENICE_DEFAULT_MODEL_REF, l as CHUTES_AUTHORIZE_ENDPOINT, lt as SYNTHETIC_DEFAULT_MODEL_REF, mt as getCustomProviderApiKey, n as init_auth_profiles, p as parseOAuthCallbackInput, q as XIAOMI_API_BASE_URL, r as resolveAuthProfileOrder, u as exchangeChutesCodeForTokens, v as upsertAuthProfile, y as ensureAuthProfileStore, yt as resolveEnvApiKey, z as resolveConfiguredModelRef } from "./auth-profiles-BxOVCPsH.js";
import { n as init_command_format, t as formatCliCommand } from "./command-format-4psjdhj-.js";
import { c as init_utils, f as resolveConfigDir, h as resolveUserPath, o as ensureDir, t as CONFIG_DIR } from "./utils-C_zAMV2K.js";
import { n as runCommandWithTimeout, t as init_exec } from "./exec-DZOavyKj.js";
import { E as resolveDefaultAgentWorkspaceDir, c as resolveAgentWorkspaceDir, i as resolveAgentDir, l as resolveDefaultAgentId, o as resolveAgentModelPrimary, t as init_agent_scope, w as init_workspace } from "./agent-scope-Dw1YEb1p.js";
import { t as resolveBrewExecutable } from "./brew-DyBGNK8A.js";
import { m as openUrl, o as detectBinary, qt as loadModelCatalog, y as resolveNodeManagerOptions } from "./loader-Dn-r2_em.js";
import { a as enablePluginInConfig } from "./onboard-channels-CcFw_6Xq.js";
import { t as scanDirectoryWithSummary } from "./skill-scanner-COatt01v.js";
import { R as fetchWithSsrFGuard } from "./deliver-D5hbzrgM.js";
import { _ as resolveSkillKey, d as hasBinary, i as loadWorkspaceSkillEntries, t as resolveSkillsInstallPreferences } from "./skills-Cc75jauN.js";
import { n as resolveWideAreaDiscoveryDomain } from "./widearea-dns-CUcLV9v5.js";
import { $ as setCloudflareAiGatewayConfig, A as applyMoonshotProviderConfigCn, B as applyVeniceProviderConfig, C as applyDeepseekConfig, Ct as SILICONFLOW_DEFAULT_MODEL_REF, D as applyMoonshotConfig, E as applyKimiCodeProviderConfig, Et as validateAnthropicSetupToken, F as applySiliconflowConfig, G as applyXiaomiConfig, H as applyVercelAiGatewayProviderConfig, I as applySiliconflowProviderConfig, J as OPENROUTER_DEFAULT_MODEL_REF, K as applyXiaomiProviderConfig, L as applySyntheticConfig, M as applyOpenrouterProviderConfig, N as applyQianfanConfig, O as applyMoonshotConfigCn, P as applyQianfanProviderConfig, Q as setAnthropicApiKey, R as applySyntheticProviderConfig, S as applyDashscopeProviderConfig, St as QIANFAN_DEFAULT_MODEL_REF, T as applyKimiCodeConfig, Tt as buildTokenProfileId, U as applyXaiConfig, V as applyVercelAiGatewayConfig, W as applyXaiProviderConfig, X as XIAOMI_DEFAULT_MODEL_REF, Y as VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF, Z as ZAI_DEFAULT_MODEL_REF, _ as applyMinimaxProviderConfig, _t as writeOAuthCredentials, at as setMoonshotApiKey, b as applyCloudflareAiGatewayProviderConfig, bt as KIMI_CODING_MODEL_REF, ct as setQianfanApiKey, d as resolvePluginProviders, dt as setVeniceApiKey, et as setDashscopeApiKey, f as applyOpencodeZenConfig, ft as setVercelAiGatewayApiKey, g as applyMinimaxConfig, gt as setZaiApiKey, h as applyMinimaxApiProviderConfig, ht as setXiaomiApiKey, i as formatTokenK, it as setMinimaxApiKey, j as applyOpenrouterConfig, k as applyMoonshotProviderConfig, l as createVpsAwareOAuthHandlers, lt as setSiliconflowApiKey, m as applyMinimaxApiConfig, mt as setXaiApiKey, nt as setGeminiApiKey, ot as setOpencodeZenApiKey, p as applyOpencodeZenProviderConfig, pt as setVolcengineApiKey, q as applyZaiConfig, rt as setKimiCodingApiKey, st as setOpenrouterApiKey, t as githubCopilotLoginCommand, tt as setDeepseekApiKey, u as isRemoteEnvironment, ut as setSyntheticApiKey, v as applyAuthProfileConfig, vt as DASHSCOPE_DEFAULT_MODEL_REF, w as applyDeepseekProviderConfig, wt as XAI_DEFAULT_MODEL_REF, x as applyDashscopeConfig, xt as MOONSHOT_DEFAULT_MODEL_REF, y as applyCloudflareAiGatewayConfig, yt as DEEPSEEK_DEFAULT_MODEL_REF, z as applyVeniceConfig } from "./github-copilot-auth-DSxA9-fA.js";
import { t as buildWorkspaceSkillStatus } from "./skills-status-zctNOEqo.js";
import path from "node:path";
import fs from "node:fs";
import { loginOpenAICodex } from "@mariozechner/pi-ai";
import { randomBytes } from "node:crypto";
import { createServer } from "node:http";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

//#region src/infra/bonjour-discovery.ts
init_exec();
const DEFAULT_TIMEOUT_MS = 2e3;
const GATEWAY_SERVICE_TYPE = "_openclaw-gw._tcp";
function decodeDnsSdEscapes(value) {
	let decoded = false;
	const bytes = [];
	let pending = "";
	const flush = () => {
		if (!pending) return;
		bytes.push(...Buffer.from(pending, "utf8"));
		pending = "";
	};
	for (let i = 0; i < value.length; i += 1) {
		const ch = value[i] ?? "";
		if (ch === "\\" && i + 3 < value.length) {
			const escaped = value.slice(i + 1, i + 4);
			if (/^[0-9]{3}$/.test(escaped)) {
				const byte = Number.parseInt(escaped, 10);
				if (!Number.isFinite(byte) || byte < 0 || byte > 255) {
					pending += ch;
					continue;
				}
				flush();
				bytes.push(byte);
				decoded = true;
				i += 3;
				continue;
			}
		}
		pending += ch;
	}
	if (!decoded) return value;
	flush();
	return Buffer.from(bytes).toString("utf8");
}
function isTailnetIPv4(address) {
	const parts = address.split(".");
	if (parts.length !== 4) return false;
	const octets = parts.map((p) => Number.parseInt(p, 10));
	if (octets.some((n) => !Number.isFinite(n) || n < 0 || n > 255)) return false;
	const [a, b] = octets;
	return a === 100 && b >= 64 && b <= 127;
}
function parseDigShortLines(stdout) {
	return stdout.split("\n").map((l) => l.trim()).filter(Boolean);
}
function parseDigTxt(stdout) {
	const tokens = [];
	for (const raw of stdout.split("\n")) {
		const line = raw.trim();
		if (!line) continue;
		const matches = Array.from(line.matchAll(/"([^"]*)"/g), (m) => m[1] ?? "");
		for (const m of matches) {
			const unescaped = m.replaceAll("\\\\", "\\").replaceAll("\\\"", "\"").replaceAll("\\n", "\n");
			tokens.push(unescaped);
		}
	}
	return tokens;
}
function parseDigSrv(stdout) {
	const line = stdout.split("\n").map((l) => l.trim()).find(Boolean);
	if (!line) return null;
	const parts = line.split(/\s+/).filter(Boolean);
	if (parts.length < 4) return null;
	const port = Number.parseInt(parts[2] ?? "", 10);
	const hostRaw = parts[3] ?? "";
	if (!Number.isFinite(port) || port <= 0) return null;
	const host = hostRaw.replace(/\.$/, "");
	if (!host) return null;
	return {
		host,
		port
	};
}
function parseTailscaleStatusIPv4s(stdout) {
	const parsed = stdout ? JSON.parse(stdout) : {};
	const out = [];
	const addIps = (value) => {
		if (!value || typeof value !== "object") return;
		const ips = value.TailscaleIPs;
		if (!Array.isArray(ips)) return;
		for (const ip of ips) {
			if (typeof ip !== "string") continue;
			const trimmed = ip.trim();
			if (trimmed && isTailnetIPv4(trimmed)) out.push(trimmed);
		}
	};
	addIps(parsed.Self);
	const peerObj = parsed.Peer;
	if (peerObj && typeof peerObj === "object") for (const peer of Object.values(peerObj)) addIps(peer);
	return [...new Set(out)];
}
function parseIntOrNull(value) {
	if (!value) return;
	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function parseTxtTokens(tokens) {
	const txt = {};
	for (const token of tokens) {
		const idx = token.indexOf("=");
		if (idx <= 0) continue;
		const key = token.slice(0, idx).trim();
		const value = decodeDnsSdEscapes(token.slice(idx + 1).trim());
		if (!key) continue;
		txt[key] = value;
	}
	return txt;
}
function parseDnsSdBrowse(stdout) {
	const instances = /* @__PURE__ */ new Set();
	for (const raw of stdout.split("\n")) {
		const line = raw.trim();
		if (!line || !line.includes(GATEWAY_SERVICE_TYPE)) continue;
		if (!line.includes("Add")) continue;
		const match = line.match(/_openclaw-gw\._tcp\.?\s+(.+)$/);
		if (match?.[1]) instances.add(decodeDnsSdEscapes(match[1].trim()));
	}
	return Array.from(instances.values());
}
function parseDnsSdResolve(stdout, instanceName) {
	const decodedInstanceName = decodeDnsSdEscapes(instanceName);
	const beacon = { instanceName: decodedInstanceName };
	let txt = {};
	for (const raw of stdout.split("\n")) {
		const line = raw.trim();
		if (!line) continue;
		if (line.includes("can be reached at")) {
			const match = line.match(/can be reached at\s+([^\s:]+):(\d+)/i);
			if (match?.[1]) beacon.host = match[1].replace(/\.$/, "");
			if (match?.[2]) beacon.port = parseIntOrNull(match[2]);
			continue;
		}
		if (line.startsWith("txt") || line.includes("txtvers=")) txt = parseTxtTokens(line.split(/\s+/).filter(Boolean));
	}
	beacon.txt = Object.keys(txt).length ? txt : void 0;
	if (txt.displayName) beacon.displayName = decodeDnsSdEscapes(txt.displayName);
	if (txt.lanHost) beacon.lanHost = txt.lanHost;
	if (txt.tailnetDns) beacon.tailnetDns = txt.tailnetDns;
	if (txt.cliPath) beacon.cliPath = txt.cliPath;
	beacon.gatewayPort = parseIntOrNull(txt.gatewayPort);
	beacon.sshPort = parseIntOrNull(txt.sshPort);
	if (txt.gatewayTls) {
		const raw = txt.gatewayTls.trim().toLowerCase();
		beacon.gatewayTls = raw === "1" || raw === "true" || raw === "yes";
	}
	if (txt.gatewayTlsSha256) beacon.gatewayTlsFingerprintSha256 = txt.gatewayTlsSha256;
	if (txt.role) beacon.role = txt.role;
	if (txt.transport) beacon.transport = txt.transport;
	if (!beacon.displayName) beacon.displayName = decodedInstanceName;
	return beacon;
}
async function discoverViaDnsSd(domain, timeoutMs, run) {
	const instances = parseDnsSdBrowse((await run([
		"dns-sd",
		"-B",
		GATEWAY_SERVICE_TYPE,
		domain
	], { timeoutMs })).stdout);
	const results = [];
	for (const instance of instances) {
		const parsed = parseDnsSdResolve((await run([
			"dns-sd",
			"-L",
			instance,
			GATEWAY_SERVICE_TYPE,
			domain
		], { timeoutMs })).stdout, instance);
		if (parsed) results.push({
			...parsed,
			domain
		});
	}
	return results;
}
async function discoverWideAreaViaTailnetDns(domain, timeoutMs, run) {
	if (!domain || domain === "local.") return [];
	const startedAt = Date.now();
	const remainingMs = () => timeoutMs - (Date.now() - startedAt);
	const tailscaleCandidates = ["tailscale", "/Applications/Tailscale.app/Contents/MacOS/Tailscale"];
	let ips = [];
	for (const candidate of tailscaleCandidates) try {
		ips = parseTailscaleStatusIPv4s((await run([
			candidate,
			"status",
			"--json"
		], { timeoutMs: Math.max(1, Math.min(700, remainingMs())) })).stdout);
		if (ips.length > 0) break;
	} catch {}
	if (ips.length === 0) return [];
	if (remainingMs() <= 0) return [];
	ips = ips.slice(0, 40);
	const probeName = `${GATEWAY_SERVICE_TYPE}.${domain.replace(/\.$/, "")}`;
	const concurrency = 6;
	let nextIndex = 0;
	let nameserver = null;
	let ptrs = [];
	const worker = async () => {
		while (nameserver === null) {
			const budget = remainingMs();
			if (budget <= 0) return;
			const i = nextIndex;
			nextIndex += 1;
			if (i >= ips.length) return;
			const ip = ips[i] ?? "";
			if (!ip) continue;
			try {
				const lines = parseDigShortLines((await run([
					"dig",
					"+short",
					"+time=1",
					"+tries=1",
					`@${ip}`,
					probeName,
					"PTR"
				], { timeoutMs: Math.max(1, Math.min(250, budget)) })).stdout);
				if (lines.length === 0) continue;
				nameserver = ip;
				ptrs = lines;
				return;
			} catch {}
		}
	};
	await Promise.all(Array.from({ length: Math.min(concurrency, ips.length) }, () => worker()));
	if (!nameserver || ptrs.length === 0) return [];
	if (remainingMs() <= 0) return [];
	const nameserverArg = `@${String(nameserver)}`;
	const results = [];
	for (const ptr of ptrs) {
		const budget = remainingMs();
		if (budget <= 0) break;
		const ptrName = ptr.trim().replace(/\.$/, "");
		if (!ptrName) continue;
		const instanceName = ptrName.replace(/\.?_openclaw-gw\._tcp\..*$/, "");
		const srv = await run([
			"dig",
			"+short",
			"+time=1",
			"+tries=1",
			nameserverArg,
			ptrName,
			"SRV"
		], { timeoutMs: Math.max(1, Math.min(350, budget)) }).catch(() => null);
		const srvParsed = srv ? parseDigSrv(srv.stdout) : null;
		if (!srvParsed) continue;
		const txtBudget = remainingMs();
		if (txtBudget <= 0) {
			results.push({
				instanceName: instanceName || ptrName,
				displayName: instanceName || ptrName,
				domain,
				host: srvParsed.host,
				port: srvParsed.port
			});
			continue;
		}
		const txt = await run([
			"dig",
			"+short",
			"+time=1",
			"+tries=1",
			nameserverArg,
			ptrName,
			"TXT"
		], { timeoutMs: Math.max(1, Math.min(350, txtBudget)) }).catch(() => null);
		const txtTokens = txt ? parseDigTxt(txt.stdout) : [];
		const txtMap = txtTokens.length > 0 ? parseTxtTokens(txtTokens) : {};
		const beacon = {
			instanceName: instanceName || ptrName,
			displayName: txtMap.displayName || instanceName || ptrName,
			domain,
			host: srvParsed.host,
			port: srvParsed.port,
			txt: Object.keys(txtMap).length ? txtMap : void 0,
			gatewayPort: parseIntOrNull(txtMap.gatewayPort),
			sshPort: parseIntOrNull(txtMap.sshPort),
			tailnetDns: txtMap.tailnetDns || void 0,
			cliPath: txtMap.cliPath || void 0
		};
		if (txtMap.gatewayTls) {
			const raw = txtMap.gatewayTls.trim().toLowerCase();
			beacon.gatewayTls = raw === "1" || raw === "true" || raw === "yes";
		}
		if (txtMap.gatewayTlsSha256) beacon.gatewayTlsFingerprintSha256 = txtMap.gatewayTlsSha256;
		if (txtMap.role) beacon.role = txtMap.role;
		if (txtMap.transport) beacon.transport = txtMap.transport;
		results.push(beacon);
	}
	return results;
}
function parseAvahiBrowse(stdout) {
	const results = [];
	let current = null;
	for (const raw of stdout.split("\n")) {
		const line = raw.trimEnd();
		if (!line) continue;
		if (line.startsWith("=") && line.includes(GATEWAY_SERVICE_TYPE)) {
			if (current) results.push(current);
			const marker = ` ${GATEWAY_SERVICE_TYPE}`;
			const idx = line.indexOf(marker);
			const left = idx >= 0 ? line.slice(0, idx).trim() : line;
			const parts = left.split(/\s+/);
			const instanceName = parts.length > 3 ? parts.slice(3).join(" ") : left;
			current = {
				instanceName,
				displayName: instanceName
			};
			continue;
		}
		if (!current) continue;
		const trimmed = line.trim();
		if (trimmed.startsWith("hostname =")) {
			const match = trimmed.match(/hostname\s*=\s*\[([^\]]+)\]/);
			if (match?.[1]) current.host = match[1];
			continue;
		}
		if (trimmed.startsWith("port =")) {
			const match = trimmed.match(/port\s*=\s*\[(\d+)\]/);
			if (match?.[1]) current.port = parseIntOrNull(match[1]);
			continue;
		}
		if (trimmed.startsWith("txt =")) {
			const txt = parseTxtTokens(Array.from(trimmed.matchAll(/"([^"]*)"/g), (m) => m[1]));
			current.txt = Object.keys(txt).length ? txt : void 0;
			if (txt.displayName) current.displayName = txt.displayName;
			if (txt.lanHost) current.lanHost = txt.lanHost;
			if (txt.tailnetDns) current.tailnetDns = txt.tailnetDns;
			if (txt.cliPath) current.cliPath = txt.cliPath;
			current.gatewayPort = parseIntOrNull(txt.gatewayPort);
			current.sshPort = parseIntOrNull(txt.sshPort);
			if (txt.gatewayTls) {
				const raw = txt.gatewayTls.trim().toLowerCase();
				current.gatewayTls = raw === "1" || raw === "true" || raw === "yes";
			}
			if (txt.gatewayTlsSha256) current.gatewayTlsFingerprintSha256 = txt.gatewayTlsSha256;
			if (txt.role) current.role = txt.role;
			if (txt.transport) current.transport = txt.transport;
		}
	}
	if (current) results.push(current);
	return results;
}
async function discoverViaAvahi(domain, timeoutMs, run) {
	const args = [
		"avahi-browse",
		"-rt",
		GATEWAY_SERVICE_TYPE
	];
	if (domain && domain !== "local.") args.push("-d", domain.replace(/\.$/, ""));
	return parseAvahiBrowse((await run(args, { timeoutMs })).stdout).map((beacon) => ({
		...beacon,
		domain
	}));
}
async function discoverGatewayBeacons(opts = {}) {
	const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
	const platform = opts.platform ?? process.platform;
	const run = opts.run ?? runCommandWithTimeout;
	const wideAreaDomain = resolveWideAreaDiscoveryDomain({ configDomain: opts.wideAreaDomain });
	const domainsRaw = Array.isArray(opts.domains) ? opts.domains : [];
	const defaultDomains = ["local.", ...wideAreaDomain ? [wideAreaDomain] : []];
	const domains = (domainsRaw.length > 0 ? domainsRaw : defaultDomains).map((d) => String(d).trim()).filter(Boolean).map((d) => d.endsWith(".") ? d : `${d}.`);
	try {
		if (platform === "darwin") {
			const discovered = (await Promise.allSettled(domains.map(async (domain) => await discoverViaDnsSd(domain, timeoutMs, run)))).flatMap((r) => r.status === "fulfilled" ? r.value : []);
			const wantsWideArea = wideAreaDomain ? domains.includes(wideAreaDomain) : false;
			const hasWideArea = wideAreaDomain ? discovered.some((b) => b.domain === wideAreaDomain) : false;
			if (wantsWideArea && !hasWideArea && wideAreaDomain) {
				const fallback = await discoverWideAreaViaTailnetDns(wideAreaDomain, timeoutMs, run).catch(() => []);
				return [...discovered, ...fallback];
			}
			return discovered;
		}
		if (platform === "linux") return (await Promise.allSettled(domains.map(async (domain) => await discoverViaAvahi(domain, timeoutMs, run)))).flatMap((r) => r.status === "fulfilled" ? r.value : []);
	} catch {
		return [];
	}
	return [];
}

//#endregion
//#region src/commands/auth-choice-options.ts
const AUTH_CHOICE_GROUP_DEFS = [
	{
		value: "xai",
		label: "xAI (Grok)",
		hint: "API key",
		choices: ["xai-api-key"]
	},
	{
		value: "openai",
		label: "OpenAI",
		hint: "Codex OAuth + API key",
		choices: ["openai-codex", "openai-api-key"]
	},
	{
		value: "anthropic",
		label: "Anthropic",
		hint: "setup-token + API key",
		choices: ["token", "apiKey"]
	},
	{
		value: "minimax",
		label: "MiniMax",
		hint: "M2.1 (recommended)",
		choices: [
			"minimax-portal",
			"minimax-api",
			"minimax-api-lightning"
		]
	},
	{
		value: "moonshot",
		label: "Moonshot AI (Kimi K2.5)",
		hint: "Kimi K2.5 + Kimi Coding",
		choices: [
			"moonshot-api-key",
			"moonshot-api-key-cn",
			"kimi-code-api-key"
		]
	},
	{
		value: "google",
		label: "Google",
		hint: "Gemini API key + OAuth",
		choices: [
			"gemini-api-key",
			"google-antigravity",
			"google-gemini-cli"
		]
	},
	{
		value: "openrouter",
		label: "OpenRouter",
		hint: "API key",
		choices: ["openrouter-api-key"]
	},
	{
		value: "qwen",
		label: "Qwen",
		hint: "OAuth",
		choices: ["qwen-portal"]
	},
	{
		value: "zai",
		label: "Z.AI (GLM 4.7)",
		hint: "API key",
		choices: ["zai-api-key"]
	},
	{
		value: "siliconflow",
		label: "硅基流动 (SiliconFlow)",
		hint: "OpenAI兼容 · API key",
		choices: ["siliconflow-api-key"]
	},
	{
		value: "dashscope",
		label: "阿里云百炼 (DashScope)",
		hint: "OpenAI兼容 · API key",
		choices: ["dashscope-api-key"]
	},
	{
		value: "deepseek",
		label: "DeepSeek",
		hint: "OpenAI兼容 · API key",
		choices: ["deepseek-api-key"]
	},
	{
		value: "volcengine",
		label: "火山引擎 (VolcanoEngine)",
		hint: "ARK API key",
		choices: ["volcengine-api-key"]
	},
	{
		value: "qianfan",
		label: "Qianfan",
		hint: "API key",
		choices: ["qianfan-api-key"]
	},
	{
		value: "copilot",
		label: "Copilot",
		hint: "GitHub + local proxy",
		choices: ["github-copilot", "copilot-proxy"]
	},
	{
		value: "ai-gateway",
		label: "Vercel AI Gateway",
		hint: "API key",
		choices: ["ai-gateway-api-key"]
	},
	{
		value: "opencode-zen",
		label: "OpenCode Zen",
		hint: "API key",
		choices: ["opencode-zen"]
	},
	{
		value: "xiaomi",
		label: "Xiaomi",
		hint: "API key",
		choices: ["xiaomi-api-key"]
	},
	{
		value: "synthetic",
		label: "Synthetic",
		hint: "Anthropic-compatible (multi-model)",
		choices: ["synthetic-api-key"]
	},
	{
		value: "venice",
		label: "Venice AI",
		hint: "Privacy-focused (uncensored models)",
		choices: ["venice-api-key"]
	},
	{
		value: "cloudflare-ai-gateway",
		label: "Cloudflare AI Gateway",
		hint: "Account ID + Gateway ID + API key",
		choices: ["cloudflare-ai-gateway-api-key"]
	}
];
function buildAuthChoiceOptions(params) {
	params.store;
	const options = [];
	options.push({
		value: "token",
		label: "Anthropic token (paste setup-token)",
		hint: "run `claude setup-token` elsewhere, then paste the token here"
	});
	options.push({
		value: "openai-codex",
		label: "OpenAI Codex (ChatGPT OAuth)"
	});
	options.push({
		value: "chutes",
		label: "Chutes (OAuth)"
	});
	options.push({
		value: "openai-api-key",
		label: "OpenAI API key"
	});
	options.push({
		value: "openrouter-api-key",
		label: "OpenRouter API key"
	});
	options.push({
		value: "xai-api-key",
		label: "xAI (Grok) API key"
	});
	options.push({
		value: "ai-gateway-api-key",
		label: "Vercel AI Gateway API key"
	});
	options.push({
		value: "cloudflare-ai-gateway-api-key",
		label: "Cloudflare AI Gateway",
		hint: "Account ID + Gateway ID + API key"
	});
	options.push({
		value: "moonshot-api-key",
		label: "Kimi API key (.ai)"
	});
	options.push({
		value: "moonshot-api-key-cn",
		label: "Kimi API key (.cn)"
	});
	options.push({
		value: "kimi-code-api-key",
		label: "Kimi Code API key (subscription)"
	});
	options.push({
		value: "synthetic-api-key",
		label: "Synthetic API key"
	});
	options.push({
		value: "venice-api-key",
		label: "Venice AI API key",
		hint: "Privacy-focused inference (uncensored models)"
	});
	options.push({
		value: "github-copilot",
		label: "GitHub Copilot (GitHub device login)",
		hint: "Uses GitHub device flow"
	});
	options.push({
		value: "gemini-api-key",
		label: "Google Gemini API key"
	});
	options.push({
		value: "google-antigravity",
		label: "Google Antigravity OAuth",
		hint: "Uses the bundled Antigravity auth plugin"
	});
	options.push({
		value: "google-gemini-cli",
		label: "Google Gemini CLI OAuth",
		hint: "Uses the bundled Gemini CLI auth plugin"
	});
	options.push({
		value: "zai-api-key",
		label: "Z.AI (GLM 4.7) API key"
	});
	options.push({
		value: "siliconflow-api-key",
		label: "SiliconFlow API key",
		hint: "硅基流动 - OpenAI compatible"
	});
	options.push({
		value: "dashscope-api-key",
		label: "DashScope API key",
		hint: "阿里云百炼 - OpenAI compatible"
	});
	options.push({
		value: "deepseek-api-key",
		label: "DeepSeek API key",
		hint: "DeepSeek - OpenAI compatible"
	});
	options.push({
		value: "volcengine-api-key",
		label: "Volcengine API key",
		hint: "火山引擎 ARK - OpenAI compatible"
	});
	options.push({
		value: "xiaomi-api-key",
		label: "Xiaomi API key"
	});
	options.push({
		value: "qianfan-api-key",
		label: "Qianfan API key"
	});
	options.push({
		value: "minimax-portal",
		label: "MiniMax OAuth",
		hint: "Oauth plugin for MiniMax"
	});
	options.push({
		value: "qwen-portal",
		label: "Qwen OAuth"
	});
	options.push({
		value: "copilot-proxy",
		label: "Copilot Proxy (local)",
		hint: "Local proxy for VS Code Copilot models"
	});
	options.push({
		value: "apiKey",
		label: "Anthropic API key"
	});
	options.push({
		value: "opencode-zen",
		label: "OpenCode Zen (multi-model proxy)",
		hint: "Claude, GPT, Gemini via opencode.ai/zen"
	});
	options.push({
		value: "minimax-api",
		label: "MiniMax M2.1"
	});
	options.push({
		value: "minimax-api-lightning",
		label: "MiniMax M2.1 Lightning",
		hint: "Faster, higher output cost"
	});
	if (params.includeSkip) options.push({
		value: "skip",
		label: "Skip for now"
	});
	return options;
}
function buildAuthChoiceGroups(params) {
	const options = buildAuthChoiceOptions({
		...params,
		includeSkip: false
	});
	const optionByValue = new Map(options.map((opt) => [opt.value, opt]));
	return {
		groups: AUTH_CHOICE_GROUP_DEFS.map((group) => ({
			...group,
			options: group.choices.map((choice) => optionByValue.get(choice)).filter((opt) => Boolean(opt))
		})),
		skipOption: params.includeSkip ? {
			value: "skip",
			label: "Skip for now"
		} : void 0
	};
}

//#endregion
//#region src/commands/auth-choice-prompt.ts
const BACK_VALUE = "__back";
async function promptAuthChoiceGrouped(params) {
	const { groups, skipOption } = buildAuthChoiceGroups(params);
	const availableGroups = groups.filter((group) => group.options.length > 0);
	while (true) {
		const providerOptions = [...availableGroups.map((group) => ({
			value: group.value,
			label: group.label,
			hint: group.hint
		})), ...skipOption ? [skipOption] : []];
		const providerSelection = await params.prompter.select({
			message: "Model/auth provider",
			options: providerOptions
		});
		if (providerSelection === "skip") return "skip";
		const group = availableGroups.find((candidate) => candidate.value === providerSelection);
		if (!group || group.options.length === 0) {
			await params.prompter.note("No auth methods available for that provider.", "Model/auth choice");
			continue;
		}
		const methodSelection = await params.prompter.select({
			message: `${group.label} auth method`,
			options: [...group.options, {
				value: BACK_VALUE,
				label: "Back"
			}]
		});
		if (methodSelection === BACK_VALUE) continue;
		return methodSelection;
	}
}

//#endregion
//#region src/commands/auth-choice.api-key.ts
const DEFAULT_KEY_PREVIEW = {
	head: 4,
	tail: 4
};
function normalizeApiKeyInput(raw) {
	const trimmed = String(raw ?? "").trim();
	if (!trimmed) return "";
	const assignmentMatch = trimmed.match(/^(?:export\s+)?[A-Za-z_][A-Za-z0-9_]*\s*=\s*(.+)$/);
	const valuePart = assignmentMatch ? assignmentMatch[1].trim() : trimmed;
	const unquoted = valuePart.length >= 2 && (valuePart.startsWith("\"") && valuePart.endsWith("\"") || valuePart.startsWith("'") && valuePart.endsWith("'") || valuePart.startsWith("`") && valuePart.endsWith("`")) ? valuePart.slice(1, -1) : valuePart;
	return (unquoted.endsWith(";") ? unquoted.slice(0, -1) : unquoted).trim();
}
const validateApiKeyInput = (value) => normalizeApiKeyInput(value).length > 0 ? void 0 : "Required";
function formatApiKeyPreview(raw, opts = {}) {
	const trimmed = raw.trim();
	if (!trimmed) return "…";
	const head = opts.head ?? DEFAULT_KEY_PREVIEW.head;
	const tail = opts.tail ?? DEFAULT_KEY_PREVIEW.tail;
	if (trimmed.length <= head + tail) {
		const shortHead = Math.min(2, trimmed.length);
		const shortTail = Math.min(2, trimmed.length - shortHead);
		if (shortTail <= 0) return `${trimmed.slice(0, shortHead)}…`;
		return `${trimmed.slice(0, shortHead)}…${trimmed.slice(-shortTail)}`;
	}
	return `${trimmed.slice(0, head)}…${trimmed.slice(-tail)}`;
}

//#endregion
//#region src/commands/auth-choice.apply.anthropic.ts
init_auth_profiles();
async function applyAuthChoiceAnthropic(params) {
	if (params.authChoice === "setup-token" || params.authChoice === "oauth" || params.authChoice === "token") {
		let nextConfig = params.config;
		await params.prompter.note(["Run `claude setup-token` in your terminal.", "Then paste the generated token below."].join("\n"), "Anthropic setup-token");
		const tokenRaw = await params.prompter.text({
			message: "Paste Anthropic setup-token",
			validate: (value) => validateAnthropicSetupToken(String(value ?? ""))
		});
		const token = String(tokenRaw).trim();
		const profileNameRaw = await params.prompter.text({
			message: "Token name (blank = default)",
			placeholder: "default"
		});
		const provider = "anthropic";
		const namedProfileId = buildTokenProfileId({
			provider,
			name: String(profileNameRaw ?? "")
		});
		upsertAuthProfile({
			profileId: namedProfileId,
			agentDir: params.agentDir,
			credential: {
				type: "token",
				provider,
				token
			}
		});
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: namedProfileId,
			provider,
			mode: "token"
		});
		return { config: nextConfig };
	}
	if (params.authChoice === "apiKey") {
		if (params.opts?.tokenProvider && params.opts.tokenProvider !== "anthropic") return null;
		let nextConfig = params.config;
		let hasCredential = false;
		const envKey = process.env.ANTHROPIC_API_KEY?.trim();
		if (params.opts?.token) {
			await setAnthropicApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		if (!hasCredential && envKey) {
			if (await params.prompter.confirm({
				message: `Use existing ANTHROPIC_API_KEY (env, ${formatApiKeyPreview(envKey)})?`,
				initialValue: true
			})) {
				await setAnthropicApiKey(envKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Anthropic API key",
				validate: validateApiKeyInput
			});
			await setAnthropicApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "anthropic:default",
			provider: "anthropic",
			mode: "api_key"
		});
		return { config: nextConfig };
	}
	return null;
}

//#endregion
//#region src/commands/model-allowlist.ts
init_defaults();
init_model_selection();
function ensureModelAllowlistEntry(params) {
	const rawModelRef = params.modelRef.trim();
	if (!rawModelRef) return params.cfg;
	const models = { ...params.cfg.agents?.defaults?.models };
	const keySet = new Set([rawModelRef]);
	const canonicalKey = resolveAllowlistModelKey(rawModelRef, params.defaultProvider ?? DEFAULT_PROVIDER);
	if (canonicalKey) keySet.add(canonicalKey);
	for (const key of keySet) models[key] = { ...models[key] };
	return {
		...params.cfg,
		agents: {
			...params.cfg.agents,
			defaults: {
				...params.cfg.agents?.defaults,
				models
			}
		}
	};
}

//#endregion
//#region src/commands/auth-choice.default-model.ts
async function applyDefaultModelChoice(params) {
	if (params.setDefaultModel) {
		const next = params.applyDefaultConfig(params.config);
		if (params.noteDefault) await params.prompter.note(`Default model set to ${params.noteDefault}`, "Model configured");
		return { config: next };
	}
	const nextWithModel = ensureModelAllowlistEntry({
		cfg: params.applyProviderConfig(params.config),
		modelRef: params.defaultModel
	});
	await params.noteAgentModel(params.defaultModel);
	return {
		config: nextWithModel,
		agentModelOverride: params.defaultModel
	};
}

//#endregion
//#region src/commands/google-gemini-model-default.ts
const GOOGLE_GEMINI_DEFAULT_MODEL = "google/gemini-3-pro-preview";
function resolvePrimaryModel$1(model) {
	if (typeof model === "string") return model;
	if (model && typeof model === "object" && typeof model.primary === "string") return model.primary;
}
function applyGoogleGeminiModelDefault(cfg) {
	if (resolvePrimaryModel$1(cfg.agents?.defaults?.model)?.trim() === GOOGLE_GEMINI_DEFAULT_MODEL) return {
		next: cfg,
		changed: false
	};
	return {
		next: {
			...cfg,
			agents: {
				...cfg.agents,
				defaults: {
					...cfg.agents?.defaults,
					model: cfg.agents?.defaults?.model && typeof cfg.agents.defaults.model === "object" ? {
						...cfg.agents.defaults.model,
						primary: GOOGLE_GEMINI_DEFAULT_MODEL
					} : { primary: GOOGLE_GEMINI_DEFAULT_MODEL }
				}
			}
		},
		changed: true
	};
}

//#endregion
//#region src/commands/opencode-zen-model-default.ts
const OPENCODE_ZEN_DEFAULT_MODEL = "opencode/claude-opus-4-6";

//#endregion
//#region src/commands/auth-choice.apply.api-providers.ts
init_auth_profiles();
init_model_auth();
async function applyAuthChoiceApiProviders(params) {
	let nextConfig = params.config;
	let agentModelOverride;
	const noteAgentModel = async (model) => {
		if (!params.agentId) return;
		await params.prompter.note(`Default model set to ${model} for agent "${params.agentId}".`, "Model configured");
	};
	let authChoice = params.authChoice;
	if (authChoice === "apiKey" && params.opts?.tokenProvider && params.opts.tokenProvider !== "anthropic" && params.opts.tokenProvider !== "openai") {
		if (params.opts.tokenProvider === "openrouter") authChoice = "openrouter-api-key";
		else if (params.opts.tokenProvider === "vercel-ai-gateway") authChoice = "ai-gateway-api-key";
		else if (params.opts.tokenProvider === "cloudflare-ai-gateway") authChoice = "cloudflare-ai-gateway-api-key";
		else if (params.opts.tokenProvider === "moonshot") authChoice = "moonshot-api-key";
		else if (params.opts.tokenProvider === "kimi-code" || params.opts.tokenProvider === "kimi-coding") authChoice = "kimi-code-api-key";
		else if (params.opts.tokenProvider === "google") authChoice = "gemini-api-key";
		else if (params.opts.tokenProvider === "zai") authChoice = "zai-api-key";
		else if (params.opts.tokenProvider === "xiaomi") authChoice = "xiaomi-api-key";
		else if (params.opts.tokenProvider === "synthetic") authChoice = "synthetic-api-key";
		else if (params.opts.tokenProvider === "venice") authChoice = "venice-api-key";
		else if (params.opts.tokenProvider === "opencode") authChoice = "opencode-zen";
		else if (params.opts.tokenProvider === "qianfan") authChoice = "qianfan-api-key";
	}
	if (authChoice === "openrouter-api-key") {
		const store = ensureAuthProfileStore(params.agentDir, { allowKeychainPrompt: false });
		const existingProfileId = resolveAuthProfileOrder({
			cfg: nextConfig,
			store,
			provider: "openrouter"
		}).find((profileId) => Boolean(store.profiles[profileId]));
		const existingCred = existingProfileId ? store.profiles[existingProfileId] : void 0;
		let profileId = "openrouter:default";
		let mode = "api_key";
		let hasCredential = false;
		if (existingProfileId && existingCred?.type) {
			profileId = existingProfileId;
			mode = existingCred.type === "oauth" ? "oauth" : existingCred.type === "token" ? "token" : "api_key";
			hasCredential = true;
		}
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "openrouter") {
			await setOpenrouterApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		if (!hasCredential) {
			const envKey = resolveEnvApiKey("openrouter");
			if (envKey) {
				if (await params.prompter.confirm({
					message: `Use existing OPENROUTER_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
					initialValue: true
				})) {
					await setOpenrouterApiKey(envKey.apiKey, params.agentDir);
					hasCredential = true;
				}
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter OpenRouter API key",
				validate: validateApiKeyInput
			});
			await setOpenrouterApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
			hasCredential = true;
		}
		if (hasCredential) nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId,
			provider: "openrouter",
			mode
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: OPENROUTER_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyOpenrouterConfig,
				applyProviderConfig: applyOpenrouterProviderConfig,
				noteDefault: OPENROUTER_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "ai-gateway-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "vercel-ai-gateway") {
			await setVercelAiGatewayApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("vercel-ai-gateway");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing AI_GATEWAY_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setVercelAiGatewayApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Vercel AI Gateway API key",
				validate: validateApiKeyInput
			});
			await setVercelAiGatewayApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "vercel-ai-gateway:default",
			provider: "vercel-ai-gateway",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyVercelAiGatewayConfig,
				applyProviderConfig: applyVercelAiGatewayProviderConfig,
				noteDefault: VERCEL_AI_GATEWAY_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "cloudflare-ai-gateway-api-key") {
		let hasCredential = false;
		let accountId = params.opts?.cloudflareAiGatewayAccountId?.trim() ?? "";
		let gatewayId = params.opts?.cloudflareAiGatewayGatewayId?.trim() ?? "";
		const ensureAccountGateway = async () => {
			if (!accountId) {
				const value = await params.prompter.text({
					message: "Enter Cloudflare Account ID",
					validate: (val) => String(val).trim() ? void 0 : "Account ID is required"
				});
				accountId = String(value).trim();
			}
			if (!gatewayId) {
				const value = await params.prompter.text({
					message: "Enter Cloudflare AI Gateway ID",
					validate: (val) => String(val).trim() ? void 0 : "Gateway ID is required"
				});
				gatewayId = String(value).trim();
			}
		};
		const optsApiKey = normalizeApiKeyInput(params.opts?.cloudflareAiGatewayApiKey ?? "");
		if (!hasCredential && accountId && gatewayId && optsApiKey) {
			await setCloudflareAiGatewayConfig(accountId, gatewayId, optsApiKey, params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("cloudflare-ai-gateway");
		if (!hasCredential && envKey) {
			if (await params.prompter.confirm({
				message: `Use existing CLOUDFLARE_AI_GATEWAY_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await ensureAccountGateway();
				await setCloudflareAiGatewayConfig(accountId, gatewayId, normalizeApiKeyInput(envKey.apiKey), params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential && optsApiKey) {
			await ensureAccountGateway();
			await setCloudflareAiGatewayConfig(accountId, gatewayId, optsApiKey, params.agentDir);
			hasCredential = true;
		}
		if (!hasCredential) {
			await ensureAccountGateway();
			const key = await params.prompter.text({
				message: "Enter Cloudflare AI Gateway API key",
				validate: validateApiKeyInput
			});
			await setCloudflareAiGatewayConfig(accountId, gatewayId, normalizeApiKeyInput(String(key)), params.agentDir);
			hasCredential = true;
		}
		if (hasCredential) nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "cloudflare-ai-gateway:default",
			provider: "cloudflare-ai-gateway",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF,
				applyDefaultConfig: (cfg) => applyCloudflareAiGatewayConfig(cfg, {
					accountId: accountId || params.opts?.cloudflareAiGatewayAccountId,
					gatewayId: gatewayId || params.opts?.cloudflareAiGatewayGatewayId
				}),
				applyProviderConfig: (cfg) => applyCloudflareAiGatewayProviderConfig(cfg, {
					accountId: accountId || params.opts?.cloudflareAiGatewayAccountId,
					gatewayId: gatewayId || params.opts?.cloudflareAiGatewayGatewayId
				}),
				noteDefault: CLOUDFLARE_AI_GATEWAY_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "moonshot-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "moonshot") {
			await setMoonshotApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("moonshot");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing MOONSHOT_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setMoonshotApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Moonshot API key",
				validate: validateApiKeyInput
			});
			await setMoonshotApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "moonshot:default",
			provider: "moonshot",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: MOONSHOT_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyMoonshotConfig,
				applyProviderConfig: applyMoonshotProviderConfig,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "moonshot-api-key-cn") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "moonshot") {
			await setMoonshotApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("moonshot");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing MOONSHOT_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setMoonshotApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Moonshot API key (.cn)",
				validate: validateApiKeyInput
			});
			await setMoonshotApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "moonshot:default",
			provider: "moonshot",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: MOONSHOT_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyMoonshotConfigCn,
				applyProviderConfig: applyMoonshotProviderConfigCn,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "kimi-code-api-key") {
		let hasCredential = false;
		const tokenProvider = params.opts?.tokenProvider?.trim().toLowerCase();
		if (!hasCredential && params.opts?.token && (tokenProvider === "kimi-code" || tokenProvider === "kimi-coding")) {
			await setKimiCodingApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		if (!hasCredential) await params.prompter.note(["Kimi Coding uses a dedicated endpoint and API key.", "Get your API key at: https://www.kimi.com/code/en"].join("\n"), "Kimi Coding");
		const envKey = resolveEnvApiKey("kimi-coding");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing KIMI_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setKimiCodingApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Kimi Coding API key",
				validate: validateApiKeyInput
			});
			await setKimiCodingApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "kimi-coding:default",
			provider: "kimi-coding",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: KIMI_CODING_MODEL_REF,
				applyDefaultConfig: applyKimiCodeConfig,
				applyProviderConfig: applyKimiCodeProviderConfig,
				noteDefault: KIMI_CODING_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "gemini-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "google") {
			await setGeminiApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("google");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing GEMINI_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setGeminiApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Gemini API key",
				validate: validateApiKeyInput
			});
			await setGeminiApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "google:default",
			provider: "google",
			mode: "api_key"
		});
		if (params.setDefaultModel) {
			const applied = applyGoogleGeminiModelDefault(nextConfig);
			nextConfig = applied.next;
			if (applied.changed) await params.prompter.note(`Default model set to ${GOOGLE_GEMINI_DEFAULT_MODEL}`, "Model configured");
		} else {
			agentModelOverride = GOOGLE_GEMINI_DEFAULT_MODEL;
			await noteAgentModel(GOOGLE_GEMINI_DEFAULT_MODEL);
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "zai-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "zai") {
			await setZaiApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("zai");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing ZAI_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setZaiApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Z.AI API key",
				validate: validateApiKeyInput
			});
			await setZaiApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "zai:default",
			provider: "zai",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: ZAI_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyZaiConfig,
				applyProviderConfig: (config) => ({
					...config,
					agents: {
						...config.agents,
						defaults: {
							...config.agents?.defaults,
							models: {
								...config.agents?.defaults?.models,
								[ZAI_DEFAULT_MODEL_REF]: {
									...config.agents?.defaults?.models?.[ZAI_DEFAULT_MODEL_REF],
									alias: config.agents?.defaults?.models?.[ZAI_DEFAULT_MODEL_REF]?.alias ?? "GLM"
								}
							}
						}
					}
				}),
				noteDefault: ZAI_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "xiaomi-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "xiaomi") {
			await setXiaomiApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("xiaomi");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing XIAOMI_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setXiaomiApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Xiaomi API key",
				validate: validateApiKeyInput
			});
			await setXiaomiApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "xiaomi:default",
			provider: "xiaomi",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: XIAOMI_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyXiaomiConfig,
				applyProviderConfig: applyXiaomiProviderConfig,
				noteDefault: XIAOMI_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "synthetic-api-key") {
		if (params.opts?.token && params.opts?.tokenProvider === "synthetic") await setSyntheticApiKey(String(params.opts.token).trim(), params.agentDir);
		else {
			const key = await params.prompter.text({
				message: "Enter Synthetic API key",
				validate: (value) => value?.trim() ? void 0 : "Required"
			});
			await setSyntheticApiKey(String(key).trim(), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "synthetic:default",
			provider: "synthetic",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: SYNTHETIC_DEFAULT_MODEL_REF,
				applyDefaultConfig: applySyntheticConfig,
				applyProviderConfig: applySyntheticProviderConfig,
				noteDefault: SYNTHETIC_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "venice-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "venice") {
			await setVeniceApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		if (!hasCredential) await params.prompter.note([
			"Venice AI provides privacy-focused inference with uncensored models.",
			"Get your API key at: https://venice.ai/settings/api",
			"Supports 'private' (fully private) and 'anonymized' (proxy) modes."
		].join("\n"), "Venice AI");
		const envKey = resolveEnvApiKey("venice");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing VENICE_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setVeniceApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter Venice AI API key",
				validate: validateApiKeyInput
			});
			await setVeniceApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "venice:default",
			provider: "venice",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: VENICE_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyVeniceConfig,
				applyProviderConfig: applyVeniceProviderConfig,
				noteDefault: VENICE_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "opencode-zen") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "opencode") {
			await setOpencodeZenApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		if (!hasCredential) await params.prompter.note([
			"OpenCode Zen provides access to Claude, GPT, Gemini, and more models.",
			"Get your API key at: https://opencode.ai/auth",
			"OpenCode Zen bills per request. Check your OpenCode dashboard for details."
		].join("\n"), "OpenCode Zen");
		const envKey = resolveEnvApiKey("opencode");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing OPENCODE_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setOpencodeZenApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter OpenCode Zen API key",
				validate: validateApiKeyInput
			});
			await setOpencodeZenApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "opencode:default",
			provider: "opencode",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: OPENCODE_ZEN_DEFAULT_MODEL,
				applyDefaultConfig: applyOpencodeZenConfig,
				applyProviderConfig: applyOpencodeZenProviderConfig,
				noteDefault: OPENCODE_ZEN_DEFAULT_MODEL,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "siliconflow-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "siliconflow") {
			await setSiliconflowApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("siliconflow");
		if (envKey && !hasCredential) {
			if (await params.prompter.confirm({
				message: `Use existing SILICONFLOW_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setSiliconflowApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter SiliconFlow API key",
				validate: validateApiKeyInput
			});
			await setSiliconflowApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "siliconflow:default",
			provider: "siliconflow",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: SILICONFLOW_DEFAULT_MODEL_REF,
				applyDefaultConfig: applySiliconflowConfig,
				applyProviderConfig: applySiliconflowProviderConfig,
				noteDefault: SILICONFLOW_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "dashscope-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "dashscope") {
			await setDashscopeApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("dashscope");
		if (envKey && !hasCredential) {
			if (await params.prompter.confirm({
				message: `Use existing DASHSCOPE_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setDashscopeApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter DashScope API key",
				validate: validateApiKeyInput
			});
			await setDashscopeApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "dashscope:default",
			provider: "dashscope",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: DASHSCOPE_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyDashscopeConfig,
				applyProviderConfig: applyDashscopeProviderConfig,
				noteDefault: DASHSCOPE_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "deepseek-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "deepseek") {
			await setDeepseekApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		const envKey = resolveEnvApiKey("deepseek");
		if (envKey && !hasCredential) {
			if (await params.prompter.confirm({
				message: `Use existing DEEPSEEK_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setDeepseekApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter DeepSeek API key",
				validate: validateApiKeyInput
			});
			await setDeepseekApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "deepseek:default",
			provider: "deepseek",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: DEEPSEEK_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyDeepseekConfig,
				applyProviderConfig: applyDeepseekProviderConfig,
				noteDefault: DEEPSEEK_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (authChoice === "qianfan-api-key") {
		let hasCredential = false;
		if (!hasCredential && params.opts?.token && params.opts?.tokenProvider === "qianfan") {
			setQianfanApiKey(normalizeApiKeyInput(params.opts.token), params.agentDir);
			hasCredential = true;
		}
		if (!hasCredential) await params.prompter.note(["Get your API key at: https://console.bce.baidu.com/qianfan/ais/console/apiKey", "API key format: bce-v3/ALTAK-..."].join("\n"), "QIANFAN");
		const envKey = resolveEnvApiKey("qianfan");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing QIANFAN_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				setQianfanApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter QIANFAN API key",
				validate: validateApiKeyInput
			});
			setQianfanApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "qianfan:default",
			provider: "qianfan",
			mode: "api_key"
		});
		{
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: QIANFAN_DEFAULT_MODEL_REF,
				applyDefaultConfig: applyQianfanConfig,
				applyProviderConfig: applyQianfanProviderConfig,
				noteDefault: QIANFAN_DEFAULT_MODEL_REF,
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	return null;
}

//#endregion
//#region src/commands/auth-choice.apply.plugin-provider.ts
init_agent_paths();
init_agent_scope();
init_auth_profiles();
init_model_selection();
init_workspace();
function resolveProviderMatch(providers, rawProvider) {
	const normalized = normalizeProviderId(rawProvider);
	return providers.find((provider) => normalizeProviderId(provider.id) === normalized) ?? providers.find((provider) => provider.aliases?.some((alias) => normalizeProviderId(alias) === normalized) ?? false) ?? null;
}
function pickAuthMethod(provider, rawMethod) {
	const raw = rawMethod?.trim();
	if (!raw) return null;
	const normalized = raw.toLowerCase();
	return provider.auth.find((method) => method.id.toLowerCase() === normalized) ?? provider.auth.find((method) => method.label.toLowerCase() === normalized) ?? null;
}
function isPlainRecord(value) {
	return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
function mergeConfigPatch(base, patch) {
	if (!isPlainRecord(base) || !isPlainRecord(patch)) return patch;
	const next = { ...base };
	for (const [key, value] of Object.entries(patch)) {
		const existing = next[key];
		if (isPlainRecord(existing) && isPlainRecord(value)) next[key] = mergeConfigPatch(existing, value);
		else next[key] = value;
	}
	return next;
}
function applyDefaultModel(cfg, model) {
	const models = { ...cfg.agents?.defaults?.models };
	models[model] = models[model] ?? {};
	const existingModel = cfg.agents?.defaults?.model;
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...cfg.agents?.defaults,
				models,
				model: {
					...existingModel && typeof existingModel === "object" && "fallbacks" in existingModel ? { fallbacks: existingModel.fallbacks } : void 0,
					primary: model
				}
			}
		}
	};
}
async function applyAuthChoicePluginProvider(params, options) {
	if (params.authChoice !== options.authChoice) return null;
	const enableResult = enablePluginInConfig(params.config, options.pluginId);
	let nextConfig = enableResult.config;
	if (!enableResult.enabled) {
		await params.prompter.note(`${options.label} plugin is disabled (${enableResult.reason ?? "blocked"}).`, options.label);
		return { config: nextConfig };
	}
	const agentId = params.agentId ?? resolveDefaultAgentId(nextConfig);
	const defaultAgentId = resolveDefaultAgentId(nextConfig);
	const agentDir = params.agentDir ?? (agentId === defaultAgentId ? resolveOpenClawAgentDir() : resolveAgentDir(nextConfig, agentId));
	const workspaceDir = resolveAgentWorkspaceDir(nextConfig, agentId) ?? resolveDefaultAgentWorkspaceDir();
	const provider = resolveProviderMatch(resolvePluginProviders({
		config: nextConfig,
		workspaceDir
	}), options.providerId);
	if (!provider) {
		await params.prompter.note(`${options.label} auth plugin is not available. Enable it and re-run the wizard.`, options.label);
		return { config: nextConfig };
	}
	const method = pickAuthMethod(provider, options.methodId) ?? provider.auth[0];
	if (!method) {
		await params.prompter.note(`${options.label} auth method missing.`, options.label);
		return { config: nextConfig };
	}
	const isRemote = isRemoteEnvironment();
	const result = await method.run({
		config: nextConfig,
		agentDir,
		workspaceDir,
		prompter: params.prompter,
		runtime: params.runtime,
		isRemote,
		openUrl: async (url) => {
			await openUrl(url);
		},
		oauth: { createVpsAwareHandlers: (opts) => createVpsAwareOAuthHandlers(opts) }
	});
	if (result.configPatch) nextConfig = mergeConfigPatch(nextConfig, result.configPatch);
	for (const profile of result.profiles) {
		upsertAuthProfile({
			profileId: profile.profileId,
			credential: profile.credential,
			agentDir
		});
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: profile.profileId,
			provider: profile.credential.provider,
			mode: profile.credential.type === "token" ? "token" : profile.credential.type,
			..."email" in profile.credential && profile.credential.email ? { email: profile.credential.email } : {}
		});
	}
	let agentModelOverride;
	if (result.defaultModel) {
		if (params.setDefaultModel) {
			nextConfig = applyDefaultModel(nextConfig, result.defaultModel);
			await params.prompter.note(`Default model set to ${result.defaultModel}`, "Model configured");
		} else if (params.agentId) {
			agentModelOverride = result.defaultModel;
			await params.prompter.note(`Default model set to ${result.defaultModel} for agent "${params.agentId}".`, "Model configured");
		}
	}
	if (result.notes && result.notes.length > 0) await params.prompter.note(result.notes.join("\n"), "Provider notes");
	return {
		config: nextConfig,
		agentModelOverride
	};
}

//#endregion
//#region src/commands/auth-choice.apply.copilot-proxy.ts
async function applyAuthChoiceCopilotProxy(params) {
	return await applyAuthChoicePluginProvider(params, {
		authChoice: "copilot-proxy",
		pluginId: "copilot-proxy",
		providerId: "copilot-proxy",
		methodId: "local",
		label: "Copilot Proxy"
	});
}

//#endregion
//#region src/commands/auth-choice.apply.github-copilot.ts
async function applyAuthChoiceGitHubCopilot(params) {
	if (params.authChoice !== "github-copilot") return null;
	let nextConfig = params.config;
	await params.prompter.note(["This will open a GitHub device login to authorize Copilot.", "Requires an active GitHub Copilot subscription."].join("\n"), "GitHub Copilot");
	if (!process.stdin.isTTY) {
		await params.prompter.note("GitHub Copilot login requires an interactive TTY.", "GitHub Copilot");
		return { config: nextConfig };
	}
	try {
		await githubCopilotLoginCommand({ yes: true }, params.runtime);
	} catch (err) {
		await params.prompter.note(`GitHub Copilot login failed: ${String(err)}`, "GitHub Copilot");
		return { config: nextConfig };
	}
	nextConfig = applyAuthProfileConfig(nextConfig, {
		profileId: "github-copilot:github",
		provider: "github-copilot",
		mode: "token"
	});
	if (params.setDefaultModel) {
		const model = "github-copilot/gpt-4o";
		nextConfig = {
			...nextConfig,
			agents: {
				...nextConfig.agents,
				defaults: {
					...nextConfig.agents?.defaults,
					model: {
						...typeof nextConfig.agents?.defaults?.model === "object" ? nextConfig.agents.defaults.model : void 0,
						primary: model
					}
				}
			}
		};
		await params.prompter.note(`Default model set to ${model}`, "Model configured");
	}
	return { config: nextConfig };
}

//#endregion
//#region src/commands/auth-choice.apply.google-antigravity.ts
async function applyAuthChoiceGoogleAntigravity(params) {
	return await applyAuthChoicePluginProvider(params, {
		authChoice: "google-antigravity",
		pluginId: "google-antigravity-auth",
		providerId: "google-antigravity",
		methodId: "oauth",
		label: "Google Antigravity"
	});
}

//#endregion
//#region src/commands/auth-choice.apply.google-gemini-cli.ts
async function applyAuthChoiceGoogleGeminiCli(params) {
	return await applyAuthChoicePluginProvider(params, {
		authChoice: "google-gemini-cli",
		pluginId: "google-gemini-cli-auth",
		providerId: "google-gemini-cli",
		methodId: "oauth",
		label: "Google Gemini CLI"
	});
}

//#endregion
//#region src/commands/auth-choice.apply.minimax.ts
init_model_auth();
async function applyAuthChoiceMiniMax(params) {
	let nextConfig = params.config;
	let agentModelOverride;
	const noteAgentModel = async (model) => {
		if (!params.agentId) return;
		await params.prompter.note(`Default model set to ${model} for agent "${params.agentId}".`, "Model configured");
	};
	if (params.authChoice === "minimax-portal") return await applyAuthChoicePluginProvider(params, {
		authChoice: "minimax-portal",
		pluginId: "minimax-portal-auth",
		providerId: "minimax-portal",
		methodId: await params.prompter.select({
			message: "Select MiniMax endpoint",
			options: [{
				value: "oauth",
				label: "Global",
				hint: "OAuth for international users"
			}, {
				value: "oauth-cn",
				label: "CN",
				hint: "OAuth for users in China"
			}]
		}),
		label: "MiniMax"
	});
	if (params.authChoice === "minimax-cloud" || params.authChoice === "minimax-api" || params.authChoice === "minimax-api-lightning") {
		const modelId = params.authChoice === "minimax-api-lightning" ? "MiniMax-M2.1-lightning" : "MiniMax-M2.1";
		let hasCredential = false;
		const envKey = resolveEnvApiKey("minimax");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing MINIMAX_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				await setMinimaxApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
		if (!hasCredential) {
			const key = await params.prompter.text({
				message: "Enter MiniMax API key",
				validate: validateApiKeyInput
			});
			await setMinimaxApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
		}
		nextConfig = applyAuthProfileConfig(nextConfig, {
			profileId: "minimax:default",
			provider: "minimax",
			mode: "api_key"
		});
		{
			const modelRef = `minimax/${modelId}`;
			const applied = await applyDefaultModelChoice({
				config: nextConfig,
				setDefaultModel: params.setDefaultModel,
				defaultModel: modelRef,
				applyDefaultConfig: (config) => applyMinimaxApiConfig(config, modelId),
				applyProviderConfig: (config) => applyMinimaxApiProviderConfig(config, modelId),
				noteAgentModel,
				prompter: params.prompter
			});
			nextConfig = applied.config;
			agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (params.authChoice === "minimax") {
		const applied = await applyDefaultModelChoice({
			config: nextConfig,
			setDefaultModel: params.setDefaultModel,
			defaultModel: "lmstudio/minimax-m2.1-gs32",
			applyDefaultConfig: applyMinimaxConfig,
			applyProviderConfig: applyMinimaxProviderConfig,
			noteAgentModel,
			prompter: params.prompter
		});
		nextConfig = applied.config;
		agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	return null;
}

//#endregion
//#region src/commands/chutes-oauth.ts
init_chutes_oauth();
function buildAuthorizeUrl(params) {
	return `${CHUTES_AUTHORIZE_ENDPOINT}?${new URLSearchParams({
		client_id: params.clientId,
		redirect_uri: params.redirectUri,
		response_type: "code",
		scope: params.scopes.join(" "),
		state: params.state,
		code_challenge: params.challenge,
		code_challenge_method: "S256"
	}).toString()}`;
}
async function waitForLocalCallback(params) {
	const redirectUrl = new URL(params.redirectUri);
	if (redirectUrl.protocol !== "http:") throw new Error(`Chutes OAuth redirect URI must be http:// (got ${params.redirectUri})`);
	const hostname = redirectUrl.hostname || "127.0.0.1";
	const port = redirectUrl.port ? Number.parseInt(redirectUrl.port, 10) : 80;
	const expectedPath = redirectUrl.pathname || "/";
	return await new Promise((resolve, reject) => {
		let timeout = null;
		const server = createServer((req, res) => {
			try {
				const requestUrl = new URL(req.url ?? "/", redirectUrl.origin);
				if (requestUrl.pathname !== expectedPath) {
					res.statusCode = 404;
					res.setHeader("Content-Type", "text/plain; charset=utf-8");
					res.end("Not found");
					return;
				}
				const code = requestUrl.searchParams.get("code")?.trim();
				const state = requestUrl.searchParams.get("state")?.trim();
				if (!code) {
					res.statusCode = 400;
					res.setHeader("Content-Type", "text/plain; charset=utf-8");
					res.end("Missing code");
					return;
				}
				if (!state || state !== params.expectedState) {
					res.statusCode = 400;
					res.setHeader("Content-Type", "text/plain; charset=utf-8");
					res.end("Invalid state");
					return;
				}
				res.statusCode = 200;
				res.setHeader("Content-Type", "text/html; charset=utf-8");
				res.end([
					"<!doctype html>",
					"<html><head><meta charset='utf-8' /></head>",
					"<body><h2>Chutes OAuth complete</h2>",
					"<p>You can close this window and return to OpenClaw.</p></body></html>"
				].join(""));
				if (timeout) clearTimeout(timeout);
				server.close();
				resolve({
					code,
					state
				});
			} catch (err) {
				if (timeout) clearTimeout(timeout);
				server.close();
				reject(err);
			}
		});
		server.once("error", (err) => {
			if (timeout) clearTimeout(timeout);
			server.close();
			reject(err);
		});
		server.listen(port, hostname, () => {
			params.onProgress?.(`Waiting for OAuth callback on ${redirectUrl.origin}${expectedPath}…`);
		});
		timeout = setTimeout(() => {
			try {
				server.close();
			} catch {}
			reject(/* @__PURE__ */ new Error("OAuth callback timeout"));
		}, params.timeoutMs);
	});
}
async function loginChutes(params) {
	const createPkce = params.createPkce ?? generateChutesPkce;
	const createState = params.createState ?? (() => randomBytes(16).toString("hex"));
	const { verifier, challenge } = createPkce();
	const state = createState();
	const timeoutMs = params.timeoutMs ?? 180 * 1e3;
	const url = buildAuthorizeUrl({
		clientId: params.app.clientId,
		redirectUri: params.app.redirectUri,
		scopes: params.app.scopes,
		state,
		challenge
	});
	let codeAndState;
	if (params.manual) {
		await params.onAuth({ url });
		params.onProgress?.("Waiting for redirect URL…");
		const input = await params.onPrompt({
			message: "Paste the redirect URL (or authorization code)",
			placeholder: `${params.app.redirectUri}?code=...&state=...`
		});
		const parsed = parseOAuthCallbackInput(String(input), state);
		if ("error" in parsed) throw new Error(parsed.error);
		if (parsed.state !== state) throw new Error("Invalid OAuth state");
		codeAndState = parsed;
	} else {
		const callback = waitForLocalCallback({
			redirectUri: params.app.redirectUri,
			expectedState: state,
			timeoutMs,
			onProgress: params.onProgress
		}).catch(async () => {
			params.onProgress?.("OAuth callback not detected; paste redirect URL…");
			const input = await params.onPrompt({
				message: "Paste the redirect URL (or authorization code)",
				placeholder: `${params.app.redirectUri}?code=...&state=...`
			});
			const parsed = parseOAuthCallbackInput(String(input), state);
			if ("error" in parsed) throw new Error(parsed.error);
			if (parsed.state !== state) throw new Error("Invalid OAuth state");
			return parsed;
		});
		await params.onAuth({ url });
		codeAndState = await callback;
	}
	params.onProgress?.("Exchanging code for tokens…");
	return await exchangeChutesCodeForTokens({
		app: params.app,
		code: codeAndState.code,
		codeVerifier: verifier,
		fetchFn: params.fetchFn
	});
}

//#endregion
//#region src/commands/auth-choice.apply.oauth.ts
async function applyAuthChoiceOAuth(params) {
	if (params.authChoice === "chutes") {
		let nextConfig = params.config;
		const isRemote = isRemoteEnvironment();
		const redirectUri = process.env.CHUTES_OAUTH_REDIRECT_URI?.trim() || "http://127.0.0.1:1456/oauth-callback";
		const scopes = process.env.CHUTES_OAUTH_SCOPES?.trim() || "openid profile chutes:invoke";
		const clientId = process.env.CHUTES_CLIENT_ID?.trim() || String(await params.prompter.text({
			message: "Enter Chutes OAuth client id",
			placeholder: "cid_xxx",
			validate: (value) => value?.trim() ? void 0 : "Required"
		})).trim();
		const clientSecret = process.env.CHUTES_CLIENT_SECRET?.trim() || void 0;
		await params.prompter.note(isRemote ? [
			"You are running in a remote/VPS environment.",
			"A URL will be shown for you to open in your LOCAL browser.",
			"After signing in, paste the redirect URL back here.",
			"",
			`Redirect URI: ${redirectUri}`
		].join("\n") : [
			"Browser will open for Chutes authentication.",
			"If the callback doesn't auto-complete, paste the redirect URL.",
			"",
			`Redirect URI: ${redirectUri}`
		].join("\n"), "Chutes OAuth");
		const spin = params.prompter.progress("Starting OAuth flow…");
		try {
			const { onAuth, onPrompt } = createVpsAwareOAuthHandlers({
				isRemote,
				prompter: params.prompter,
				runtime: params.runtime,
				spin,
				openUrl,
				localBrowserMessage: "Complete sign-in in browser…"
			});
			const creds = await loginChutes({
				app: {
					clientId,
					clientSecret,
					redirectUri,
					scopes: scopes.split(/\s+/).filter(Boolean)
				},
				manual: isRemote,
				onAuth,
				onPrompt,
				onProgress: (msg) => spin.update(msg)
			});
			spin.stop("Chutes OAuth complete");
			const profileId = `chutes:${typeof creds.email === "string" && creds.email.trim() ? creds.email.trim() : "default"}`;
			await writeOAuthCredentials("chutes", creds, params.agentDir);
			nextConfig = applyAuthProfileConfig(nextConfig, {
				profileId,
				provider: "chutes",
				mode: "oauth"
			});
		} catch (err) {
			spin.stop("Chutes OAuth failed");
			params.runtime.error(String(err));
			await params.prompter.note([
				"Trouble with OAuth?",
				"Verify CHUTES_CLIENT_ID (and CHUTES_CLIENT_SECRET if required).",
				`Verify the OAuth app redirect URI includes: ${redirectUri}`,
				"Chutes docs: https://chutes.ai/docs/sign-in-with-chutes/overview"
			].join("\n"), "OAuth help");
		}
		return { config: nextConfig };
	}
	return null;
}

//#endregion
//#region src/infra/env-file.ts
init_utils();
function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function upsertSharedEnvVar(params) {
	const dir = resolveConfigDir(params.env ?? process.env);
	const filepath = path.join(dir, ".env");
	const key = params.key.trim();
	const value = params.value;
	let raw = "";
	if (fs.existsSync(filepath)) raw = fs.readFileSync(filepath, "utf8");
	const lines = raw.length ? raw.split(/\r?\n/) : [];
	const matcher = new RegExp(`^(\\s*(?:export\\s+)?)${escapeRegExp(key)}\\s*=`);
	let updated = false;
	let replaced = false;
	const nextLines = lines.map((line) => {
		const match = line.match(matcher);
		if (!match) return line;
		replaced = true;
		const next = `${match[1] ?? ""}${key}=${value}`;
		if (next !== line) updated = true;
		return next;
	});
	if (!replaced) {
		nextLines.push(`${key}=${value}`);
		updated = true;
	}
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
		recursive: true,
		mode: 448
	});
	const output = `${nextLines.join("\n")}\n`;
	fs.writeFileSync(filepath, output, "utf8");
	fs.chmodSync(filepath, 384);
	return {
		path: filepath,
		updated,
		created: !raw
	};
}

//#endregion
//#region src/commands/openai-codex-model-default.ts
const OPENAI_CODEX_DEFAULT_MODEL = "openai-codex/gpt-5.3-codex";
function shouldSetOpenAICodexModel(model) {
	const trimmed = model?.trim();
	if (!trimmed) return true;
	const normalized = trimmed.toLowerCase();
	if (normalized.startsWith("openai-codex/")) return false;
	if (normalized.startsWith("openai/")) return true;
	return normalized === "gpt" || normalized === "gpt-mini";
}
function resolvePrimaryModel(model) {
	if (typeof model === "string") return model;
	if (model && typeof model === "object" && typeof model.primary === "string") return model.primary;
}
function applyOpenAICodexModelDefault(cfg) {
	if (!shouldSetOpenAICodexModel(resolvePrimaryModel(cfg.agents?.defaults?.model))) return {
		next: cfg,
		changed: false
	};
	return {
		next: {
			...cfg,
			agents: {
				...cfg.agents,
				defaults: {
					...cfg.agents?.defaults,
					model: cfg.agents?.defaults?.model && typeof cfg.agents.defaults.model === "object" ? {
						...cfg.agents.defaults.model,
						primary: OPENAI_CODEX_DEFAULT_MODEL
					} : { primary: OPENAI_CODEX_DEFAULT_MODEL }
				}
			}
		},
		changed: true
	};
}

//#endregion
//#region src/commands/openai-model-default.ts
const OPENAI_DEFAULT_MODEL = "openai/gpt-5.1-codex";
function applyOpenAIProviderConfig(cfg) {
	const next = ensureModelAllowlistEntry({
		cfg,
		modelRef: OPENAI_DEFAULT_MODEL
	});
	const models = { ...next.agents?.defaults?.models };
	models[OPENAI_DEFAULT_MODEL] = {
		...models[OPENAI_DEFAULT_MODEL],
		alias: models[OPENAI_DEFAULT_MODEL]?.alias ?? "GPT"
	};
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				models
			}
		}
	};
}
function applyOpenAIConfig(cfg) {
	const next = applyOpenAIProviderConfig(cfg);
	return {
		...next,
		agents: {
			...next.agents,
			defaults: {
				...next.agents?.defaults,
				model: next.agents?.defaults?.model && typeof next.agents.defaults.model === "object" ? {
					...next.agents.defaults.model,
					primary: OPENAI_DEFAULT_MODEL
				} : { primary: OPENAI_DEFAULT_MODEL }
			}
		}
	};
}

//#endregion
//#region src/commands/auth-choice.apply.openai.ts
init_model_auth();
async function applyAuthChoiceOpenAI(params) {
	let authChoice = params.authChoice;
	if (authChoice === "apiKey" && params.opts?.tokenProvider === "openai") authChoice = "openai-api-key";
	if (authChoice === "openai-api-key") {
		let nextConfig = params.config;
		let agentModelOverride;
		const noteAgentModel = async (model) => {
			if (!params.agentId) return;
			await params.prompter.note(`Default model set to ${model} for agent "${params.agentId}".`, "Model configured");
		};
		const envKey = resolveEnvApiKey("openai");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing OPENAI_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				const result = upsertSharedEnvVar({
					key: "OPENAI_API_KEY",
					value: envKey.apiKey
				});
				if (!process.env.OPENAI_API_KEY) process.env.OPENAI_API_KEY = envKey.apiKey;
				await params.prompter.note(`Copied OPENAI_API_KEY to ${result.path} for launchd compatibility.`, "OpenAI API key");
				const applied = await applyDefaultModelChoice({
					config: nextConfig,
					setDefaultModel: params.setDefaultModel,
					defaultModel: OPENAI_DEFAULT_MODEL,
					applyDefaultConfig: applyOpenAIConfig,
					applyProviderConfig: applyOpenAIProviderConfig,
					noteDefault: OPENAI_DEFAULT_MODEL,
					noteAgentModel,
					prompter: params.prompter
				});
				nextConfig = applied.config;
				agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
				return {
					config: nextConfig,
					agentModelOverride
				};
			}
		}
		let key;
		if (params.opts?.token && params.opts?.tokenProvider === "openai") key = params.opts.token;
		else key = await params.prompter.text({
			message: "Enter OpenAI API key",
			validate: validateApiKeyInput
		});
		const trimmed = normalizeApiKeyInput(String(key));
		const result = upsertSharedEnvVar({
			key: "OPENAI_API_KEY",
			value: trimmed
		});
		process.env.OPENAI_API_KEY = trimmed;
		await params.prompter.note(`Saved OPENAI_API_KEY to ${result.path} for launchd compatibility.`, "OpenAI API key");
		const applied = await applyDefaultModelChoice({
			config: nextConfig,
			setDefaultModel: params.setDefaultModel,
			defaultModel: OPENAI_DEFAULT_MODEL,
			applyDefaultConfig: applyOpenAIConfig,
			applyProviderConfig: applyOpenAIProviderConfig,
			noteDefault: OPENAI_DEFAULT_MODEL,
			noteAgentModel,
			prompter: params.prompter
		});
		nextConfig = applied.config;
		agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	if (params.authChoice === "openai-codex") {
		let nextConfig = params.config;
		let agentModelOverride;
		const noteAgentModel = async (model) => {
			if (!params.agentId) return;
			await params.prompter.note(`Default model set to ${model} for agent "${params.agentId}".`, "Model configured");
		};
		const isRemote = isRemoteEnvironment();
		await params.prompter.note(isRemote ? [
			"You are running in a remote/VPS environment.",
			"A URL will be shown for you to open in your LOCAL browser.",
			"After signing in, paste the redirect URL back here."
		].join("\n") : [
			"Browser will open for OpenAI authentication.",
			"If the callback doesn't auto-complete, paste the redirect URL.",
			"OpenAI OAuth uses localhost:1455 for the callback."
		].join("\n"), "OpenAI Codex OAuth");
		const spin = params.prompter.progress("Starting OAuth flow…");
		try {
			const { onAuth, onPrompt } = createVpsAwareOAuthHandlers({
				isRemote,
				prompter: params.prompter,
				runtime: params.runtime,
				spin,
				openUrl,
				localBrowserMessage: "Complete sign-in in browser…"
			});
			const creds = await loginOpenAICodex({
				onAuth,
				onPrompt,
				onProgress: (msg) => spin.update(msg)
			});
			spin.stop("OpenAI OAuth complete");
			if (creds) {
				await writeOAuthCredentials("openai-codex", creds, params.agentDir);
				nextConfig = applyAuthProfileConfig(nextConfig, {
					profileId: "openai-codex:default",
					provider: "openai-codex",
					mode: "oauth"
				});
				if (params.setDefaultModel) {
					const applied = applyOpenAICodexModelDefault(nextConfig);
					nextConfig = applied.next;
					if (applied.changed) await params.prompter.note(`Default model set to ${OPENAI_CODEX_DEFAULT_MODEL}`, "Model configured");
				} else {
					agentModelOverride = OPENAI_CODEX_DEFAULT_MODEL;
					await noteAgentModel(OPENAI_CODEX_DEFAULT_MODEL);
				}
			}
		} catch (err) {
			spin.stop("OpenAI OAuth failed");
			params.runtime.error(String(err));
			await params.prompter.note("Trouble with OAuth? See https://docs.openclaw.ai/start/faq", "OAuth help");
		}
		return {
			config: nextConfig,
			agentModelOverride
		};
	}
	return null;
}

//#endregion
//#region src/commands/auth-choice.apply.qwen-portal.ts
async function applyAuthChoiceQwenPortal(params) {
	return await applyAuthChoicePluginProvider(params, {
		authChoice: "qwen-portal",
		pluginId: "qwen-portal-auth",
		providerId: "qwen-portal",
		methodId: "device",
		label: "Qwen"
	});
}

//#endregion
//#region src/commands/auth-choice.apply.volcengine.ts
init_model_auth();
init_models_config_providers();
async function applyAuthChoiceVolcengine(params) {
	if (params.authChoice !== "volcengine-api-key") return null;
	let apiKey = resolveEnvApiKey("volcengine")?.apiKey;
	if (params.opts?.tokenProvider === "volcengine" && params.opts?.token) apiKey = params.opts.token;
	if (params.opts?.volcengineApiKey) apiKey = params.opts.volcengineApiKey;
	if (apiKey) {
		if (!await params.prompter.confirm({
			message: `Use existing VOLCENGINE_API_KEY (${formatApiKeyPreview(apiKey)})?`,
			initialValue: true
		})) apiKey = void 0;
	}
	if (!apiKey) {
		const input = await params.prompter.text({
			message: "请输入火山引擎 (ARK) API key",
			validate: validateApiKeyInput
		});
		if (typeof input === "symbol") return null;
		apiKey = normalizeApiKeyInput(String(input));
	}
	await setVolcengineApiKey(apiKey, params.agentDir);
	let modelId = null;
	let selectionMessage = "Select a model (Auto-verified)";
	const verifyModelAccess = async (id) => {
		const verifySpin = params.prompter.progress(`Verifying access to ${id} (10s timeout)...`);
		try {
			const headers = {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			};
			if (process.env.MODEL_AGENT_CLIENT_REQ_ID && process.env.MODEL_AGENT_CLIENT_REQ_VALUE) headers[process.env.MODEL_AGENT_CLIENT_REQ_ID] = process.env.MODEL_AGENT_CLIENT_REQ_VALUE;
			const res = await fetch(`${VOLCENGINE_API_BASE_URL}/chat/completions`, {
				method: "POST",
				headers,
				body: JSON.stringify({
					model: id,
					messages: [{
						role: "user",
						content: "hi"
					}],
					max_tokens: 1,
					stream: false
				}),
				signal: AbortSignal.timeout(1e4)
			});
			if (!res.ok) {
				const errMsg = (await res.json().catch(() => ({})))?.error?.message || res.statusText;
				throw new Error(errMsg);
			}
			verifySpin.stop(`Access verified: ${id}`);
			return true;
		} catch (err) {
			verifySpin.stop("Access denied or potential timeout");
			await params.prompter.note(`Model "${id}" verification failed:\n${err.message}\n\nTip: You may need to create an Endpoint in ARK console or enable Pay-as-you-go.`, "Validation Error");
			return false;
		}
	};
	while (!modelId) {
		const choices = [...[
			"glm-4-7-251222",
			"doubao-seed-1-8-251228",
			"deepseek-v3-2-251201",
			"kimi-k2-thinking-251104"
		].map((id) => ({
			value: id,
			label: id,
			hint: "Predefined"
		})), {
			value: "__manual__",
			label: "Enter Manually (e.g. Endpoint ID ep-2025...)",
			hint: "Use this if your Endpoint is not listed"
		}];
		const selection = await params.prompter.select({
			message: selectionMessage,
			options: choices
		});
		if (typeof selection === "symbol") return null;
		let candidateId;
		if (selection === "__manual__") {
			const input = await params.prompter.text({
				message: "Enter Endpoint ID (e.g. ep-20250604...)",
				validate: (val) => val.length > 0 ? void 0 : "Endpoint ID is required"
			});
			if (typeof input === "symbol") return null;
			candidateId = String(input);
		} else candidateId = String(selection);
		if (await verifyModelAccess(candidateId)) modelId = candidateId;
		else selectionMessage = "Access Denied - Please ensure you have activated this model/endpoint in ARK Console";
	}
	let nextConfig = applyAuthProfileConfig(params.config, {
		profileId: "volcengine:default",
		provider: "volcengine",
		mode: "api_key"
	});
	if (params.agentId) nextConfig = {
		...nextConfig,
		agents: {
			...nextConfig.agents,
			defaults: {
				...nextConfig.agents?.defaults,
				model: {
					...nextConfig.agents?.defaults?.model,
					primary: `volcengine/${modelId}`
				}
			}
		}
	};
	else nextConfig = {
		...nextConfig,
		agents: {
			...nextConfig.agents,
			defaults: {
				...nextConfig.agents?.defaults,
				model: {
					...nextConfig.agents?.defaults?.model,
					primary: `volcengine/${modelId}`
				}
			}
		}
	};
	return {
		config: nextConfig,
		agentModelOverride: modelId
	};
}

//#endregion
//#region src/commands/auth-choice.apply.xai.ts
init_model_auth();
async function applyAuthChoiceXAI(params) {
	if (params.authChoice !== "xai-api-key") return null;
	let nextConfig = params.config;
	let agentModelOverride;
	const noteAgentModel = async (model) => {
		if (!params.agentId) return;
		await params.prompter.note(`Default model set to ${model} for agent "${params.agentId}".`, "Model configured");
	};
	let hasCredential = false;
	const optsKey = params.opts?.xaiApiKey?.trim();
	if (optsKey) {
		setXaiApiKey(normalizeApiKeyInput(optsKey), params.agentDir);
		hasCredential = true;
	}
	if (!hasCredential) {
		const envKey = resolveEnvApiKey("xai");
		if (envKey) {
			if (await params.prompter.confirm({
				message: `Use existing XAI_API_KEY (${envKey.source}, ${formatApiKeyPreview(envKey.apiKey)})?`,
				initialValue: true
			})) {
				setXaiApiKey(envKey.apiKey, params.agentDir);
				hasCredential = true;
			}
		}
	}
	if (!hasCredential) {
		const key = await params.prompter.text({
			message: "Enter xAI API key",
			validate: validateApiKeyInput
		});
		setXaiApiKey(normalizeApiKeyInput(String(key)), params.agentDir);
	}
	nextConfig = applyAuthProfileConfig(nextConfig, {
		profileId: "xai:default",
		provider: "xai",
		mode: "api_key"
	});
	{
		const applied = await applyDefaultModelChoice({
			config: nextConfig,
			setDefaultModel: params.setDefaultModel,
			defaultModel: XAI_DEFAULT_MODEL_REF,
			applyDefaultConfig: applyXaiConfig,
			applyProviderConfig: applyXaiProviderConfig,
			noteDefault: XAI_DEFAULT_MODEL_REF,
			noteAgentModel,
			prompter: params.prompter
		});
		nextConfig = applied.config;
		agentModelOverride = applied.agentModelOverride ?? agentModelOverride;
	}
	return {
		config: nextConfig,
		agentModelOverride
	};
}

//#endregion
//#region src/commands/auth-choice.apply.xiaomi.ts
init_model_auth();
init_models_config_providers();
async function applyAuthChoiceXiaomi(params) {
	if (params.authChoice !== "xiaomi-api-key") return null;
	let apiKey = resolveEnvApiKey("xiaomi")?.apiKey;
	if (params.opts?.tokenProvider === "xiaomi" && params.opts?.token) apiKey = params.opts.token;
	if (params.opts?.xiaomiApiKey) apiKey = params.opts.xiaomiApiKey;
	if (apiKey) {
		if (!await params.prompter.confirm({
			message: `Use existing XIAOMI_API_KEY (${formatApiKeyPreview(apiKey)})?`,
			initialValue: true
		})) apiKey = void 0;
	}
	if (!apiKey) {
		const input = await params.prompter.text({
			message: "请输入小米 MiMo API key",
			validate: validateApiKeyInput
		});
		if (typeof input === "symbol") return null;
		apiKey = normalizeApiKeyInput(String(input));
	}
	await setXiaomiApiKey(apiKey, params.agentDir);
	let modelId = null;
	let selectionMessage = "选择模型（自动验证）";
	const verifyModelAccess = async (id) => {
		const verifySpin = params.prompter.progress(`正在验证模型 ${id} 的访问权限 (10秒超时)...`);
		try {
			const res = await fetch(`${XIAOMI_API_BASE_URL}/chat/completions`, {
				method: "POST",
				headers: {
					"api-key": apiKey,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					model: id,
					messages: [{
						role: "user",
						content: "hi"
					}],
					max_completion_tokens: 1,
					stream: false
				}),
				signal: AbortSignal.timeout(1e4)
			});
			if (!res.ok) {
				const errMsg = (await res.json().catch(() => ({})))?.error?.message || res.statusText;
				throw new Error(errMsg);
			}
			verifySpin.stop(`验证通过: ${id}`);
			return true;
		} catch (err) {
			verifySpin.stop("访问被拒绝或超时");
			await params.prompter.note(`模型 "${id}" 验证失败:\n${err.message}\n\n提示: 请确保您已在 platform.xiaomimimo.com 开通服务并充值。`, "验证错误");
			return false;
		}
	};
	while (!modelId) {
		const choices = [...["mimo-v2-flash"].map((id) => ({
			value: id,
			label: id,
			hint: id === "mimo-v2-flash" ? "推荐 · 支持深度思考" : "预定义"
		})), {
			value: "__manual__",
			label: "手动输入模型ID",
			hint: "如果您的模型不在列表中"
		}];
		const selection = await params.prompter.select({
			message: selectionMessage,
			options: choices
		});
		if (typeof selection === "symbol") return null;
		let candidateId;
		if (selection === "__manual__") {
			const input = await params.prompter.text({
				message: "输入模型ID（例如 mimo-v2-flash）",
				validate: (val) => val.length > 0 ? void 0 : "模型ID不能为空"
			});
			if (typeof input === "symbol") return null;
			candidateId = String(input);
		} else candidateId = String(selection);
		if (await verifyModelAccess(candidateId)) modelId = candidateId;
		else selectionMessage = "访问被拒绝 - 请确保您已开通该模型服务";
	}
	let nextConfig = applyAuthProfileConfig(params.config, {
		profileId: "xiaomi:default",
		provider: "xiaomi",
		mode: "api_key"
	});
	if (params.agentId) nextConfig = {
		...nextConfig,
		agents: {
			...nextConfig.agents,
			defaults: {
				...nextConfig.agents?.defaults,
				model: {
					...nextConfig.agents?.defaults?.model,
					primary: `xiaomi/${modelId}`
				}
			}
		}
	};
	else nextConfig = {
		...nextConfig,
		agents: {
			...nextConfig.agents,
			defaults: {
				...nextConfig.agents?.defaults,
				model: {
					...nextConfig.agents?.defaults?.model,
					primary: `xiaomi/${modelId}`
				}
			}
		}
	};
	return {
		config: nextConfig,
		agentModelOverride: modelId
	};
}

//#endregion
//#region src/commands/auth-choice.apply.ts
async function applyAuthChoice(params) {
	const handlers = [
		applyAuthChoiceAnthropic,
		applyAuthChoiceOpenAI,
		applyAuthChoiceOAuth,
		applyAuthChoiceApiProviders,
		applyAuthChoiceMiniMax,
		applyAuthChoiceGitHubCopilot,
		applyAuthChoiceGoogleAntigravity,
		applyAuthChoiceGoogleGeminiCli,
		applyAuthChoiceCopilotProxy,
		applyAuthChoiceQwenPortal,
		applyAuthChoiceXAI,
		applyAuthChoiceVolcengine,
		applyAuthChoiceXiaomi
	];
	for (const handler of handlers) {
		const result = await handler(params);
		if (result) return result;
	}
	return { config: params.config };
}

//#endregion
//#region src/commands/auth-choice.model-check.ts
init_agent_scope();
init_auth_profiles();
init_defaults();
init_model_auth();
init_model_selection();
async function warnIfModelConfigLooksOff(config, prompter, options) {
	const agentModelOverride = options?.agentId ? resolveAgentModelPrimary(config, options.agentId) : void 0;
	const configWithModel = agentModelOverride && agentModelOverride.length > 0 ? {
		...config,
		agents: {
			...config.agents,
			defaults: {
				...config.agents?.defaults,
				model: {
					...typeof config.agents?.defaults?.model === "object" ? config.agents.defaults.model : void 0,
					primary: agentModelOverride
				}
			}
		}
	} : config;
	const ref = resolveConfiguredModelRef({
		cfg: configWithModel,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
	const warnings = [];
	const catalog = await loadModelCatalog({
		config: configWithModel,
		useCache: false
	});
	if (catalog.length > 0) {
		if (!catalog.some((entry) => entry.provider === ref.provider && entry.id === ref.model)) warnings.push(`Model not found: ${ref.provider}/${ref.model}. Update agents.defaults.model or run /models list.`);
	}
	const store = ensureAuthProfileStore(options?.agentDir);
	const hasProfile = listProfilesForProvider(store, ref.provider).length > 0;
	const envKey = resolveEnvApiKey(ref.provider);
	const customKey = getCustomProviderApiKey(config, ref.provider);
	if (!hasProfile && !envKey && !customKey) warnings.push(`No auth configured for provider "${ref.provider}". The agent may fail until credentials are added.`);
	if (ref.provider === "openai") {
		if (listProfilesForProvider(store, "openai-codex").length > 0) warnings.push(`Detected OpenAI Codex OAuth. Consider setting agents.defaults.model to ${OPENAI_CODEX_DEFAULT_MODEL}.`);
	}
	if (warnings.length > 0) await prompter.note(warnings.join("\n"), "Model check");
}

//#endregion
//#region src/commands/auth-choice.preferred-provider.ts
const PREFERRED_PROVIDER_BY_AUTH_CHOICE = {
	oauth: "anthropic",
	"setup-token": "anthropic",
	"claude-cli": "anthropic",
	token: "anthropic",
	apiKey: "anthropic",
	"openai-codex": "openai-codex",
	"codex-cli": "openai-codex",
	chutes: "chutes",
	"openai-api-key": "openai",
	"openrouter-api-key": "openrouter",
	"ai-gateway-api-key": "vercel-ai-gateway",
	"cloudflare-ai-gateway-api-key": "cloudflare-ai-gateway",
	"moonshot-api-key": "moonshot",
	"moonshot-api-key-cn": "moonshot",
	"kimi-code-api-key": "kimi-coding",
	"gemini-api-key": "google",
	"google-antigravity": "google-antigravity",
	"google-gemini-cli": "google-gemini-cli",
	"zai-api-key": "zai",
	"xiaomi-api-key": "xiaomi",
	"synthetic-api-key": "synthetic",
	"venice-api-key": "venice",
	"github-copilot": "github-copilot",
	"copilot-proxy": "copilot-proxy",
	"minimax-cloud": "minimax",
	"minimax-api": "minimax",
	"minimax-api-lightning": "minimax",
	minimax: "lmstudio",
	"opencode-zen": "opencode",
	"xai-api-key": "xai",
	"qwen-portal": "qwen-portal",
	"minimax-portal": "minimax-portal",
	"qianfan-api-key": "qianfan"
};
function resolvePreferredProviderForAuthChoice(choice) {
	return PREFERRED_PROVIDER_BY_AUTH_CHOICE[choice];
}

//#endregion
//#region src/commands/model-picker.ts
init_auth_profiles();
init_defaults();
init_model_auth();
init_model_selection();
const KEEP_VALUE = "__keep__";
const MANUAL_VALUE = "__manual__";
const PROVIDER_FILTER_THRESHOLD = 30;
const HIDDEN_ROUTER_MODELS = new Set(["openrouter/auto"]);
function hasAuthForProvider(provider, cfg, store) {
	if (listProfilesForProvider(store, provider).length > 0) return true;
	if (resolveEnvApiKey(provider)) return true;
	if (getCustomProviderApiKey(cfg, provider)) return true;
	return false;
}
function resolveConfiguredModelRaw(cfg) {
	const raw = cfg.agents?.defaults?.model;
	if (typeof raw === "string") return raw.trim();
	return raw?.primary?.trim() ?? "";
}
function resolveConfiguredModelKeys(cfg) {
	const models = cfg.agents?.defaults?.models ?? {};
	return Object.keys(models).map((key) => String(key ?? "").trim()).filter((key) => key.length > 0);
}
function normalizeModelKeys(values) {
	const seen = /* @__PURE__ */ new Set();
	const next = [];
	for (const raw of values) {
		const value = String(raw ?? "").trim();
		if (!value || seen.has(value)) continue;
		seen.add(value);
		next.push(value);
	}
	return next;
}
async function promptManualModel(params) {
	const modelInput = await params.prompter.text({
		message: params.allowBlank ? "Default model (blank to keep)" : "Default model",
		initialValue: params.initialValue,
		placeholder: "provider/model",
		validate: params.allowBlank ? void 0 : (value) => value?.trim() ? void 0 : "Required"
	});
	const model = String(modelInput ?? "").trim();
	if (!model) return {};
	return { model };
}
async function promptDefaultModel(params) {
	const cfg = params.config;
	const allowKeep = params.allowKeep ?? true;
	const includeManual = params.includeManual ?? true;
	const ignoreAllowlist = params.ignoreAllowlist ?? false;
	const preferredProviderRaw = params.preferredProvider?.trim();
	const preferredProvider = preferredProviderRaw ? normalizeProviderId(preferredProviderRaw) : void 0;
	const configuredRaw = resolveConfiguredModelRaw(cfg);
	const resolved = resolveConfiguredModelRef({
		cfg,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
	const resolvedKey = modelKey(resolved.provider, resolved.model);
	const configuredKey = configuredRaw ? resolvedKey : "";
	const catalog = await loadModelCatalog({
		config: cfg,
		useCache: false
	});
	if (catalog.length === 0) return promptManualModel({
		prompter: params.prompter,
		allowBlank: allowKeep,
		initialValue: configuredRaw || resolvedKey || void 0
	});
	const aliasIndex = buildModelAliasIndex({
		cfg,
		defaultProvider: DEFAULT_PROVIDER
	});
	let models = catalog;
	if (!ignoreAllowlist) {
		const { allowedCatalog } = buildAllowedModelSet({
			cfg,
			catalog,
			defaultProvider: DEFAULT_PROVIDER
		});
		models = allowedCatalog.length > 0 ? allowedCatalog : catalog;
	}
	if (models.length === 0) return promptManualModel({
		prompter: params.prompter,
		allowBlank: allowKeep,
		initialValue: configuredRaw || resolvedKey || void 0
	});
	const providers = Array.from(new Set(models.map((entry) => entry.provider))).toSorted((a, b) => a.localeCompare(b));
	const hasPreferredProvider = preferredProvider ? providers.includes(preferredProvider) : false;
	if (!hasPreferredProvider && providers.length > 1 && models.length > PROVIDER_FILTER_THRESHOLD) {
		const selection = await params.prompter.select({
			message: "Filter models by provider",
			options: [{
				value: "*",
				label: "All providers"
			}, ...providers.map((provider) => {
				const count = models.filter((entry) => entry.provider === provider).length;
				return {
					value: provider,
					label: provider,
					hint: `${count} model${count === 1 ? "" : "s"}`
				};
			})]
		});
		if (selection !== "*") models = models.filter((entry) => entry.provider === selection);
	}
	if (hasPreferredProvider && preferredProvider) models = models.filter((entry) => entry.provider === preferredProvider);
	const authStore = ensureAuthProfileStore(params.agentDir, { allowKeychainPrompt: false });
	const authCache = /* @__PURE__ */ new Map();
	const hasAuth = (provider) => {
		const cached = authCache.get(provider);
		if (cached !== void 0) return cached;
		const value = hasAuthForProvider(provider, cfg, authStore);
		authCache.set(provider, value);
		return value;
	};
	const options = [];
	if (allowKeep) options.push({
		value: KEEP_VALUE,
		label: configuredRaw ? `Keep current (${configuredRaw})` : `Keep current (default: ${resolvedKey})`,
		hint: configuredRaw && configuredRaw !== resolvedKey ? `resolves to ${resolvedKey}` : void 0
	});
	if (includeManual) options.push({
		value: MANUAL_VALUE,
		label: "Enter model manually"
	});
	const seen = /* @__PURE__ */ new Set();
	const addModelOption = (entry) => {
		const key = modelKey(entry.provider, entry.id);
		if (seen.has(key)) return;
		if (HIDDEN_ROUTER_MODELS.has(key)) return;
		const hints = [];
		if (entry.name && entry.name !== entry.id) hints.push(entry.name);
		if (entry.contextWindow) hints.push(`ctx ${formatTokenK(entry.contextWindow)}`);
		if (entry.reasoning) hints.push("reasoning");
		const aliases = aliasIndex.byKey.get(key);
		if (aliases?.length) hints.push(`alias: ${aliases.join(", ")}`);
		if (!hasAuth(entry.provider)) hints.push("auth missing");
		options.push({
			value: key,
			label: key,
			hint: hints.length > 0 ? hints.join(" · ") : void 0
		});
		seen.add(key);
	};
	for (const entry of models) addModelOption(entry);
	if (configuredKey && !seen.has(configuredKey)) options.push({
		value: configuredKey,
		label: configuredKey,
		hint: "current (not in catalog)"
	});
	let initialValue = allowKeep ? KEEP_VALUE : configuredKey || void 0;
	if (allowKeep && hasPreferredProvider && preferredProvider && resolved.provider !== preferredProvider) {
		const firstModel = models[0];
		if (firstModel) initialValue = modelKey(firstModel.provider, firstModel.id);
	}
	const selection = await params.prompter.select({
		message: params.message ?? "Default model",
		options,
		initialValue
	});
	if (selection === KEEP_VALUE) return {};
	if (selection === MANUAL_VALUE) return promptManualModel({
		prompter: params.prompter,
		allowBlank: false,
		initialValue: configuredRaw || resolvedKey || void 0
	});
	return { model: String(selection) };
}
async function promptModelAllowlist(params) {
	const cfg = params.config;
	const existingKeys = resolveConfiguredModelKeys(cfg);
	const allowedKeys = normalizeModelKeys(params.allowedKeys ?? []);
	const allowedKeySet = allowedKeys.length > 0 ? new Set(allowedKeys) : null;
	const resolved = resolveConfiguredModelRef({
		cfg,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
	const resolvedKey = modelKey(resolved.provider, resolved.model);
	const initialSeeds = normalizeModelKeys([
		...existingKeys,
		resolvedKey,
		...params.initialSelections ?? []
	]);
	const initialKeys = allowedKeySet ? initialSeeds.filter((key) => allowedKeySet.has(key)) : initialSeeds;
	const catalog = await loadModelCatalog({
		config: cfg,
		useCache: false
	});
	if (catalog.length === 0 && allowedKeys.length === 0) {
		const raw = await params.prompter.text({
			message: params.message ?? "Allowlist models (comma-separated provider/model; blank to keep current)",
			initialValue: existingKeys.join(", "),
			placeholder: `${OPENAI_CODEX_DEFAULT_MODEL}, anthropic/claude-opus-4-6`
		});
		const parsed = String(raw ?? "").split(",").map((value) => value.trim()).filter((value) => value.length > 0);
		if (parsed.length === 0) return {};
		return { models: normalizeModelKeys(parsed) };
	}
	const aliasIndex = buildModelAliasIndex({
		cfg,
		defaultProvider: DEFAULT_PROVIDER
	});
	const authStore = ensureAuthProfileStore(params.agentDir, { allowKeychainPrompt: false });
	const authCache = /* @__PURE__ */ new Map();
	const hasAuth = (provider) => {
		const cached = authCache.get(provider);
		if (cached !== void 0) return cached;
		const value = hasAuthForProvider(provider, cfg, authStore);
		authCache.set(provider, value);
		return value;
	};
	const options = [];
	const seen = /* @__PURE__ */ new Set();
	const addModelOption = (entry) => {
		const key = modelKey(entry.provider, entry.id);
		if (seen.has(key)) return;
		if (HIDDEN_ROUTER_MODELS.has(key)) return;
		const hints = [];
		if (entry.name && entry.name !== entry.id) hints.push(entry.name);
		if (entry.contextWindow) hints.push(`ctx ${formatTokenK(entry.contextWindow)}`);
		if (entry.reasoning) hints.push("reasoning");
		const aliases = aliasIndex.byKey.get(key);
		if (aliases?.length) hints.push(`alias: ${aliases.join(", ")}`);
		if (!hasAuth(entry.provider)) hints.push("auth missing");
		options.push({
			value: key,
			label: key,
			hint: hints.length > 0 ? hints.join(" · ") : void 0
		});
		seen.add(key);
	};
	const filteredCatalog = allowedKeySet ? catalog.filter((entry) => allowedKeySet.has(modelKey(entry.provider, entry.id))) : catalog;
	for (const entry of filteredCatalog) addModelOption(entry);
	const supplementalKeys = allowedKeySet ? allowedKeys : existingKeys;
	for (const key of supplementalKeys) {
		if (seen.has(key)) continue;
		options.push({
			value: key,
			label: key,
			hint: allowedKeySet ? "allowed (not in catalog)" : "configured (not in catalog)"
		});
		seen.add(key);
	}
	if (options.length === 0) return {};
	const selected = normalizeModelKeys((await params.prompter.multiselect({
		message: params.message ?? "Models in /model picker (multi-select)",
		options,
		initialValues: initialKeys.length > 0 ? initialKeys : void 0
	})).map((value) => String(value)));
	if (selected.length > 0) return { models: selected };
	if (existingKeys.length === 0) return { models: [] };
	if (!await params.prompter.confirm({
		message: "Clear the model allowlist? (shows all models)",
		initialValue: false
	})) return {};
	return { models: [] };
}
function applyPrimaryModel(cfg, model) {
	const defaults = cfg.agents?.defaults;
	const existingModel = defaults?.model;
	const existingModels = defaults?.models;
	const fallbacks = typeof existingModel === "object" && existingModel !== null && "fallbacks" in existingModel ? existingModel.fallbacks : void 0;
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...defaults,
				model: {
					...fallbacks ? { fallbacks } : void 0,
					primary: model
				},
				models: {
					...existingModels,
					[model]: existingModels?.[model] ?? {}
				}
			}
		}
	};
}
function applyModelAllowlist(cfg, models) {
	const defaults = cfg.agents?.defaults;
	const normalized = normalizeModelKeys(models);
	if (normalized.length === 0) {
		if (!defaults?.models) return cfg;
		const { models: _ignored, ...restDefaults } = defaults;
		return {
			...cfg,
			agents: {
				...cfg.agents,
				defaults: restDefaults
			}
		};
	}
	const existingModels = defaults?.models ?? {};
	const nextModels = {};
	for (const key of normalized) nextModels[key] = existingModels[key] ?? {};
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...defaults,
				models: nextModels
			}
		}
	};
}
function applyModelFallbacksFromSelection(cfg, selection) {
	const normalized = normalizeModelKeys(selection);
	if (normalized.length <= 1) return cfg;
	const resolved = resolveConfiguredModelRef({
		cfg,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
	const resolvedKey = modelKey(resolved.provider, resolved.model);
	if (!normalized.includes(resolvedKey)) return cfg;
	const defaults = cfg.agents?.defaults;
	const existingModel = defaults?.model;
	const existingPrimary = typeof existingModel === "string" ? existingModel : existingModel && typeof existingModel === "object" ? existingModel.primary : void 0;
	const fallbacks = normalized.filter((key) => key !== resolvedKey);
	return {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...defaults,
				model: {
					...typeof existingModel === "object" ? existingModel : void 0,
					primary: existingPrimary ?? resolvedKey,
					fallbacks
				}
			}
		}
	};
}

//#endregion
//#region src/commands/onboard-remote.ts
const DEFAULT_GATEWAY_URL = "ws://127.0.0.1:18789";
function pickHost(beacon) {
	return beacon.tailnetDns || beacon.lanHost || beacon.host;
}
function buildLabel(beacon) {
	const host = pickHost(beacon);
	const port = beacon.gatewayPort ?? beacon.port ?? 18789;
	return `${beacon.displayName ?? beacon.instanceName} (${host ? `${host}:${port}` : "host unknown"})`;
}
function ensureWsUrl(value) {
	const trimmed = value.trim();
	if (!trimmed) return DEFAULT_GATEWAY_URL;
	return trimmed;
}
async function promptRemoteGatewayConfig(cfg, prompter) {
	let selectedBeacon = null;
	let suggestedUrl = cfg.gateway?.remote?.url ?? DEFAULT_GATEWAY_URL;
	const hasBonjourTool = await detectBinary("dns-sd") || await detectBinary("avahi-browse");
	const wantsDiscover = hasBonjourTool ? await prompter.confirm({
		message: "Discover gateway on LAN (Bonjour)?",
		initialValue: true
	}) : false;
	if (!hasBonjourTool) await prompter.note(["Bonjour discovery requires dns-sd (macOS) or avahi-browse (Linux).", "Docs: https://docs.openclaw.ai/gateway/discovery"].join("\n"), "Discovery");
	if (wantsDiscover) {
		const wideAreaDomain = resolveWideAreaDiscoveryDomain({ configDomain: cfg.discovery?.wideArea?.domain });
		const spin = prompter.progress("Searching for gateways…");
		const beacons = await discoverGatewayBeacons({
			timeoutMs: 2e3,
			wideAreaDomain
		});
		spin.stop(beacons.length > 0 ? `Found ${beacons.length} gateway(s)` : "No gateways found");
		if (beacons.length > 0) {
			const selection = await prompter.select({
				message: "Select gateway",
				options: [...beacons.map((beacon, index) => ({
					value: String(index),
					label: buildLabel(beacon)
				})), {
					value: "manual",
					label: "Enter URL manually"
				}]
			});
			if (selection !== "manual") {
				const idx = Number.parseInt(String(selection), 10);
				selectedBeacon = Number.isFinite(idx) ? beacons[idx] ?? null : null;
			}
		}
	}
	if (selectedBeacon) {
		const host = pickHost(selectedBeacon);
		const port = selectedBeacon.gatewayPort ?? 18789;
		if (host) if (await prompter.select({
			message: "Connection method",
			options: [{
				value: "direct",
				label: `Direct gateway WS (${host}:${port})`
			}, {
				value: "ssh",
				label: "SSH tunnel (loopback)"
			}]
		}) === "direct") suggestedUrl = `ws://${host}:${port}`;
		else {
			suggestedUrl = DEFAULT_GATEWAY_URL;
			await prompter.note([
				"Start a tunnel before using the CLI:",
				`ssh -N -L 18789:127.0.0.1:18789 <user>@${host}${selectedBeacon.sshPort ? ` -p ${selectedBeacon.sshPort}` : ""}`,
				"Docs: https://docs.openclaw.ai/gateway/remote"
			].join("\n"), "SSH tunnel");
		}
	}
	const urlInput = await prompter.text({
		message: "Gateway WebSocket URL",
		initialValue: suggestedUrl,
		validate: (value) => String(value).trim().startsWith("ws://") || String(value).trim().startsWith("wss://") ? void 0 : "URL must start with ws:// or wss://"
	});
	const url = ensureWsUrl(String(urlInput));
	const authChoice = await prompter.select({
		message: "Gateway auth",
		options: [{
			value: "token",
			label: "Token (recommended)"
		}, {
			value: "off",
			label: "No auth"
		}]
	});
	let token = cfg.gateway?.remote?.token ?? "";
	if (authChoice === "token") token = String(await prompter.text({
		message: "Gateway token",
		initialValue: token,
		validate: (value) => value?.trim() ? void 0 : "Required"
	})).trim();
	else token = "";
	return {
		...cfg,
		gateway: {
			...cfg.gateway,
			mode: "remote",
			remote: {
				url,
				token: token || void 0
			}
		}
	};
}

//#endregion
//#region src/agents/skills-install.ts
init_exec();
init_utils();
function isNodeReadableStream(value) {
	return Boolean(value && typeof value.pipe === "function");
}
function summarizeInstallOutput(text) {
	const raw = text.trim();
	if (!raw) return;
	const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
	if (lines.length === 0) return;
	const preferred = lines.find((line) => /^error\b/i.test(line)) ?? lines.find((line) => /\b(err!|error:|failed)\b/i.test(line)) ?? lines.at(-1);
	if (!preferred) return;
	const normalized = preferred.replace(/\s+/g, " ").trim();
	const maxLen = 200;
	return normalized.length > maxLen ? `${normalized.slice(0, maxLen - 1)}…` : normalized;
}
function formatInstallFailureMessage(result) {
	const code = typeof result.code === "number" ? `exit ${result.code}` : "unknown exit";
	const summary = summarizeInstallOutput(result.stderr) ?? summarizeInstallOutput(result.stdout);
	if (!summary) return `Install failed (${code})`;
	return `Install failed (${code}): ${summary}`;
}
function withWarnings(result, warnings) {
	if (warnings.length === 0) return result;
	return {
		...result,
		warnings: warnings.slice()
	};
}
function formatScanFindingDetail(rootDir, finding) {
	const relativePath = path.relative(rootDir, finding.file);
	const filePath = relativePath && relativePath !== "." && !relativePath.startsWith("..") ? relativePath : path.basename(finding.file);
	return `${finding.message} (${filePath}:${finding.line})`;
}
async function collectSkillInstallScanWarnings(entry) {
	const warnings = [];
	const skillName = entry.skill.name;
	const skillDir = path.resolve(entry.skill.baseDir);
	try {
		const summary = await scanDirectoryWithSummary(skillDir);
		if (summary.critical > 0) {
			const criticalDetails = summary.findings.filter((finding) => finding.severity === "critical").map((finding) => formatScanFindingDetail(skillDir, finding)).join("; ");
			warnings.push(`WARNING: Skill "${skillName}" contains dangerous code patterns: ${criticalDetails}`);
		} else if (summary.warn > 0) warnings.push(`Skill "${skillName}" has ${summary.warn} suspicious code pattern(s). Run "openclaw security audit --deep" for details.`);
	} catch (err) {
		warnings.push(`Skill "${skillName}" code safety scan failed (${String(err)}). Installation continues; run "openclaw security audit --deep" after install.`);
	}
	return warnings;
}
function resolveInstallId(spec, index) {
	return (spec.id ?? `${spec.kind}-${index}`).trim();
}
function findInstallSpec(entry, installId) {
	const specs = entry.metadata?.install ?? [];
	for (const [index, spec] of specs.entries()) if (resolveInstallId(spec, index) === installId) return spec;
}
function buildNodeInstallCommand(packageName, prefs) {
	switch (prefs.nodeManager) {
		case "pnpm": return [
			"pnpm",
			"add",
			"-g",
			packageName
		];
		case "yarn": return [
			"yarn",
			"global",
			"add",
			packageName
		];
		case "bun": return [
			"bun",
			"add",
			"-g",
			packageName
		];
		default: return [
			"npm",
			"install",
			"-g",
			packageName
		];
	}
}
function buildInstallCommand(spec, prefs) {
	switch (spec.kind) {
		case "brew":
			if (!spec.formula) return {
				argv: null,
				error: "missing brew formula"
			};
			return { argv: [
				"brew",
				"install",
				spec.formula
			] };
		case "node":
			if (!spec.package) return {
				argv: null,
				error: "missing node package"
			};
			return { argv: buildNodeInstallCommand(spec.package, prefs) };
		case "go":
			if (!spec.module) return {
				argv: null,
				error: "missing go module"
			};
			return { argv: [
				"go",
				"install",
				spec.module
			] };
		case "uv":
			if (!spec.package) return {
				argv: null,
				error: "missing uv package"
			};
			return { argv: [
				"uv",
				"tool",
				"install",
				spec.package
			] };
		case "download": return {
			argv: null,
			error: "download install handled separately"
		};
		default: return {
			argv: null,
			error: "unsupported installer"
		};
	}
}
function resolveDownloadTargetDir(entry, spec) {
	if (spec.targetDir?.trim()) return resolveUserPath(spec.targetDir);
	const key = resolveSkillKey(entry.skill, entry);
	return path.join(CONFIG_DIR, "tools", key);
}
function resolveArchiveType(spec, filename) {
	const explicit = spec.archive?.trim().toLowerCase();
	if (explicit) return explicit;
	const lower = filename.toLowerCase();
	if (lower.endsWith(".tar.gz") || lower.endsWith(".tgz")) return "tar.gz";
	if (lower.endsWith(".tar.bz2") || lower.endsWith(".tbz2")) return "tar.bz2";
	if (lower.endsWith(".zip")) return "zip";
}
async function downloadFile(url, destPath, timeoutMs) {
	const { response, release } = await fetchWithSsrFGuard({
		url,
		timeoutMs: Math.max(1e3, timeoutMs)
	});
	try {
		if (!response.ok || !response.body) throw new Error(`Download failed (${response.status} ${response.statusText})`);
		await ensureDir(path.dirname(destPath));
		const file = fs.createWriteStream(destPath);
		const body = response.body;
		await pipeline(isNodeReadableStream(body) ? body : Readable.fromWeb(body), file);
		return { bytes: (await fs.promises.stat(destPath)).size };
	} finally {
		await release();
	}
}
async function extractArchive(params) {
	const { archivePath, archiveType, targetDir, stripComponents, timeoutMs } = params;
	if (archiveType === "zip") {
		if (!hasBinary("unzip")) return {
			stdout: "",
			stderr: "unzip not found on PATH",
			code: null
		};
		return await runCommandWithTimeout([
			"unzip",
			"-q",
			archivePath,
			"-d",
			targetDir
		], { timeoutMs });
	}
	if (!hasBinary("tar")) return {
		stdout: "",
		stderr: "tar not found on PATH",
		code: null
	};
	const argv = [
		"tar",
		"xf",
		archivePath,
		"-C",
		targetDir
	];
	if (typeof stripComponents === "number" && Number.isFinite(stripComponents)) argv.push("--strip-components", String(Math.max(0, Math.floor(stripComponents))));
	return await runCommandWithTimeout(argv, { timeoutMs });
}
async function installDownloadSpec(params) {
	const { entry, spec, timeoutMs } = params;
	const url = spec.url?.trim();
	if (!url) return {
		ok: false,
		message: "missing download url",
		stdout: "",
		stderr: "",
		code: null
	};
	let filename = "";
	try {
		const parsed = new URL(url);
		filename = path.basename(parsed.pathname);
	} catch {
		filename = path.basename(url);
	}
	if (!filename) filename = "download";
	const targetDir = resolveDownloadTargetDir(entry, spec);
	await ensureDir(targetDir);
	const archivePath = path.join(targetDir, filename);
	let downloaded = 0;
	try {
		downloaded = (await downloadFile(url, archivePath, timeoutMs)).bytes;
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return {
			ok: false,
			message,
			stdout: "",
			stderr: message,
			code: null
		};
	}
	const archiveType = resolveArchiveType(spec, filename);
	if (!(spec.extract ?? Boolean(archiveType))) return {
		ok: true,
		message: `Downloaded to ${archivePath}`,
		stdout: `downloaded=${downloaded}`,
		stderr: "",
		code: 0
	};
	if (!archiveType) return {
		ok: false,
		message: "extract requested but archive type could not be detected",
		stdout: "",
		stderr: "",
		code: null
	};
	const extractResult = await extractArchive({
		archivePath,
		archiveType,
		targetDir,
		stripComponents: spec.stripComponents,
		timeoutMs
	});
	const success = extractResult.code === 0;
	return {
		ok: success,
		message: success ? `Downloaded and extracted to ${targetDir}` : formatInstallFailureMessage(extractResult),
		stdout: extractResult.stdout.trim(),
		stderr: extractResult.stderr.trim(),
		code: extractResult.code
	};
}
async function resolveBrewBinDir(timeoutMs, brewExe) {
	const exe = brewExe ?? (hasBinary("brew") ? "brew" : resolveBrewExecutable());
	if (!exe) return;
	const prefixResult = await runCommandWithTimeout([exe, "--prefix"], { timeoutMs: Math.min(timeoutMs, 3e4) });
	if (prefixResult.code === 0) {
		const prefix = prefixResult.stdout.trim();
		if (prefix) return path.join(prefix, "bin");
	}
	const envPrefix = process.env.HOMEBREW_PREFIX?.trim();
	if (envPrefix) return path.join(envPrefix, "bin");
	for (const candidate of ["/opt/homebrew/bin", "/usr/local/bin"]) try {
		if (fs.existsSync(candidate)) return candidate;
	} catch {}
}
async function installSkill(params) {
	const timeoutMs = Math.min(Math.max(params.timeoutMs ?? 3e5, 1e3), 9e5);
	const entry = loadWorkspaceSkillEntries(resolveUserPath(params.workspaceDir)).find((item) => item.skill.name === params.skillName);
	if (!entry) return {
		ok: false,
		message: `Skill not found: ${params.skillName}`,
		stdout: "",
		stderr: "",
		code: null
	};
	const spec = findInstallSpec(entry, params.installId);
	const warnings = await collectSkillInstallScanWarnings(entry);
	if (!spec) return withWarnings({
		ok: false,
		message: `Installer not found: ${params.installId}`,
		stdout: "",
		stderr: "",
		code: null
	}, warnings);
	if (spec.kind === "download") return withWarnings(await installDownloadSpec({
		entry,
		spec,
		timeoutMs
	}), warnings);
	const command = buildInstallCommand(spec, resolveSkillsInstallPreferences(params.config));
	if (command.error) return withWarnings({
		ok: false,
		message: command.error,
		stdout: "",
		stderr: "",
		code: null
	}, warnings);
	const brewExe = hasBinary("brew") ? "brew" : resolveBrewExecutable();
	if (spec.kind === "brew" && !brewExe) return withWarnings({
		ok: false,
		message: "brew not installed",
		stdout: "",
		stderr: "",
		code: null
	}, warnings);
	if (spec.kind === "uv" && !hasBinary("uv")) if (brewExe) {
		const brewResult = await runCommandWithTimeout([
			brewExe,
			"install",
			"uv"
		], { timeoutMs });
		if (brewResult.code !== 0) return withWarnings({
			ok: false,
			message: "Failed to install uv (brew)",
			stdout: brewResult.stdout.trim(),
			stderr: brewResult.stderr.trim(),
			code: brewResult.code
		}, warnings);
	} else return withWarnings({
		ok: false,
		message: "uv not installed (install via brew)",
		stdout: "",
		stderr: "",
		code: null
	}, warnings);
	if (!command.argv || command.argv.length === 0) return withWarnings({
		ok: false,
		message: "invalid install command",
		stdout: "",
		stderr: "",
		code: null
	}, warnings);
	if (spec.kind === "brew" && brewExe && command.argv[0] === "brew") command.argv[0] = brewExe;
	if (spec.kind === "go" && !hasBinary("go")) if (brewExe) {
		const brewResult = await runCommandWithTimeout([
			brewExe,
			"install",
			"go"
		], { timeoutMs });
		if (brewResult.code !== 0) return withWarnings({
			ok: false,
			message: "Failed to install go (brew)",
			stdout: brewResult.stdout.trim(),
			stderr: brewResult.stderr.trim(),
			code: brewResult.code
		}, warnings);
	} else return withWarnings({
		ok: false,
		message: "go not installed (install via brew)",
		stdout: "",
		stderr: "",
		code: null
	}, warnings);
	let env;
	if (spec.kind === "go" && brewExe) {
		const brewBin = await resolveBrewBinDir(timeoutMs, brewExe);
		if (brewBin) env = { GOBIN: brewBin };
	}
	const result = await (async () => {
		const argv = command.argv;
		if (!argv || argv.length === 0) return {
			code: null,
			stdout: "",
			stderr: "invalid install command"
		};
		try {
			return await runCommandWithTimeout(argv, {
				timeoutMs,
				env
			});
		} catch (err) {
			return {
				code: null,
				stdout: "",
				stderr: err instanceof Error ? err.message : String(err)
			};
		}
	})();
	const success = result.code === 0;
	return withWarnings({
		ok: success,
		message: success ? "Installed" : formatInstallFailureMessage(result),
		stdout: result.stdout.trim(),
		stderr: result.stderr.trim(),
		code: result.code
	}, warnings);
}

//#endregion
//#region src/commands/onboard-skills.ts
init_command_format();
function summarizeInstallFailure(message) {
	const cleaned = message.replace(/^Install failed(?:\s*\([^)]*\))?\s*:?\s*/i, "").trim();
	if (!cleaned) return;
	const maxLen = 140;
	return cleaned.length > maxLen ? `${cleaned.slice(0, maxLen - 1)}…` : cleaned;
}
function formatSkillHint(skill) {
	const desc = skill.description?.trim();
	const installLabel = skill.install[0]?.label?.trim();
	const combined = desc && installLabel ? `${desc} — ${installLabel}` : desc || installLabel;
	if (!combined) return "install";
	const maxLen = 90;
	return combined.length > maxLen ? `${combined.slice(0, maxLen - 1)}…` : combined;
}
function upsertSkillEntry(cfg, skillKey, patch) {
	const entries = { ...cfg.skills?.entries };
	entries[skillKey] = {
		...entries[skillKey] ?? {},
		...patch
	};
	return {
		...cfg,
		skills: {
			...cfg.skills,
			entries
		}
	};
}
async function setupSkills(cfg, workspaceDir, runtime, prompter) {
	const report = buildWorkspaceSkillStatus(workspaceDir, { config: cfg });
	const eligible = report.skills.filter((s) => s.eligible);
	const missing = report.skills.filter((s) => !s.eligible && !s.disabled && !s.blockedByAllowlist);
	const blocked = report.skills.filter((s) => s.blockedByAllowlist);
	const needsBrewPrompt = process.platform !== "win32" && report.skills.some((skill) => skill.install.some((option) => option.kind === "brew")) && !await detectBinary("brew");
	await prompter.note([
		`Eligible: ${eligible.length}`,
		`Missing requirements: ${missing.length}`,
		`Blocked by allowlist: ${blocked.length}`
	].join("\n"), "Skills status");
	if (!await prompter.confirm({
		message: "Configure skills now? (recommended)",
		initialValue: true
	})) return cfg;
	if (needsBrewPrompt) {
		await prompter.note(["Many skill dependencies are shipped via Homebrew.", "Without brew, you'll need to build from source or download releases manually."].join("\n"), "Homebrew recommended");
		if (await prompter.confirm({
			message: "Show Homebrew install command?",
			initialValue: true
		})) await prompter.note(["Run:", "/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""].join("\n"), "Homebrew install");
	}
	const nodeManager = await prompter.select({
		message: "Preferred node manager for skill installs",
		options: resolveNodeManagerOptions()
	});
	let next = {
		...cfg,
		skills: {
			...cfg.skills,
			install: {
				...cfg.skills?.install,
				nodeManager
			}
		}
	};
	const installable = missing.filter((skill) => skill.install.length > 0 && skill.missing.bins.length > 0);
	if (installable.length > 0) {
		const selected = (await prompter.multiselect({
			message: "Install missing skill dependencies",
			options: [{
				value: "__skip__",
				label: "Skip for now",
				hint: "Continue without installing dependencies"
			}, ...installable.map((skill) => ({
				value: skill.name,
				label: `${skill.emoji ?? "🧩"} ${skill.name}`,
				hint: formatSkillHint(skill)
			}))]
		})).filter((name) => name !== "__skip__");
		for (const name of selected) {
			const target = installable.find((s) => s.name === name);
			if (!target || target.install.length === 0) continue;
			const installId = target.install[0]?.id;
			if (!installId) continue;
			const spin = prompter.progress(`Installing ${name}…`);
			const result = await installSkill({
				workspaceDir,
				skillName: target.name,
				installId,
				config: next
			});
			const warnings = result.warnings ?? [];
			if (result.ok) {
				spin.stop(warnings.length > 0 ? `Installed ${name} (with warnings)` : `Installed ${name}`);
				for (const warning of warnings) runtime.log(warning);
				continue;
			}
			const code = result.code == null ? "" : ` (exit ${result.code})`;
			const detail = summarizeInstallFailure(result.message);
			spin.stop(`Install failed: ${name}${code}${detail ? ` — ${detail}` : ""}`);
			for (const warning of warnings) runtime.log(warning);
			if (result.stderr) runtime.log(result.stderr.trim());
			else if (result.stdout) runtime.log(result.stdout.trim());
			runtime.log(`Tip: run \`${formatCliCommand("openclaw doctor")}\` to review skills + requirements.`);
			runtime.log("Docs: https://docs.openclaw.ai/skills");
		}
	}
	for (const skill of missing) {
		if (!skill.primaryEnv || skill.missing.env.length === 0) continue;
		if (!await prompter.confirm({
			message: `Set ${skill.primaryEnv} for ${skill.name}?`,
			initialValue: false
		})) continue;
		const apiKey = String(await prompter.text({
			message: `Enter ${skill.primaryEnv}`,
			validate: (value) => value?.trim() ? void 0 : "Required"
		}));
		next = upsertSkillEntry(next, skill.skillKey, { apiKey: apiKey.trim() });
	}
	return next;
}

//#endregion
export { applyModelFallbacksFromSelection as a, promptModelAllowlist as c, applyAuthChoice as d, applyOpenAIConfig as f, discoverGatewayBeacons as g, promptAuthChoiceGrouped as h, applyModelAllowlist as i, resolvePreferredProviderForAuthChoice as l, applyGoogleGeminiModelDefault as m, installSkill as n, applyPrimaryModel as o, upsertSharedEnvVar as p, promptRemoteGatewayConfig as r, promptDefaultModel as s, setupSkills as t, warnIfModelConfigLooksOff as u };