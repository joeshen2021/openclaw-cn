import { c as createSubsystemLogger } from "./entry.js";
import { c as resolveAgentWorkspaceDir, l as resolveDefaultAgentId, t as init_agent_scope } from "./agent-scope-Dw1YEb1p.js";
import { i as loadConfig } from "./config-DXDJHZxQ.js";
import { t as loadOpenClawPlugins } from "./loader-Dn-r2_em.js";

//#region src/cli/plugin-registry.ts
init_agent_scope();
const log = createSubsystemLogger("plugins");
let pluginRegistryLoaded = false;
function ensurePluginRegistryLoaded() {
	if (pluginRegistryLoaded) return;
	const config = loadConfig();
	loadOpenClawPlugins({
		config,
		workspaceDir: resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config)),
		logger: {
			info: (msg) => log.info(msg),
			warn: (msg) => log.warn(msg),
			error: (msg) => log.error(msg),
			debug: (msg) => log.debug(msg)
		}
	});
	pluginRegistryLoaded = true;
}

//#endregion
//#region src/cli/command-options.ts
function hasExplicitOptions(command, names) {
	if (typeof command.getOptionValueSource !== "function") return false;
	return names.some((name) => command.getOptionValueSource(name) === "cli");
}

//#endregion
export { ensurePluginRegistryLoaded as n, hasExplicitOptions as t };