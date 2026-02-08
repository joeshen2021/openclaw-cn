import "./paths-7Bb9F26w.js";
import { I as init_globals, J as theme, K as init_theme, P as danger, d as defaultRuntime, f as init_runtime } from "./subsystem-D_qnfThk.js";
import "./utils-D-0UeDZ-.js";
import "./exec-nNwfnVsi.js";
import "./agent-scope-BKxriAmP.js";
import "./model-selection-B4yu6Rbo.js";
import "./github-copilot-token-DeDg-5yZ.js";
import "./boolean-D_9LBJdH.js";
import "./env-B64iiAJQ.js";
import "./config-DBTnQ5MG.js";
import "./manifest-registry-X2QchV7s.js";
import "./message-channel-DFfG8nsN.js";
import "./client-a806dOiv.js";
import "./call-BkifdOGB.js";
import { t as formatDocsLink } from "./links-CuIQ14EC.js";
import "./progress-CjqhhfuY.js";
import { n as callGatewayFromCli, t as addGatewayClientOptions } from "./gateway-rpc-BSTA42_F.js";

//#region src/cli/system-cli.ts
init_globals();
init_runtime();
init_theme();
const normalizeWakeMode = (raw) => {
	const mode = typeof raw === "string" ? raw.trim() : "";
	if (!mode) return "next-heartbeat";
	if (mode === "now" || mode === "next-heartbeat") return mode;
	throw new Error("--mode must be now or next-heartbeat");
};
function registerSystemCli(program) {
	const system = program.command("system").description("System tools (events, heartbeat, presence)").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/system", "docs.openclaw.ai/cli/system")}\n`);
	addGatewayClientOptions(system.command("event").description("Enqueue a system event and optionally trigger a heartbeat").requiredOption("--text <text>", "System event text").option("--mode <mode>", "Wake mode (now|next-heartbeat)", "next-heartbeat").option("--json", "Output JSON", false)).action(async (opts) => {
		try {
			const text = typeof opts.text === "string" ? opts.text.trim() : "";
			if (!text) throw new Error("--text is required");
			const result = await callGatewayFromCli("wake", opts, {
				mode: normalizeWakeMode(opts.mode),
				text
			}, { expectFinal: false });
			if (opts.json) defaultRuntime.log(JSON.stringify(result, null, 2));
			else defaultRuntime.log("ok");
		} catch (err) {
			defaultRuntime.error(danger(String(err)));
			defaultRuntime.exit(1);
		}
	});
	const heartbeat = system.command("heartbeat").description("Heartbeat controls");
	addGatewayClientOptions(heartbeat.command("last").description("Show the last heartbeat event").option("--json", "Output JSON", false)).action(async (opts) => {
		try {
			const result = await callGatewayFromCli("last-heartbeat", opts, void 0, { expectFinal: false });
			defaultRuntime.log(JSON.stringify(result, null, 2));
		} catch (err) {
			defaultRuntime.error(danger(String(err)));
			defaultRuntime.exit(1);
		}
	});
	addGatewayClientOptions(heartbeat.command("enable").description("Enable heartbeats").option("--json", "Output JSON", false)).action(async (opts) => {
		try {
			const result = await callGatewayFromCli("set-heartbeats", opts, { enabled: true }, { expectFinal: false });
			defaultRuntime.log(JSON.stringify(result, null, 2));
		} catch (err) {
			defaultRuntime.error(danger(String(err)));
			defaultRuntime.exit(1);
		}
	});
	addGatewayClientOptions(heartbeat.command("disable").description("Disable heartbeats").option("--json", "Output JSON", false)).action(async (opts) => {
		try {
			const result = await callGatewayFromCli("set-heartbeats", opts, { enabled: false }, { expectFinal: false });
			defaultRuntime.log(JSON.stringify(result, null, 2));
		} catch (err) {
			defaultRuntime.error(danger(String(err)));
			defaultRuntime.exit(1);
		}
	});
	addGatewayClientOptions(system.command("presence").description("List system presence entries").option("--json", "Output JSON", false)).action(async (opts) => {
		try {
			const result = await callGatewayFromCli("system-presence", opts, void 0, { expectFinal: false });
			defaultRuntime.log(JSON.stringify(result, null, 2));
		} catch (err) {
			defaultRuntime.error(danger(String(err)));
			defaultRuntime.exit(1);
		}
	});
}

//#endregion
export { registerSystemCli };