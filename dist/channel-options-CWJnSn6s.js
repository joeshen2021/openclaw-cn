import { dt as CHAT_CHANNEL_ORDER, gt as init_registry, n as init_env, r as isTruthyEnvValue } from "./entry.js";
import { i as listChannelPluginCatalogEntries } from "./plugin-auto-enable-1UOQXTEh.js";
import { n as listChannelPlugins } from "./plugins-DxETvMM5.js";
import { n as ensurePluginRegistryLoaded } from "./command-options-BKpjmU3_.js";

//#region src/cli/channel-options.ts
init_registry();
init_env();
function dedupe(values) {
	const seen = /* @__PURE__ */ new Set();
	const resolved = [];
	for (const value of values) {
		if (!value || seen.has(value)) continue;
		seen.add(value);
		resolved.push(value);
	}
	return resolved;
}
function resolveCliChannelOptions() {
	const catalog = listChannelPluginCatalogEntries().map((entry) => entry.id);
	const base = dedupe([...CHAT_CHANNEL_ORDER, ...catalog]);
	if (isTruthyEnvValue(process.env.OPENCLAW_EAGER_CHANNEL_OPTIONS)) {
		ensurePluginRegistryLoaded();
		const pluginIds = listChannelPlugins().map((plugin) => plugin.id);
		return dedupe([...base, ...pluginIds]);
	}
	return base;
}
function formatCliChannelOptions(extra = []) {
	return [...extra, ...resolveCliChannelOptions()].join("|");
}

//#endregion
export { resolveCliChannelOptions as n, formatCliChannelOptions as t };