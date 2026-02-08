import "./paths-7Bb9F26w.js";
import "./pi-embedded-helpers-tgwYH4iM.js";
import { lt as loadOpenClawPlugins } from "./reply-Cq9qFKEL.js";
import { n as init_subsystem, t as createSubsystemLogger } from "./subsystem-D_qnfThk.js";
import "./utils-D-0UeDZ-.js";
import "./exec-nNwfnVsi.js";
import { c as resolveAgentWorkspaceDir, l as resolveDefaultAgentId, t as init_agent_scope } from "./agent-scope-BKxriAmP.js";
import "./model-selection-B4yu6Rbo.js";
import "./github-copilot-token-DeDg-5yZ.js";
import "./boolean-D_9LBJdH.js";
import "./env-B64iiAJQ.js";
import { i as loadConfig } from "./config-DBTnQ5MG.js";
import "./manifest-registry-X2QchV7s.js";
import "./plugins-C74r-_97.js";
import "./sandbox-CV_d6eJA.js";
import "./image-C0Sy06WY.js";
import "./pi-model-discovery-ClApXX3l.js";
import "./chrome-E3qwxmfG.js";
import "./skills-Vf9A_Paw.js";
import "./routes-BqNBJKoQ.js";
import "./server-context-BQR6C91y.js";
import "./message-channel-DFfG8nsN.js";
import "./logging-BZQUHB1O.js";
import "./accounts-C4t_aibg.js";
import "./paths-D9O1Itjf.js";
import "./redact-KzWHRS5J.js";
import "./tool-display-DrLwR3OV.js";
import "./deliver-DTGGDD9R.js";
import "./dispatcher-Dfaxw239.js";
import "./manager-CkuJdzc5.js";
import "./sqlite-835Xoi1L.js";
import "./channel-summary-BMzP579N.js";
import "./client-a806dOiv.js";
import "./call-BkifdOGB.js";
import "./login-qr-BMTcreel.js";
import "./pairing-store-CpvfChZ5.js";
import "./links-CuIQ14EC.js";
import "./progress-CjqhhfuY.js";
import "./pi-tools.policy-CNqH_lmL.js";
import "./prompt-style-BW5RIhxO.js";
import "./pairing-labels-30hQfc8u.js";
import "./session-cost-usage-CGurmJ4f.js";
import "./control-service-Bf1ZadOs.js";
import "./channel-selection-BnPG73e9.js";

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