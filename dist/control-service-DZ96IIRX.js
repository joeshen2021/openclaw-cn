import { Ot as __exportAll, c as createSubsystemLogger, l as init_subsystem } from "./entry.js";
import { i as loadConfig } from "./config-DXDJHZxQ.js";
import { a as resolveBrowserConfig, o as resolveProfile, t as createBrowserRouteContext } from "./server-context-Drp6DqGU.js";
import { S as ensureChromeExtensionRelayServer } from "./errors-BeT0Sww7.js";

//#region src/browser/control-service.ts
var control_service_exports = /* @__PURE__ */ __exportAll({
	createBrowserControlContext: () => createBrowserControlContext,
	getBrowserControlState: () => getBrowserControlState,
	startBrowserControlServiceFromConfig: () => startBrowserControlServiceFromConfig,
	stopBrowserControlService: () => stopBrowserControlService
});
init_subsystem();
let state = null;
const logService = createSubsystemLogger("browser").child("service");
function getBrowserControlState() {
	return state;
}
function createBrowserControlContext() {
	return createBrowserRouteContext({ getState: () => state });
}
async function startBrowserControlServiceFromConfig() {
	if (state) return state;
	const cfg = loadConfig();
	const resolved = resolveBrowserConfig(cfg.browser, cfg);
	if (!resolved.enabled) return null;
	state = {
		server: null,
		port: resolved.controlPort,
		resolved,
		profiles: /* @__PURE__ */ new Map()
	};
	for (const name of Object.keys(resolved.profiles)) {
		const profile = resolveProfile(resolved, name);
		if (!profile || profile.driver !== "extension") continue;
		await ensureChromeExtensionRelayServer({ cdpUrl: profile.cdpUrl }).catch((err) => {
			logService.warn(`Chrome extension relay init failed for profile "${name}": ${String(err)}`);
		});
	}
	logService.info(`Browser control service ready (profiles=${Object.keys(resolved.profiles).length})`);
	return state;
}
async function stopBrowserControlService() {
	const current = state;
	if (!current) return;
	const ctx = createBrowserRouteContext({ getState: () => state });
	try {
		for (const name of Object.keys(current.resolved.profiles)) try {
			await ctx.forProfile(name).stopRunningBrowser();
		} catch {}
	} catch (err) {
		logService.warn(`openclaw browser stop failed: ${String(err)}`);
	}
	state = null;
	try {
		await (await import("./pw-ai-CcMB5ka_.js")).closePlaywrightBrowserConnection();
	} catch {}
}

//#endregion
export { createBrowserControlContext as n, startBrowserControlServiceFromConfig as r, control_service_exports as t };