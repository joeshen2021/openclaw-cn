import { _ as resolveStateDir, i as init_paths, v as __esmMin } from "./paths-7Bb9F26w.js";
import { b as parseAgentSessionKey, c as init_session_key, n as DEFAULT_AGENT_ID, u as normalizeAgentId, y as isSubagentSessionKey } from "./session-key-CD-TlcsJ.js";
import { g as resolveUserPath, l as init_utils } from "./utils-D-0UeDZ-.js";
import { n as runCommandWithTimeout, t as init_exec } from "./exec-nNwfnVsi.js";
import { n as resolveOpenClawPackageRoot, t as init_openclaw_root } from "./openclaw-root-CBCdI7WU.js";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

//#region src/agents/workspace-templates.ts
async function pathExists(candidate) {
	try {
		await fs.access(candidate);
		return true;
	} catch {
		return false;
	}
}
async function resolveWorkspaceTemplateDir(opts) {
	if (cachedTemplateDir) return cachedTemplateDir;
	if (resolvingTemplateDir) return resolvingTemplateDir;
	resolvingTemplateDir = (async () => {
		const moduleUrl = opts?.moduleUrl ?? import.meta.url;
		const argv1 = opts?.argv1 ?? process.argv[1];
		const cwd = opts?.cwd ?? process.cwd();
		const packageRoot = await resolveOpenClawPackageRoot({
			moduleUrl,
			argv1,
			cwd
		});
		const candidates = [
			packageRoot ? path.join(packageRoot, "docs", "reference", "templates") : null,
			cwd ? path.resolve(cwd, "docs", "reference", "templates") : null,
			FALLBACK_TEMPLATE_DIR
		].filter(Boolean);
		for (const candidate of candidates) if (await pathExists(candidate)) {
			cachedTemplateDir = candidate;
			return candidate;
		}
		cachedTemplateDir = candidates[0] ?? FALLBACK_TEMPLATE_DIR;
		return cachedTemplateDir;
	})();
	try {
		return await resolvingTemplateDir;
	} finally {
		resolvingTemplateDir = void 0;
	}
}
var FALLBACK_TEMPLATE_DIR, cachedTemplateDir, resolvingTemplateDir;
var init_workspace_templates = __esmMin((() => {
	init_openclaw_root();
	FALLBACK_TEMPLATE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../docs/reference/templates");
	;
	;
}));

