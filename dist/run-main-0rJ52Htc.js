import { a as normalizeEnv, d as enableConsoleCapture, n as init_env, r as isTruthyEnvValue, v as defaultRuntime, y as init_runtime } from "./entry.js";
import "./auth-profiles-BxOVCPsH.js";
import { c as init_utils, f as resolveConfigDir } from "./utils-C_zAMV2K.js";
import "./exec-DZOavyKj.js";
import "./agent-scope-Dw1YEb1p.js";
import "./github-copilot-token-v39qt3h4.js";
import "./pi-model-discovery-B4qI4QFM.js";
import { j as VERSION } from "./config-DXDJHZxQ.js";
import "./manifest-registry-BBLIW4ej.js";
import "./server-context-Drp6DqGU.js";
import { r as formatUncaughtError } from "./errors-BeT0Sww7.js";
import "./control-service-DZ96IIRX.js";
import { t as ensureOpenClawCliOnPath } from "./path-env-CYu9dMNU.js";
import "./tailscale-DKHfWJtY.js";
import "./auth-Oq-uaP90.js";
import "./client-D33tCigp.js";
import "./call-B7kuA5xc.js";
import "./message-channel-CAW9X8lp.js";
import "./links-C6m8ybqL.js";
import "./plugin-auto-enable-1UOQXTEh.js";
import "./plugins-DxETvMM5.js";
import "./logging-B7nsQIlp.js";
import "./accounts-Rby9lX9C.js";
import { jt as installUnhandledRejectionHandler } from "./loader-Dn-r2_em.js";
import "./progress-DxhUA14Q.js";
import "./prompt-style-C4pp99ls.js";
import "./note-C5Ox7_1w.js";
import "./clack-prompter-OWgnOHrg.js";
import "./onboard-channels-CcFw_6Xq.js";
import "./archive-ccN9aDgq.js";
import "./skill-scanner-COatt01v.js";
import "./installs-BsaApZgJ.js";
import "./manager-BaOx0-vj.js";
import "./paths-DyX06dGK.js";
import "./sqlite-BjhYBODp.js";
import "./routes-2X3D2ER0.js";
import "./pi-embedded-helpers-BDIYe7XP.js";
import "./deliver-D5hbzrgM.js";
import "./sandbox-CnyGKEAQ.js";
import "./channel-summary-BiWNQbGo.js";
import "./wsl-Aj7QICpg.js";
import "./skills-Cc75jauN.js";
import "./image-CSTr1wLk.js";
import "./redact-Bt-krp_b.js";
import "./tool-display-Ci-Sn6i8.js";
import "./channel-selection-Cj6vpZiw.js";
import "./session-cost-usage-yAKMCXiG.js";
import "./commands-B2o5NObG.js";
import "./pairing-store-CGTS4GX0.js";
import "./login-qr-rKLsJ17r.js";
import "./pairing-labels-CAOl1BMq.js";
import "./channels-status-issues-CnEJ2kZq.js";
import { n as ensurePluginRegistryLoaded } from "./command-options-BKpjmU3_.js";
import { a as getCommandPath, c as getPrimaryCommand, d as hasHelpOrVersion } from "./register.subclis-CH_NNOcU.js";
import "./completion-cli-D5VUc6R0.js";
import "./gateway-rpc-BQSKuIrJ.js";
import "./deps-B2a3nbtK.js";
import { h as assertSupportedRuntime } from "./daemon-runtime-DOjhJfeq.js";
import "./service-CKWGsZlB.js";
import "./systemd-CUEK4tpC.js";
import "./service-audit-C06s4xKm.js";
import "./table-DBVF2vnK.js";
import "./widearea-dns-CUcLV9v5.js";
import "./audit-DMj8IhfD.js";
import "./onboard-skills-B3Lb5C3m.js";
import "./health-format-2c9nuGkw.js";
import "./update-runner-Q1DwPgJR.js";
import "./github-copilot-auth-DSxA9-fA.js";
import "./logging-Blyr6p1m.js";
import "./hooks-status-BBTZZH_j.js";
import "./status-BvPogFJ2.js";
import "./skills-status-zctNOEqo.js";
import "./tui-CbwFIR1o.js";
import "./agent-Cqk4Ghmu.js";
import "./node-service-BPWauxH4.js";
import "./auth-health-CwMrIG7N.js";
import { a as findRoutedCommand, n as emitCliBanner, t as ensureConfigReady } from "./config-guard-DGFd7q4f.js";
import "./help-format-iWxCy5-h.js";
import "./configure-CjapAxj-.js";
import "./systemd-linger-CLmCkxbX.js";
import "./doctor-1hT3dhbh.js";
import path from "node:path";
import process$1 from "node:process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

