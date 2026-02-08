import { Dt as __esmMin, Et as normalizeProfileName, Tt as init_profile_utils } from "./entry.js";
import path from "node:path";

//#region src/cli/cli-name.ts
function resolveCliName(argv = process.argv) {
	const argv1 = argv[1];
	if (!argv1) return DEFAULT_CLI_NAME;
	const base = path.basename(argv1).trim();
	if (KNOWN_CLI_NAMES.has(base)) return base;
	return DEFAULT_CLI_NAME;
}
function replaceCliName(command, cliName = resolveCliName()) {
	if (!command.trim()) return command;
	if (!CLI_PREFIX_RE$1.test(command)) return command;
	return command.replace(CLI_PREFIX_RE$1, (_match, runner) => {
		return `${runner ?? ""}${cliName}`;
	});
}
var DEFAULT_CLI_NAME, KNOWN_CLI_NAMES, CLI_PREFIX_RE$1;
var init_cli_name = __esmMin((() => {
	DEFAULT_CLI_NAME = "openclaw";
	KNOWN_CLI_NAMES = new Set([DEFAULT_CLI_NAME]);
	CLI_PREFIX_RE$1 = /^(?:((?:pnpm|npm|bunx|npx)\s+))?(openclaw)\b/;
}));

//#endregion
//#region src/cli/command-format.ts
function formatCliCommand(command, env = process.env) {
	const normalizedCommand = replaceCliName(command, resolveCliName());
	const profile = normalizeProfileName(env.OPENCLAW_PROFILE);
	if (!profile) return normalizedCommand;
	if (!CLI_PREFIX_RE.test(normalizedCommand)) return normalizedCommand;
	if (PROFILE_FLAG_RE.test(normalizedCommand) || DEV_FLAG_RE.test(normalizedCommand)) return normalizedCommand;
	return normalizedCommand.replace(CLI_PREFIX_RE, (match) => `${match} --profile ${profile}`);
}
var CLI_PREFIX_RE, PROFILE_FLAG_RE, DEV_FLAG_RE;
var init_command_format = __esmMin((() => {
	init_cli_name();
	init_profile_utils();
	CLI_PREFIX_RE = /^(?:pnpm|npm|bunx|npx)\s+openclaw\b|^openclaw\b/;
	PROFILE_FLAG_RE = /(?:^|\s)--profile(?:\s|=|$)/;
	DEV_FLAG_RE = /(?:^|\s)--dev(?:\s|$)/;
}));

//#endregion
export { resolveCliName as a, replaceCliName as i, init_command_format as n, init_cli_name as r, formatCliCommand as t };