import { _ as resolveStateDir, i as init_paths, v as __esmMin, y as __exportAll } from "./paths-7Bb9F26w.js";
import path from "node:path";
import fs from "node:fs";

//#region src/infra/json-file.ts
function loadJsonFile(pathname) {
	try {
		if (!fs.existsSync(pathname)) return;
		const raw = fs.readFileSync(pathname, "utf8");
		return JSON.parse(raw);
	} catch {
		return;
	}
}
function saveJsonFile(pathname, data) {
	const dir = path.dirname(pathname);
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
		recursive: true,
		mode: 448
	});
	fs.writeFileSync(pathname, `${JSON.stringify(data, null, 2)}\n`, "utf8");
	fs.chmodSync(pathname, 384);
}
var init_json_file = __esmMin((() => {}));

//#endregion
//#region src/providers/github-copilot-token.ts
var github_copilot_token_exports = /* @__PURE__ */ __exportAll({
	DEFAULT_COPILOT_API_BASE_URL: () => DEFAULT_COPILOT_API_BASE_URL,
	deriveCopilotApiBaseUrlFromToken: () => deriveCopilotApiBaseUrlFromToken,
	resolveCopilotApiToken: () => resolveCopilotApiToken
});
function resolveCopilotTokenCachePath(env = process.env) {
	return path.join(resolveStateDir(env), "credentials", "github-copilot.token.json");
}
function isTokenUsable(cache, now = Date.now()) {
	return cache.expiresAt - now > 300 * 1e3;
}
function parseCopilotTokenResponse(value) {
	if (!value || typeof value !== "object") throw new Error("Unexpected response from GitHub Copilot token endpoint");
	const asRecord = value;
	const token = asRecord.token;
	const expiresAt = asRecord.expires_at;
	if (typeof token !== "string" || token.trim().length === 0) throw new Error("Copilot token response missing token");
	let expiresAtMs;
	if (typeof expiresAt === "number" && Number.isFinite(expiresAt)) expiresAtMs = expiresAt > 1e10 ? expiresAt : expiresAt * 1e3;
	else if (typeof expiresAt === "string" && expiresAt.trim().length > 0) {
		const parsed = Number.parseInt(expiresAt, 10);
		if (!Number.isFinite(parsed)) throw new Error("Copilot token response has invalid expires_at");
		expiresAtMs = parsed > 1e10 ? parsed : parsed * 1e3;
	} else throw new Error("Copilot token response missing expires_at");
	return {
		token,
		expiresAt: expiresAtMs
	};
}
function deriveCopilotApiBaseUrlFromToken(token) {
	const trimmed = token.trim();
	if (!trimmed) return null;
	const proxyEp = trimmed.match(/(?:^|;)\s*proxy-ep=([^;\s]+)/i)?.[1]?.trim();
	if (!proxyEp) return null;
	const host = proxyEp.replace(/^https?:\/\//, "").replace(/^proxy\./i, "api.");
	if (!host) return null;
	return `https://${host}`;
}
async function resolveCopilotApiToken(params) {
	const cachePath = resolveCopilotTokenCachePath(params.env ?? process.env);
	const cached = loadJsonFile(cachePath);
	if (cached && typeof cached.token === "string" && typeof cached.expiresAt === "number") {
		if (isTokenUsable(cached)) return {
			token: cached.token,
			expiresAt: cached.expiresAt,
			source: `cache:${cachePath}`,
			baseUrl: deriveCopilotApiBaseUrlFromToken(cached.token) ?? DEFAULT_COPILOT_API_BASE_URL
		};
	}
	const res = await (params.fetchImpl ?? fetch)(COPILOT_TOKEN_URL, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${params.githubToken}`
		}
	});
	if (!res.ok) throw new Error(`Copilot token exchange failed: HTTP ${res.status}`);
	const json = parseCopilotTokenResponse(await res.json());
	const payload = {
		token: json.token,
		expiresAt: json.expiresAt,
		updatedAt: Date.now()
	};
	saveJsonFile(cachePath, payload);
	return {
		token: payload.token,
		expiresAt: payload.expiresAt,
		source: `fetched:${COPILOT_TOKEN_URL}`,
		baseUrl: deriveCopilotApiBaseUrlFromToken(payload.token) ?? DEFAULT_COPILOT_API_BASE_URL
	};
}
var COPILOT_TOKEN_URL, DEFAULT_COPILOT_API_BASE_URL;
var init_github_copilot_token = __esmMin((() => {
	init_paths();
	init_json_file();
	COPILOT_TOKEN_URL = "https://api.github.com/copilot_internal/v2/token";
	DEFAULT_COPILOT_API_BASE_URL = "https://api.individual.githubcopilot.com";
}));

//#endregion
export { init_json_file as a, resolveCopilotApiToken as i, github_copilot_token_exports as n, loadJsonFile as o, init_github_copilot_token as r, saveJsonFile as s, DEFAULT_COPILOT_API_BASE_URL as t };