//#endregion
//#region src/agents/workspace.ts
function resolveDefaultAgentWorkspaceDir(env = process.env, homedir = os.homedir) {
	const profile = env.OPENCLAW_PROFILE?.trim();
	if (profile && profile.toLowerCase() !== "default") return path.join(homedir(), ".openclaw", `workspace-${profile}`);
	return path.join(homedir(), ".openclaw", "workspace");
}
function stripFrontMatter(content) {
	if (!content.startsWith("---")) return content;
	const endIndex = content.indexOf("\n---", 3);
	if (endIndex === -1) return content;
	const start = endIndex + 4;
	let trimmed = content.slice(start);
	trimmed = trimmed.replace(/^\s+/, "");
	return trimmed;
}
async function loadTemplate(name) {
	const templateDir = await resolveWorkspaceTemplateDir();
	const templatePath = path.join(templateDir, name);
	try {
		return stripFrontMatter(await fs.readFile(templatePath, "utf-8"));
	} catch {
		throw new Error(`Missing workspace template: ${name} (${templatePath}). Ensure docs/reference/templates are packaged.`);
	}
}
async function writeFileIfMissing(filePath, content) {
	try {
		await fs.writeFile(filePath, content, {
			encoding: "utf-8",
			flag: "wx"
		});
	} catch (err) {
		if (err.code !== "EEXIST") throw err;
	}
}
async function hasGitRepo(dir) {
	try {
		await fs.stat(path.join(dir, ".git"));
		return true;
	} catch {
		return false;
	}
}
async function isGitAvailable() {
	try {
		return (await runCommandWithTimeout(["git", "--version"], { timeoutMs: 2e3 })).code === 0;
	} catch {
		return false;
	}
}
async function ensureGitRepo(dir, isBrandNewWorkspace) {
	if (!isBrandNewWorkspace) return;
	if (await hasGitRepo(dir)) return;
	if (!await isGitAvailable()) return;
	try {
		await runCommandWithTimeout(["git", "init"], {
			cwd: dir,
			timeoutMs: 1e4
		});
	} catch {}
}
async function ensureAgentWorkspace(params) {
	const dir = resolveUserPath(params?.dir?.trim() ? params.dir.trim() : DEFAULT_AGENT_WORKSPACE_DIR);
	await fs.mkdir(dir, { recursive: true });
	if (!params?.ensureBootstrapFiles) return { dir };
	const agentsPath = path.join(dir, DEFAULT_AGENTS_FILENAME);
	const soulPath = path.join(dir, DEFAULT_SOUL_FILENAME);
	const toolsPath = path.join(dir, DEFAULT_TOOLS_FILENAME);
	const identityPath = path.join(dir, DEFAULT_IDENTITY_FILENAME);
	const userPath = path.join(dir, DEFAULT_USER_FILENAME);
	const heartbeatPath = path.join(dir, DEFAULT_HEARTBEAT_FILENAME);
	const bootstrapPath = path.join(dir, DEFAULT_BOOTSTRAP_FILENAME);
	const isBrandNewWorkspace = await (async () => {
		const paths = [
			agentsPath,
			soulPath,
			toolsPath,
			identityPath,
			userPath,
			heartbeatPath
		];
		return (await Promise.all(paths.map(async (p) => {
			try {
				await fs.access(p);
				return true;
			} catch {
				return false;
			}
		}))).every((v) => !v);
	})();
	const agentsTemplate = await loadTemplate(DEFAULT_AGENTS_FILENAME);
	const soulTemplate = await loadTemplate(DEFAULT_SOUL_FILENAME);
	const toolsTemplate = await loadTemplate(DEFAULT_TOOLS_FILENAME);
	const identityTemplate = await loadTemplate(DEFAULT_IDENTITY_FILENAME);
	const userTemplate = await loadTemplate(DEFAULT_USER_FILENAME);
	const heartbeatTemplate = await loadTemplate(DEFAULT_HEARTBEAT_FILENAME);
	const bootstrapTemplate = await loadTemplate(DEFAULT_BOOTSTRAP_FILENAME);
	await writeFileIfMissing(agentsPath, agentsTemplate);
	await writeFileIfMissing(soulPath, soulTemplate);
	await writeFileIfMissing(toolsPath, toolsTemplate);
	await writeFileIfMissing(identityPath, identityTemplate);
	await writeFileIfMissing(userPath, userTemplate);
	await writeFileIfMissing(heartbeatPath, heartbeatTemplate);
	if (isBrandNewWorkspace) await writeFileIfMissing(bootstrapPath, bootstrapTemplate);
	await ensureGitRepo(dir, isBrandNewWorkspace);
	return {
		dir,
		agentsPath,
		soulPath,
		toolsPath,
		identityPath,
		userPath,
		heartbeatPath,
		bootstrapPath
	};
}
async function resolveMemoryBootstrapEntries(resolvedDir) {
	const candidates = [DEFAULT_MEMORY_FILENAME, DEFAULT_MEMORY_ALT_FILENAME];
	const entries = [];
	for (const name of candidates) {
		const filePath = path.join(resolvedDir, name);
		try {
			await fs.access(filePath);
			entries.push({
				name,
				filePath
			});
		} catch {}
	}
	if (entries.length <= 1) return entries;
	const seen = /* @__PURE__ */ new Set();
	const deduped = [];
	for (const entry of entries) {
		let key = entry.filePath;
		try {
			key = await fs.realpath(entry.filePath);
		} catch {}
		if (seen.has(key)) continue;
		seen.add(key);
		deduped.push(entry);
	}
	return deduped;
}
async function loadWorkspaceBootstrapFiles(dir) {
	const resolvedDir = resolveUserPath(dir);
	const entries = [
		{
			name: DEFAULT_AGENTS_FILENAME,
			filePath: path.join(resolvedDir, DEFAULT_AGENTS_FILENAME)
		},
		{
			name: DEFAULT_SOUL_FILENAME,
			filePath: path.join(resolvedDir, DEFAULT_SOUL_FILENAME)
		},
		{
			name: DEFAULT_TOOLS_FILENAME,
			filePath: path.join(resolvedDir, DEFAULT_TOOLS_FILENAME)
		},
		{
			name: DEFAULT_IDENTITY_FILENAME,
			filePath: path.join(resolvedDir, DEFAULT_IDENTITY_FILENAME)
		},
		{
			name: DEFAULT_USER_FILENAME,
			filePath: path.join(resolvedDir, DEFAULT_USER_FILENAME)
		},
		{
			name: DEFAULT_HEARTBEAT_FILENAME,
			filePath: path.join(resolvedDir, DEFAULT_HEARTBEAT_FILENAME)
		},
		{
			name: DEFAULT_BOOTSTRAP_FILENAME,
			filePath: path.join(resolvedDir, DEFAULT_BOOTSTRAP_FILENAME)
		}
	];
	entries.push(...await resolveMemoryBootstrapEntries(resolvedDir));
	const result = [];
	for (const entry of entries) try {
		const content = await fs.readFile(entry.filePath, "utf-8");
		result.push({
			name: entry.name,
			path: entry.filePath,
			content,
			missing: false
		});
	} catch {
		result.push({
			name: entry.name,
			path: entry.filePath,
			missing: true
		});
	}
	return result;
}
function filterBootstrapFilesForSession(files, sessionKey) {
	if (!sessionKey || !isSubagentSessionKey(sessionKey)) return files;
	return files.filter((file) => SUBAGENT_BOOTSTRAP_ALLOWLIST.has(file.name));
}
var DEFAULT_AGENT_WORKSPACE_DIR, DEFAULT_AGENTS_FILENAME, DEFAULT_SOUL_FILENAME, DEFAULT_TOOLS_FILENAME, DEFAULT_IDENTITY_FILENAME, DEFAULT_USER_FILENAME, DEFAULT_HEARTBEAT_FILENAME, DEFAULT_BOOTSTRAP_FILENAME, DEFAULT_MEMORY_FILENAME, DEFAULT_MEMORY_ALT_FILENAME, SUBAGENT_BOOTSTRAP_ALLOWLIST;
var init_workspace = __esmMin((() => {
	init_exec();
	init_session_key();
	init_utils();
	init_workspace_templates();
	DEFAULT_AGENT_WORKSPACE_DIR = resolveDefaultAgentWorkspaceDir();
	DEFAULT_AGENTS_FILENAME = "AGENTS.md";
	DEFAULT_SOUL_FILENAME = "SOUL.md";
	DEFAULT_TOOLS_FILENAME = "TOOLS.md";
	DEFAULT_IDENTITY_FILENAME = "IDENTITY.md";
	DEFAULT_USER_FILENAME = "USER.md";
	DEFAULT_HEARTBEAT_FILENAME = "HEARTBEAT.md";
	DEFAULT_BOOTSTRAP_FILENAME = "BOOTSTRAP.md";
	DEFAULT_MEMORY_FILENAME = "MEMORY.md";
	DEFAULT_MEMORY_ALT_FILENAME = "memory.md";
	SUBAGENT_BOOTSTRAP_ALLOWLIST = new Set([DEFAULT_AGENTS_FILENAME, DEFAULT_TOOLS_FILENAME]);
}));

