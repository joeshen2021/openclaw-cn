import { L as init_theme, v as defaultRuntime, y as init_runtime, z as theme } from "./entry.js";
import "./auth-profiles-BxOVCPsH.js";
import "./utils-C_zAMV2K.js";
import "./exec-DZOavyKj.js";
import "./agent-scope-Dw1YEb1p.js";
import "./github-copilot-token-v39qt3h4.js";
import "./config-DXDJHZxQ.js";
import "./manifest-registry-BBLIW4ej.js";
import "./server-context-Drp6DqGU.js";
import "./errors-BeT0Sww7.js";
import "./client-D33tCigp.js";
import "./call-B7kuA5xc.js";
import "./message-channel-CAW9X8lp.js";
import { t as formatDocsLink } from "./links-C6m8ybqL.js";
import "./plugins-DxETvMM5.js";
import "./logging-B7nsQIlp.js";
import "./accounts-Rby9lX9C.js";
import "./paths-DyX06dGK.js";
import "./routes-2X3D2ER0.js";
import "./pi-embedded-helpers-BDIYe7XP.js";
import "./sandbox-CnyGKEAQ.js";
import "./channel-summary-BiWNQbGo.js";
import "./skills-Cc75jauN.js";
import "./redact-Bt-krp_b.js";
import "./tool-display-Ci-Sn6i8.js";
import { t as parseTimeoutMs } from "./parse-timeout-DV8NQQWk.js";
import { t as runTui } from "./tui-CbwFIR1o.js";

//#region src/cli/tui-cli.ts
init_runtime();
init_theme();
function registerTuiCli(program) {
	program.command("tui").description("Open a terminal UI connected to the Gateway").option("--url <url>", "Gateway WebSocket URL (defaults to gateway.remote.url when configured)").option("--token <token>", "Gateway token (if required)").option("--password <password>", "Gateway password (if required)").option("--session <key>", "Session key (default: \"main\", or \"global\" when scope is global)").option("--deliver", "Deliver assistant replies", false).option("--thinking <level>", "Thinking level override").option("--message <text>", "Send an initial message after connecting").option("--timeout-ms <ms>", "Agent timeout in ms (defaults to agents.defaults.timeoutSeconds)").option("--history-limit <n>", "History entries to load", "200").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/tui", "docs.openclaw.ai/cli/tui")}\n`).action(async (opts) => {
		try {
			const timeoutMs = parseTimeoutMs(opts.timeoutMs);
			if (opts.timeoutMs !== void 0 && timeoutMs === void 0) defaultRuntime.error(`warning: invalid --timeout-ms "${String(opts.timeoutMs)}"; ignoring`);
			const historyLimit = Number.parseInt(String(opts.historyLimit ?? "200"), 10);
			await runTui({
				url: opts.url,
				token: opts.token,
				password: opts.password,
				session: opts.session,
				deliver: Boolean(opts.deliver),
				thinking: opts.thinking,
				message: opts.message,
				timeoutMs,
				historyLimit: Number.isNaN(historyLimit) ? void 0 : historyLimit
			});
		} catch (err) {
			defaultRuntime.error(String(err));
			defaultRuntime.exit(1);
		}
	});
}

//#endregion
export { registerTuiCli };