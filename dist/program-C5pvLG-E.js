import { L as init_theme, M as setVerbose, O as init_globals, R as isRich, n as init_env, r as isTruthyEnvValue, v as defaultRuntime, y as init_runtime, z as theme } from "./entry.js";
import "./auth-profiles-BxOVCPsH.js";
import { a as resolveCliName, i as replaceCliName, r as init_cli_name } from "./command-format-4psjdhj-.js";
import "./utils-C_zAMV2K.js";
import "./exec-DZOavyKj.js";
import "./agent-scope-Dw1YEb1p.js";
import "./github-copilot-token-v39qt3h4.js";
import "./pi-model-discovery-B4qI4QFM.js";
import { j as VERSION } from "./config-DXDJHZxQ.js";
import "./manifest-registry-BBLIW4ej.js";
import "./server-context-Drp6DqGU.js";
import "./errors-BeT0Sww7.js";
import "./control-service-DZ96IIRX.js";
import "./tailscale-DKHfWJtY.js";
import "./auth-Oq-uaP90.js";
import "./client-D33tCigp.js";
import "./call-B7kuA5xc.js";
import "./message-channel-CAW9X8lp.js";
import { t as formatDocsLink } from "./links-C6m8ybqL.js";
import "./plugin-auto-enable-1UOQXTEh.js";
import "./plugins-DxETvMM5.js";
import "./logging-B7nsQIlp.js";
import "./accounts-Rby9lX9C.js";
import "./loader-Dn-r2_em.js";
import "./progress-DxhUA14Q.js";
import "./prompt-style-C4pp99ls.js";
import "./note-C5Ox7_1w.js";
import "./clack-prompter-OWgnOHrg.js";
import "./onboard-channels-CcFw_6Xq.js";
import "./archive-ccN9aDgq.js";
import "./skill-scanner-COatt01v.js";
import "./installs-BsaApZgJ.js";
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
import "./channels-status-issues-CnEJ2kZq.js";
import { n as ensurePluginRegistryLoaded } from "./command-options-BKpjmU3_.js";
import { n as resolveCliChannelOptions } from "./channel-options-CWJnSn6s.js";
import { a as getCommandPath, d as hasHelpOrVersion, l as getVerboseFlag } from "./register.subclis-CH_NNOcU.js";
import "./completion-cli-D5VUc6R0.js";
import "./gateway-rpc-BQSKuIrJ.js";
import "./deps-B2a3nbtK.js";
import "./daemon-runtime-DOjhJfeq.js";
import "./service-CKWGsZlB.js";
import "./systemd-CUEK4tpC.js";
import "./service-audit-C06s4xKm.js";
import "./table-DBVF2vnK.js";
import "./widearea-dns-CUcLV9v5.js";
import "./audit-DMj8IhfD.js";
import "./onboard-skills-B3Lb5C3m.js";
import "./health-format-2c9nuGkw.js";
import "./update-runner-Q1DwPgJR.js";
import "./github-copilot-auth-DSxA9-fA.js";
import "./logging-Blyr6p1m.js";
import "./hooks-status-BBTZZH_j.js";
import "./status-BvPogFJ2.js";
import "./skills-status-zctNOEqo.js";
import "./tui-CbwFIR1o.js";
import "./agent-Cqk4Ghmu.js";
import "./node-service-BPWauxH4.js";
import { t as forceFreePort } from "./ports-D_bZt1jj.js";
import "./auth-health-CwMrIG7N.js";
import { i as hasEmittedCliBanner, n as emitCliBanner, o as registerProgramCommands, r as formatCliBannerLine, t as ensureConfigReady } from "./config-guard-DGFd7q4f.js";
import "./help-format-iWxCy5-h.js";
import "./configure-CjapAxj-.js";
import "./systemd-linger-CLmCkxbX.js";
import "./doctor-1hT3dhbh.js";
import { Command } from "commander";

//#region src/cli/program/context.ts
function createProgramContext() {
	const channelOptions = resolveCliChannelOptions();
	return {
		programVersion: VERSION,
		channelOptions,
		messageChannelOptions: channelOptions.join("|"),
		agentChannelOptions: ["last", ...channelOptions].join("|")
	};
}

