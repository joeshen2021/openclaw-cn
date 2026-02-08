import { i as init_paths, t as CONFIG_PATH } from "./paths-7Bb9F26w.js";
import { a as displayPath, l as init_utils } from "./utils-D-0UeDZ-.js";

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