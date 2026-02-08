import { v as __esmMin } from "./paths-7Bb9F26w.js";
import { n as init_subsystem, t as createSubsystemLogger } from "./subsystem-D_qnfThk.js";
import { n as parseBooleanValue, t as init_boolean } from "./boolean-D_9LBJdH.js";

//#region src/infra/env.ts
function formatEnvValue(value, redact) {
	if (redact) return "<redacted>";
	const singleLine = value.replace(/\s+/g, " ").trim();
	if (singleLine.length <= 160) return singleLine;
	return `${singleLine.slice(0, 160)}…`;
}
function logAcceptedEnvOption(option) {
	if (process.env.VITEST || false) return;
	if (loggedEnv.has(option.key)) return;
	const rawValue = option.value ?? process.env[option.key];
	if (!rawValue || !rawValue.trim()) return;
	loggedEnv.add(option.key);
	log.info(`env: ${option.key}=${formatEnvValue(rawValue, option.redact)} (${option.description})`);
}
function normalizeZaiEnv() {
	if (!process.env.ZAI_API_KEY?.trim() && process.env.Z_AI_API_KEY?.trim()) process.env.ZAI_API_KEY = process.env.Z_AI_API_KEY;
}
function isTruthyEnvValue(value) {
	return parseBooleanValue(value) === true;
}
function normalizeEnv() {
	normalizeZaiEnv();
}
var log, loggedEnv;
var init_env = __esmMin((() => {
	init_subsystem();
	init_boolean();
	log = createSubsystemLogger("env");
	loggedEnv = /* @__PURE__ */ new Set();
}));

//#endregion
export { normalizeEnv as i, isTruthyEnvValue as n, logAcceptedEnvOption as r, init_env as t };