//#region src/infra/dotenv.ts
init_utils();
function loadDotEnv(opts) {
	const quiet = opts?.quiet ?? true;
	dotenv.config({ quiet });
	const globalEnvPath = path.join(resolveConfigDir(process.env), ".env");
	if (!fs.existsSync(globalEnvPath)) return;
	dotenv.config({
		quiet,
		path: globalEnvPath,
		override: false
	});
}

//#endregion
//#region src/cli/route.ts
init_env();
init_runtime();
async function prepareRoutedCommand(params) {
	emitCliBanner(VERSION, { argv: params.argv });
	await ensureConfigReady({
		runtime: defaultRuntime,
		commandPath: params.commandPath
	});
	if (params.loadPlugins) ensurePluginRegistryLoaded();
}
async function tryRouteCli(argv) {
	if (isTruthyEnvValue(process.env.OPENCLAW_DISABLE_ROUTE_FIRST)) return false;
	if (hasHelpOrVersion(argv)) return false;
	const path = getCommandPath(argv, 2);
	if (!path[0]) return false;
	const route = findRoutedCommand(path);
	if (!route) return false;
	await prepareRoutedCommand({
		argv,
		commandPath: path,
		loadPlugins: route.loadPlugins
	});
	return route.run(argv);
}

//#endregion
//#region src/cli/run-main.ts
init_env();
function rewriteUpdateFlagArgv(argv) {
	const index = argv.indexOf("--update");
	if (index === -1) return argv;
	const next = [...argv];
	next.splice(index, 1, "update");
	return next;
}
async function runCli(argv = process$1.argv) {
	const normalizedArgv = stripWindowsNodeExec(argv);
	loadDotEnv({ quiet: true });
	normalizeEnv();
	ensureOpenClawCliOnPath();
	assertSupportedRuntime();
	if (await tryRouteCli(normalizedArgv)) return;
	enableConsoleCapture();
	const { buildProgram } = await import("./program-C5pvLG-E.js");
	const program = buildProgram();
	installUnhandledRejectionHandler();
	process$1.on("uncaughtException", (error) => {
		console.error("[openclaw] Uncaught exception:", formatUncaughtError(error));
		process$1.exit(1);
	});
	const parseArgv = rewriteUpdateFlagArgv(normalizedArgv);
	const primary = getPrimaryCommand(parseArgv);
	if (primary) {
		const { registerSubCliByName } = await import("./register.subclis-CH_NNOcU.js").then((n) => n.i);
		await registerSubCliByName(program, primary);
	}
	if (!(!primary && hasHelpOrVersion(parseArgv))) {
		const { registerPluginCliCommands } = await import("./cli-D-HIX7cK.js");
		const { loadConfig } = await import("./config-DXDJHZxQ.js").then((n) => n.t);
		registerPluginCliCommands(program, loadConfig());
	}
	await program.parseAsync(parseArgv);
}
function stripWindowsNodeExec(argv) {
	if (process$1.platform !== "win32") return argv;
	const stripControlChars = (value) => {
		let out = "";
		for (let i = 0; i < value.length; i += 1) {
			const code = value.charCodeAt(i);
			if (code >= 32 && code !== 127) out += value[i];
		}
		return out;
	};
	const normalizeArg = (value) => stripControlChars(value).replace(/^['"]+|['"]+$/g, "").trim();
	const normalizeCandidate = (value) => normalizeArg(value).replace(/^\\\\\\?\\/, "");
	const execPath = normalizeCandidate(process$1.execPath);
	const execPathLower = execPath.toLowerCase();
	const execBase = path.basename(execPath).toLowerCase();
	const isExecPath = (value) => {
		if (!value) return false;
		const normalized = normalizeCandidate(value);
		if (!normalized) return false;
		const lower = normalized.toLowerCase();
		return lower === execPathLower || path.basename(lower) === execBase || lower.endsWith("\\node.exe") || lower.endsWith("/node.exe") || lower.includes("node.exe") || path.basename(lower) === "node.exe" && fs.existsSync(normalized);
	};
	const filtered = argv.filter((arg, index) => index === 0 || !isExecPath(arg));
	if (filtered.length < 3) return filtered;
	const cleaned = [...filtered];
	if (isExecPath(cleaned[1])) cleaned.splice(1, 1);
	if (isExecPath(cleaned[2])) cleaned.splice(2, 1);
	return cleaned;
}

//#endregion
export { runCli };