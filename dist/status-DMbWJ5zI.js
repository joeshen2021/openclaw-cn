import { c as createSubsystemLogger, l as init_subsystem } from "./entry.js";
import { E as resolveDefaultAgentWorkspaceDir, c as resolveAgentWorkspaceDir, l as resolveDefaultAgentId, t as init_agent_scope, w as init_workspace } from "./agent-scope-Dw1YEb1p.js";
import { i as loadConfig } from "./config-DXDJHZxQ.js";
import { t as loadOpenClawPlugins } from "./loader-Dn-r2_em.js";

//#region src/plugins/status.ts
init_agent_scope();
init_workspace();
init_subsystem();
const log = createSubsystemLogger("plugins");
function buildPluginStatusReport(params) {
	const config = params?.config ?? loadConfig();
	const workspaceDir = params?.workspaceDir ? params.workspaceDir : resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config)) ?? resolveDefaultAgentWorkspaceDir();
	return {
		workspaceDir,
		...loadOpenClawPlugins({
			config,
			workspaceDir,
			logger: {
				info: (msg) => log.info(msg),
				warn: (msg) => log.warn(msg),
				error: (msg) => log.error(msg),
				debug: (msg) => log.debug(msg)
			}
		})
	};
}

//#endregion
export { buildPluginStatusReport as t };