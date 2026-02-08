import { _ as resolveStateDir, i as init_paths } from "./paths-7Bb9F26w.js";
import { c as init_session_key, n as DEFAULT_AGENT_ID, u as normalizeAgentId } from "./session-key-CD-TlcsJ.js";
import os from "node:os";
import path from "node:path";

//#region src/config/sessions/paths.ts
init_session_key();
init_paths();
function resolveAgentSessionsDir(agentId, env = process.env, homedir = os.homedir) {
	const root = resolveStateDir(env, homedir);
	const id = normalizeAgentId(agentId ?? DEFAULT_AGENT_ID);
	return path.join(root, "agents", id, "sessions");
}
function resolveSessionTranscriptsDir(env = process.env, homedir = os.homedir) {
	return resolveAgentSessionsDir(DEFAULT_AGENT_ID, env, homedir);
}
function resolveSessionTranscriptsDirForAgent(agentId, env = process.env, homedir = os.homedir) {
	return resolveAgentSessionsDir(agentId, env, homedir);
}
function resolveDefaultSessionStorePath(agentId) {
	return path.join(resolveAgentSessionsDir(agentId), "sessions.json");
}
function resolveSessionTranscriptPath(sessionId, agentId, topicId) {
	const safeTopicId = typeof topicId === "string" ? encodeURIComponent(topicId) : typeof topicId === "number" ? String(topicId) : void 0;
	const fileName = safeTopicId !== void 0 ? `${sessionId}-topic-${safeTopicId}.jsonl` : `${sessionId}.jsonl`;
	return path.join(resolveAgentSessionsDir(agentId), fileName);
}
function resolveSessionFilePath(sessionId, entry, opts) {
	const candidate = entry?.sessionFile?.trim();
	return candidate ? candidate : resolveSessionTranscriptPath(sessionId, opts?.agentId);
}
function resolveStorePath(store, opts) {
	const agentId = normalizeAgentId(opts?.agentId ?? DEFAULT_AGENT_ID);
	if (!store) return resolveDefaultSessionStorePath(agentId);
	if (store.includes("{agentId}")) {
		const expanded = store.replaceAll("{agentId}", agentId);
		if (expanded.startsWith("~")) return path.resolve(expanded.replace(/^~(?=$|[\\/])/, os.homedir()));
		return path.resolve(expanded);
	}
	if (store.startsWith("~")) return path.resolve(store.replace(/^~(?=$|[\\/])/, os.homedir()));
	return path.resolve(store);
}

//#endregion
export { resolveSessionTranscriptsDirForAgent as a, resolveSessionTranscriptsDir as i, resolveSessionFilePath as n, resolveStorePath as o, resolveSessionTranscriptPath as r, resolveDefaultSessionStorePath as t };