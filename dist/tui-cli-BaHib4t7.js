import "./paths-7Bb9F26w.js";
import "./pi-embedded-helpers-tgwYH4iM.js";
import { J as theme, K as init_theme, d as defaultRuntime, f as init_runtime } from "./subsystem-D_qnfThk.js";
import "./utils-D-0UeDZ-.js";
import "./exec-nNwfnVsi.js";
import "./agent-scope-BKxriAmP.js";
import "./model-selection-B4yu6Rbo.js";
import "./github-copilot-token-DeDg-5yZ.js";
import "./boolean-D_9LBJdH.js";
import "./env-B64iiAJQ.js";
import "./config-DBTnQ5MG.js";
import "./manifest-registry-X2QchV7s.js";
import "./plugins-C74r-_97.js";
import "./sandbox-CV_d6eJA.js";
import "./chrome-E3qwxmfG.js";
import "./skills-Vf9A_Paw.js";
import "./routes-BqNBJKoQ.js";
import "./server-context-BQR6C91y.js";
import "./message-channel-DFfG8nsN.js";
import "./logging-BZQUHB1O.js";
import "./accounts-C4t_aibg.js";
import "./paths-D9O1Itjf.js";
import "./redact-KzWHRS5J.js";
import "./tool-display-DrLwR3OV.js";
import "./channel-summary-BMzP579N.js";
import "./client-a806dOiv.js";
import "./call-BkifdOGB.js";
import { t as formatDocsLink } from "./links-CuIQ14EC.js";
import { t as parseTimeoutMs } from "./parse-timeout-BndZ8KMO.js";
import { t as runTui } from "./tui-CEcv1Dk-.js";

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