//#endregion
//#region src/agents/agent-scope.ts
function listAgents(cfg) {
	const list = cfg.agents?.list;
	if (!Array.isArray(list)) return [];
	return list.filter((entry) => Boolean(entry && typeof entry === "object"));
}
function listAgentIds(cfg) {
	const agents = listAgents(cfg);
	if (agents.length === 0) return [DEFAULT_AGENT_ID];
	const seen = /* @__PURE__ */ new Set();
	const ids = [];
	for (const entry of agents) {
		const id = normalizeAgentId(entry?.id);
		if (seen.has(id)) continue;
		seen.add(id);
		ids.push(id);
	}
	return ids.length > 0 ? ids : [DEFAULT_AGENT_ID];
}
function resolveDefaultAgentId(cfg) {
	const agents = listAgents(cfg);
	if (agents.length === 0) return DEFAULT_AGENT_ID;
	const defaults = agents.filter((agent) => agent?.default);
	if (defaults.length > 1 && !defaultAgentWarned) {
		defaultAgentWarned = true;
		console.warn("Multiple agents marked default=true; using the first entry as default.");
	}
	const chosen = (defaults[0] ?? agents[0])?.id?.trim();
	return normalizeAgentId(chosen || DEFAULT_AGENT_ID);
}
function resolveSessionAgentIds(params) {
	const defaultAgentId = resolveDefaultAgentId(params.config ?? {});
	const sessionKey = params.sessionKey?.trim();
	const normalizedSessionKey = sessionKey ? sessionKey.toLowerCase() : void 0;
	const parsed = normalizedSessionKey ? parseAgentSessionKey(normalizedSessionKey) : null;
	return {
		defaultAgentId,
		sessionAgentId: parsed?.agentId ? normalizeAgentId(parsed.agentId) : defaultAgentId
	};
}
function resolveSessionAgentId(params) {
	return resolveSessionAgentIds(params).sessionAgentId;
}
function resolveAgentEntry(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	return listAgents(cfg).find((entry) => normalizeAgentId(entry.id) === id);
}
function resolveAgentConfig(cfg, agentId) {
	const entry = resolveAgentEntry(cfg, normalizeAgentId(agentId));
	if (!entry) return;
	return {
		name: typeof entry.name === "string" ? entry.name : void 0,
		workspace: typeof entry.workspace === "string" ? entry.workspace : void 0,
		agentDir: typeof entry.agentDir === "string" ? entry.agentDir : void 0,
		model: typeof entry.model === "string" || entry.model && typeof entry.model === "object" ? entry.model : void 0,
		skills: Array.isArray(entry.skills) ? entry.skills : void 0,
		memorySearch: entry.memorySearch,
		humanDelay: entry.humanDelay,
		heartbeat: entry.heartbeat,
		identity: entry.identity,
		groupChat: entry.groupChat,
		subagents: typeof entry.subagents === "object" && entry.subagents ? entry.subagents : void 0,
		sandbox: entry.sandbox,
		tools: entry.tools
	};
}
function resolveAgentSkillsFilter(cfg, agentId) {
	const raw = resolveAgentConfig(cfg, agentId)?.skills;
	if (!raw) return;
	const normalized = raw.map((entry) => String(entry).trim()).filter(Boolean);
	return normalized.length > 0 ? normalized : [];
}
function resolveAgentModelPrimary(cfg, agentId) {
	const raw = resolveAgentConfig(cfg, agentId)?.model;
	if (!raw) return;
	if (typeof raw === "string") return raw.trim() || void 0;
	return raw.primary?.trim() || void 0;
}
function resolveAgentModelFallbacksOverride(cfg, agentId) {
	const raw = resolveAgentConfig(cfg, agentId)?.model;
	if (!raw || typeof raw === "string") return;
	if (!Object.hasOwn(raw, "fallbacks")) return;
	return Array.isArray(raw.fallbacks) ? raw.fallbacks : void 0;
}
function resolveAgentWorkspaceDir(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	const configured = resolveAgentConfig(cfg, id)?.workspace?.trim();
	if (configured) return resolveUserPath(configured);
	if (id === resolveDefaultAgentId(cfg)) {
		const fallback = cfg.agents?.defaults?.workspace?.trim();
		if (fallback) return resolveUserPath(fallback);
		return DEFAULT_AGENT_WORKSPACE_DIR;
	}
	return path.join(os.homedir(), ".openclaw", `workspace-${id}`);
}
function resolveAgentDir(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	const configured = resolveAgentConfig(cfg, id)?.agentDir?.trim();
	if (configured) return resolveUserPath(configured);
	const root = resolveStateDir(process.env, os.homedir);
	return path.join(root, "agents", id, "agent");
}
var defaultAgentWarned;
var init_agent_scope = __esmMin((() => {
	init_paths();
	init_session_key();
	init_utils();
	init_workspace();
	defaultAgentWarned = false;
}));

//#endregion
export { filterBootstrapFilesForSession as C, init_workspace_templates as D, resolveDefaultAgentWorkspaceDir as E, resolveWorkspaceTemplateDir as O, ensureAgentWorkspace as S, loadWorkspaceBootstrapFiles as T, DEFAULT_MEMORY_ALT_FILENAME as _, resolveAgentModelFallbacksOverride as a, DEFAULT_TOOLS_FILENAME as b, resolveAgentWorkspaceDir as c, resolveSessionAgentIds as d, DEFAULT_AGENTS_FILENAME as f, DEFAULT_IDENTITY_FILENAME as g, DEFAULT_HEARTBEAT_FILENAME as h, resolveAgentDir as i, resolveDefaultAgentId as l, DEFAULT_BOOTSTRAP_FILENAME as m, listAgentIds as n, resolveAgentModelPrimary as o, DEFAULT_AGENT_WORKSPACE_DIR as p, resolveAgentConfig as r, resolveAgentSkillsFilter as s, init_agent_scope as t, resolveSessionAgentId as u, DEFAULT_MEMORY_FILENAME as v, init_workspace as w, DEFAULT_USER_FILENAME as x, DEFAULT_SOUL_FILENAME as y };