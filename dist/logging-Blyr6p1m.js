import { X as init_paths, q as CONFIG_PATH } from "./entry.js";
import { c as init_utils, i as displayPath } from "./utils-C_zAMV2K.js";

//#region src/config/logging.ts
init_utils();
init_paths();
function formatConfigPath(path = CONFIG_PATH) {
	return displayPath(path);
}
function logConfigUpdated(runtime, opts = {}) {
	const path = formatConfigPath(opts.path ?? CONFIG_PATH);
	const suffix = opts.suffix ? ` ${opts.suffix}` : "";
	runtime.log(`Updated ${path}${suffix}`);
}

//#endregion
export { logConfigUpdated as n, formatConfigPath as t };