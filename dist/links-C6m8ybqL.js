import { c as init_utils, s as formatTerminalLink } from "./utils-C_zAMV2K.js";

//#region src/terminal/links.ts
init_utils();
const DOCS_ROOT = "https://docs.openclaw.ai";
function formatDocsLink(path, label, opts) {
	const trimmed = path.trim();
	const url = trimmed.startsWith("http") ? trimmed : `${DOCS_ROOT}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
	return formatTerminalLink(label ?? url, url, {
		fallback: opts?.fallback ?? url,
		force: opts?.force
	});
}

//#endregion
export { formatDocsLink as t };