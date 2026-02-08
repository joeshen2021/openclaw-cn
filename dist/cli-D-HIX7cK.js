import { c as createSubsystemLogger, l as init_subsystem } from "./entry.js";
import "./auth-profiles-BxOVCPsH.js";
import "./utils-C_zAMV2K.js";
import "./exec-DZOavyKj.js";
import { c as resolveAgentWorkspaceDir, l as resolveDefaultAgentId, t as init_agent_scope } from "./agent-scope-Dw1YEb1p.js";
import "./github-copilot-token-v39qt3h4.js";
import "./pi-model-discovery-B4qI4QFM.js";
import { i as loadConfig } from "./config-DXDJHZxQ.js";
import "./manifest-registry-BBLIW4ej.js";
import "./server-context-Drp6DqGU.js";
import "./errors-BeT0Sww7.js";
import "./control-service-DZ96IIRX.js";
import "./client-D33tCigp.js";
import "./call-B7kuA5xc.js";
import "./message-channel-CAW9X8lp.js";
import "./links-C6m8ybqL.js";
import "./plugins-DxETvMM5.js";
import "./logging-B7nsQIlp.js";
import "./accounts-Rby9lX9C.js";
import { t as loadOpenClawPlugins } from "./loader-Dn-r2_em.js";
import "./progress-DxhUA14Q.js";
import "./prompt-style-C4pp99ls.js";
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

//#region src/plugins/cli.ts
init_agent_scope();
init_subsystem();
const log = createSubsystemLogger("plugins");
function registerPluginCliCommands(program, cfg) {
	const config = cfg ?? loadConfig();
	const workspaceDir = resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config));
	const logger = {
		info: (msg) => log.info(msg),
		warn: (msg) => log.warn(msg),
		error: (msg) => log.error(msg),
		debug: (msg) => log.debug(msg)
	};
	const registry = loadOpenClawPlugins({
		config,
		workspaceDir,
		logger
	});
	const existingCommands = new Set(program.commands.map((cmd) => cmd.name()));
	for (const entry of registry.cliRegistrars) {
		if (entry.commands.length > 0) {
			const overlaps = entry.commands.filter((command) => existingCommands.has(command));
			if (overlaps.length > 0) {
				log.debug(`plugin CLI register skipped (${entry.pluginId}): command already registered (${overlaps.join(", ")})`);
				continue;
			}
		}
		try {
			const result = entry.register({
				program,
				config,
				workspaceDir,
				logger
			});
			if (result && typeof result.then === "function") result.catch((err) => {
				log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
			});
			for (const command of entry.commands) existingCommands.add(command);
		} catch (err) {
			log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
		}
	}
}

//#endregion
export { registerPluginCliCommands };