//#endregion
//#region src/cli/program/help.ts
init_theme();
init_cli_name();
const CLI_NAME = resolveCliName();
const EXAMPLES = [
	["openclaw channels login --verbose", "Link personal WhatsApp Web and show QR + connection logs."],
	["openclaw message send --target +15555550123 --message \"Hi\" --json", "Send via your web session and print JSON result."],
	["openclaw gateway --port 18789", "Run the WebSocket Gateway locally."],
	["openclaw --dev gateway", "Run a dev Gateway (isolated state/config) on ws://127.0.0.1:19001."],
	["openclaw gateway --force", "Kill anything bound to the default gateway port, then start it."],
	["openclaw gateway ...", "Gateway control via WebSocket."],
	["openclaw agent --to +15555550123 --message \"Run summary\" --deliver", "Talk directly to the agent using the Gateway; optionally send the WhatsApp reply."],
	["openclaw message send --channel telegram --target @mychat --message \"Hi\"", "Send via your Telegram bot."]
];
function configureProgramHelp(program, ctx) {
	program.name(CLI_NAME).description("").version(ctx.programVersion).option("--dev", "Dev profile: isolate state under ~/.openclaw-dev, default gateway port 19001, and shift derived ports (browser/canvas)").option("--profile <name>", "Use a named profile (isolates OPENCLAW_STATE_DIR/OPENCLAW_CONFIG_PATH under ~/.openclaw-<name>)");
	program.option("--no-color", "Disable ANSI colors", false);
	program.configureHelp({
		sortSubcommands: true,
		sortOptions: true,
		optionTerm: (option) => theme.option(option.flags),
		subcommandTerm: (cmd) => theme.command(cmd.name())
	});
	program.configureOutput({
		writeOut: (str) => {
			const colored = str.replace(/^Usage:/gm, theme.heading("Usage:")).replace(/^Options:/gm, theme.heading("Options:")).replace(/^Commands:/gm, theme.heading("Commands:"));
			process.stdout.write(colored);
		},
		writeErr: (str) => process.stderr.write(str),
		outputError: (str, write) => write(theme.error(str))
	});
	if (process.argv.includes("-V") || process.argv.includes("--version") || process.argv.includes("-v")) {
		console.log(ctx.programVersion);
		process.exit(0);
	}
	program.addHelpText("beforeAll", () => {
		if (hasEmittedCliBanner()) return "";
		const rich = isRich();
		return `\n${formatCliBannerLine(ctx.programVersion, { richTty: rich })}\n`;
	});
	const fmtExamples = EXAMPLES.map(([cmd, desc]) => `  ${theme.command(replaceCliName(cmd, CLI_NAME))}\n    ${theme.muted(desc)}`).join("\n");
	program.addHelpText("afterAll", ({ command }) => {
		if (command !== program) return "";
		const docs = formatDocsLink("/cli", "docs.openclaw.ai/cli");
		return `\n${theme.heading("Examples:")}\n${fmtExamples}\n\n${theme.muted("Docs:")} ${docs}\n`;
	});
}

//#endregion
//#region src/cli/program/preaction.ts
init_globals();
init_env();
init_runtime();
init_cli_name();
function setProcessTitleForCommand(actionCommand) {
	let current = actionCommand;
	while (current.parent && current.parent.parent) current = current.parent;
	const name = current.name();
	const cliName = resolveCliName();
	if (!name || name === cliName) return;
	process.title = `${cliName}-${name}`;
}
const PLUGIN_REQUIRED_COMMANDS = new Set([
	"message",
	"channels",
	"directory"
]);
function registerPreActionHooks(program, programVersion) {
	program.hook("preAction", async (_thisCommand, actionCommand) => {
		setProcessTitleForCommand(actionCommand);
		const argv = process.argv;
		if (hasHelpOrVersion(argv)) return;
		const commandPath = getCommandPath(argv, 2);
		if (!(isTruthyEnvValue(process.env.OPENCLAW_HIDE_BANNER) || commandPath[0] === "update" || commandPath[0] === "completion" || commandPath[0] === "plugins" && commandPath[1] === "update")) emitCliBanner(programVersion);
		const verbose = getVerboseFlag(argv, { includeDebug: true });
		setVerbose(verbose);
		if (!verbose) process.env.NODE_NO_WARNINGS ??= "1";
		if (commandPath[0] === "doctor" || commandPath[0] === "completion") return;
		await ensureConfigReady({
			runtime: defaultRuntime,
			commandPath
		});
		if (PLUGIN_REQUIRED_COMMANDS.has(commandPath[0])) ensurePluginRegistryLoaded();
	});
}

//#endregion
//#region src/cli/program/build-program.ts
function buildProgram() {
	const program = new Command();
	const ctx = createProgramContext();
	const argv = process.argv;
	configureProgramHelp(program, ctx);
	registerPreActionHooks(program, ctx.programVersion);
	registerProgramCommands(program, ctx, argv);
	return program;
}

//#endregion
export { buildProgram };