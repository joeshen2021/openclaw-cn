import "./paths-7Bb9F26w.js";
import "./pi-embedded-helpers-tgwYH4iM.js";
import "./reply-Cq9qFKEL.js";
import { J as theme, K as init_theme, d as defaultRuntime, f as init_runtime } from "./subsystem-D_qnfThk.js";
import { _ as shortenHomeInString, g as resolveUserPath, l as init_utils, v as shortenHomePath } from "./utils-D-0UeDZ-.js";
import "./exec-nNwfnVsi.js";
import "./agent-scope-BKxriAmP.js";
import "./model-selection-B4yu6Rbo.js";
import "./github-copilot-token-DeDg-5yZ.js";
import "./boolean-D_9LBJdH.js";
import "./env-B64iiAJQ.js";
import { c as writeConfigFile, i as loadConfig } from "./config-DBTnQ5MG.js";
import { u as applyExclusiveSlotSelection } from "./manifest-registry-X2QchV7s.js";
import "./plugins-C74r-_97.js";
import "./sandbox-CV_d6eJA.js";
import "./image-C0Sy06WY.js";
import "./pi-model-discovery-ClApXX3l.js";
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
import "./deliver-DTGGDD9R.js";
import "./dispatcher-Dfaxw239.js";
import "./manager-CkuJdzc5.js";
import "./sqlite-835Xoi1L.js";
import "./channel-summary-BMzP579N.js";
import "./client-a806dOiv.js";
import "./call-BkifdOGB.js";
import "./login-qr-BMTcreel.js";
import "./pairing-store-CpvfChZ5.js";
import { t as formatDocsLink } from "./links-CuIQ14EC.js";
import "./progress-CjqhhfuY.js";
import "./pi-tools.policy-CNqH_lmL.js";
import "./prompt-style-BW5RIhxO.js";
import "./pairing-labels-30hQfc8u.js";
import "./session-cost-usage-CGurmJ4f.js";
import "./control-service-Bf1ZadOs.js";
import "./channel-selection-BnPG73e9.js";
import { i as resolveArchiveKind } from "./archive-CMgCFw4Y.js";
import "./skill-scanner-CXg3PnU6.js";
import { n as installPluginFromNpmSpec, r as installPluginFromPath, t as recordPluginInstall } from "./installs-DjQTqMCh.js";
import { t as renderTable } from "./table-Cl4aryUh.js";
import { t as buildPluginStatusReport } from "./status-CGfwVnjo.js";
import { n as updateNpmInstalledPlugins } from "./update-CSpPzOjp.js";
import path from "node:path";
import fs from "node:fs";

//#region src/cli/plugins-cli.ts
init_runtime();
init_theme();
init_utils();
function formatPluginLine(plugin, verbose = false) {
	const status = plugin.status === "loaded" ? theme.success("loaded") : plugin.status === "disabled" ? theme.warn("disabled") : theme.error("error");
	const name = theme.command(plugin.name || plugin.id);
	const idSuffix = plugin.name && plugin.name !== plugin.id ? theme.muted(` (${plugin.id})`) : "";
	const desc = plugin.description ? theme.muted(plugin.description.length > 60 ? `${plugin.description.slice(0, 57)}...` : plugin.description) : theme.muted("(no description)");
	if (!verbose) return `${name}${idSuffix} ${status} - ${desc}`;
	const parts = [
		`${name}${idSuffix} ${status}`,
		`  source: ${theme.muted(shortenHomeInString(plugin.source))}`,
		`  origin: ${plugin.origin}`
	];
	if (plugin.version) parts.push(`  version: ${plugin.version}`);
	if (plugin.providerIds.length > 0) parts.push(`  providers: ${plugin.providerIds.join(", ")}`);
	if (plugin.error) parts.push(theme.error(`  error: ${plugin.error}`));
	return parts.join("\n");
}
function applySlotSelectionForPlugin(config, pluginId) {
	const report = buildPluginStatusReport({ config });
	const plugin = report.plugins.find((entry) => entry.id === pluginId);
	if (!plugin) return {
		config,
		warnings: []
	};
	const result = applyExclusiveSlotSelection({
		config,
		selectedId: plugin.id,
		selectedKind: plugin.kind,
		registry: report
	});
	return {
		config: result.config,
		warnings: result.warnings
	};
}
function logSlotWarnings(warnings) {
	if (warnings.length === 0) return;
	for (const warning of warnings) defaultRuntime.log(theme.warn(warning));
}
function registerPluginsCli(program) {
	const plugins = program.command("plugins").description("Manage OpenClaw plugins/extensions").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/plugins", "docs.openclaw.ai/cli/plugins")}\n`);
	plugins.command("list").description("List discovered plugins").option("--json", "Print JSON").option("--enabled", "Only show enabled plugins", false).option("--verbose", "Show detailed entries", false).action((opts) => {
		const report = buildPluginStatusReport();
		const list = opts.enabled ? report.plugins.filter((p) => p.status === "loaded") : report.plugins;
		if (opts.json) {
			const payload = {
				workspaceDir: report.workspaceDir,
				plugins: list,
				diagnostics: report.diagnostics
			};
			defaultRuntime.log(JSON.stringify(payload, null, 2));
			return;
		}
		if (list.length === 0) {
			defaultRuntime.log(theme.muted("No plugins found."));
			return;
		}
		const loaded = list.filter((p) => p.status === "loaded").length;
		defaultRuntime.log(`${theme.heading("Plugins")} ${theme.muted(`(${loaded}/${list.length} loaded)`)}`);
		if (!opts.verbose) {
			const tableWidth = Math.max(60, (process.stdout.columns ?? 120) - 1);
			const rows = list.map((plugin) => {
				const desc = plugin.description ? theme.muted(plugin.description) : "";
				const sourceLine = desc ? `${plugin.source}\n${desc}` : plugin.source;
				return {
					Name: plugin.name || plugin.id,
					ID: plugin.name && plugin.name !== plugin.id ? plugin.id : "",
					Status: plugin.status === "loaded" ? theme.success("loaded") : plugin.status === "disabled" ? theme.warn("disabled") : theme.error("error"),
					Source: sourceLine,
					Version: plugin.version ?? ""
				};
			});
			defaultRuntime.log(renderTable({
				width: tableWidth,
				columns: [
					{
						key: "Name",
						header: "Name",
						minWidth: 14,
						flex: true
					},
					{
						key: "ID",
						header: "ID",
						minWidth: 10,
						flex: true
					},
					{
						key: "Status",
						header: "Status",
						minWidth: 10
					},
					{
						key: "Source",
						header: "Source",
						minWidth: 26,
						flex: true
					},
					{
						key: "Version",
						header: "Version",
						minWidth: 8
					}
				],
				rows
			}).trimEnd());
			return;
		}
		const lines = [];
		for (const plugin of list) {
			lines.push(formatPluginLine(plugin, true));
			lines.push("");
		}
		defaultRuntime.log(lines.join("\n").trim());
	});
	plugins.command("info").description("Show plugin details").argument("<id>", "Plugin id").option("--json", "Print JSON").action((id, opts) => {
		const plugin = buildPluginStatusReport().plugins.find((p) => p.id === id || p.name === id);
		if (!plugin) {
			defaultRuntime.error(`Plugin not found: ${id}`);
			process.exit(1);
		}
		const install = loadConfig().plugins?.installs?.[plugin.id];
		if (opts.json) {
			defaultRuntime.log(JSON.stringify(plugin, null, 2));
			return;
		}
		const lines = [];
		lines.push(theme.heading(plugin.name || plugin.id));
		if (plugin.name && plugin.name !== plugin.id) lines.push(theme.muted(`id: ${plugin.id}`));
		if (plugin.description) lines.push(plugin.description);
		lines.push("");
		lines.push(`${theme.muted("Status:")} ${plugin.status}`);
		lines.push(`${theme.muted("Source:")} ${shortenHomeInString(plugin.source)}`);
		lines.push(`${theme.muted("Origin:")} ${plugin.origin}`);
		if (plugin.version) lines.push(`${theme.muted("Version:")} ${plugin.version}`);
		if (plugin.toolNames.length > 0) lines.push(`${theme.muted("Tools:")} ${plugin.toolNames.join(", ")}`);
		if (plugin.hookNames.length > 0) lines.push(`${theme.muted("Hooks:")} ${plugin.hookNames.join(", ")}`);
		if (plugin.gatewayMethods.length > 0) lines.push(`${theme.muted("Gateway methods:")} ${plugin.gatewayMethods.join(", ")}`);
		if (plugin.providerIds.length > 0) lines.push(`${theme.muted("Providers:")} ${plugin.providerIds.join(", ")}`);
		if (plugin.cliCommands.length > 0) lines.push(`${theme.muted("CLI commands:")} ${plugin.cliCommands.join(", ")}`);
		if (plugin.services.length > 0) lines.push(`${theme.muted("Services:")} ${plugin.services.join(", ")}`);
		if (plugin.error) lines.push(`${theme.error("Error:")} ${plugin.error}`);
		if (install) {
			lines.push("");
			lines.push(`${theme.muted("Install:")} ${install.source}`);
			if (install.spec) lines.push(`${theme.muted("Spec:")} ${install.spec}`);
			if (install.sourcePath) lines.push(`${theme.muted("Source path:")} ${shortenHomePath(install.sourcePath)}`);
			if (install.installPath) lines.push(`${theme.muted("Install path:")} ${shortenHomePath(install.installPath)}`);
			if (install.version) lines.push(`${theme.muted("Recorded version:")} ${install.version}`);
			if (install.installedAt) lines.push(`${theme.muted("Installed at:")} ${install.installedAt}`);
		}
		defaultRuntime.log(lines.join("\n"));
	});
	plugins.command("enable").description("Enable a plugin in config").argument("<id>", "Plugin id").action(async (id) => {
		const cfg = loadConfig();
		let next = {
			...cfg,
			plugins: {
				...cfg.plugins,
				entries: {
					...cfg.plugins?.entries,
					[id]: {
						...(cfg.plugins?.entries)?.[id],
						enabled: true
					}
				}
			}
		};
		const slotResult = applySlotSelectionForPlugin(next, id);
		next = slotResult.config;
		await writeConfigFile(next);
		logSlotWarnings(slotResult.warnings);
		defaultRuntime.log(`Enabled plugin "${id}". Restart the gateway to apply.`);
	});
	plugins.command("disable").description("Disable a plugin in config").argument("<id>", "Plugin id").action(async (id) => {
		const cfg = loadConfig();
		await writeConfigFile({
			...cfg,
			plugins: {
				...cfg.plugins,
				entries: {
					...cfg.plugins?.entries,
					[id]: {
						...(cfg.plugins?.entries)?.[id],
						enabled: false
					}
				}
			}
		});
		defaultRuntime.log(`Disabled plugin "${id}". Restart the gateway to apply.`);
	});
	plugins.command("install").description("Install a plugin (path, archive, or npm spec)").argument("<path-or-spec>", "Path (.ts/.js/.zip/.tgz/.tar.gz) or an npm package spec").option("-l, --link", "Link a local path instead of copying", false).action(async (raw, opts) => {
		const resolved = resolveUserPath(raw);
		const cfg = loadConfig();
		if (fs.existsSync(resolved)) {
			if (opts.link) {
				const existing = cfg.plugins?.load?.paths ?? [];
				const merged = Array.from(new Set([...existing, resolved]));
				const probe = await installPluginFromPath({
					path: resolved,
					dryRun: true
				});
				if (!probe.ok) {
					defaultRuntime.error(probe.error);
					process.exit(1);
				}
				let next = {
					...cfg,
					plugins: {
						...cfg.plugins,
						load: {
							...cfg.plugins?.load,
							paths: merged
						},
						entries: {
							...cfg.plugins?.entries,
							[probe.pluginId]: {
								...cfg.plugins?.entries?.[probe.pluginId],
								enabled: true
							}
						}
					}
				};
				next = recordPluginInstall(next, {
					pluginId: probe.pluginId,
					source: "path",
					sourcePath: resolved,
					installPath: resolved,
					version: probe.version
				});
				const slotResult = applySlotSelectionForPlugin(next, probe.pluginId);
				next = slotResult.config;
				await writeConfigFile(next);
				logSlotWarnings(slotResult.warnings);
				defaultRuntime.log(`Linked plugin path: ${shortenHomePath(resolved)}`);
				defaultRuntime.log(`Restart the gateway to load plugins.`);
				return;
			}
			const result = await installPluginFromPath({
				path: resolved,
				logger: {
					info: (msg) => defaultRuntime.log(msg),
					warn: (msg) => defaultRuntime.log(theme.warn(msg))
				}
			});
			if (!result.ok) {
				defaultRuntime.error(result.error);
				process.exit(1);
			}
			let next = {
				...cfg,
				plugins: {
					...cfg.plugins,
					entries: {
						...cfg.plugins?.entries,
						[result.pluginId]: {
							...cfg.plugins?.entries?.[result.pluginId],
							enabled: true
						}
					}
				}
			};
			const source = resolveArchiveKind(resolved) ? "archive" : "path";
			next = recordPluginInstall(next, {
				pluginId: result.pluginId,
				source,
				sourcePath: resolved,
				installPath: result.targetDir,
				version: result.version
			});
			const slotResult = applySlotSelectionForPlugin(next, result.pluginId);
			next = slotResult.config;
			await writeConfigFile(next);
			logSlotWarnings(slotResult.warnings);
			defaultRuntime.log(`Installed plugin: ${result.pluginId}`);
			defaultRuntime.log(`Restart the gateway to load plugins.`);
			return;
		}
		if (opts.link) {
			defaultRuntime.error("`--link` requires a local path.");
			process.exit(1);
		}
		if (raw.startsWith(".") || raw.startsWith("~") || path.isAbsolute(raw) || raw.endsWith(".ts") || raw.endsWith(".js") || raw.endsWith(".mjs") || raw.endsWith(".cjs") || raw.endsWith(".tgz") || raw.endsWith(".tar.gz") || raw.endsWith(".tar") || raw.endsWith(".zip")) {
			defaultRuntime.error(`Path not found: ${resolved}`);
			process.exit(1);
		}
		const result = await installPluginFromNpmSpec({
			spec: raw,
			logger: {
				info: (msg) => defaultRuntime.log(msg),
				warn: (msg) => defaultRuntime.log(theme.warn(msg))
			}
		});
		if (!result.ok) {
			defaultRuntime.error(result.error);
			process.exit(1);
		}
		let next = {
			...cfg,
			plugins: {
				...cfg.plugins,
				entries: {
					...cfg.plugins?.entries,
					[result.pluginId]: {
						...cfg.plugins?.entries?.[result.pluginId],
						enabled: true
					}
				}
			}
		};
		next = recordPluginInstall(next, {
			pluginId: result.pluginId,
			source: "npm",
			spec: raw,
			installPath: result.targetDir,
			version: result.version
		});
		const slotResult = applySlotSelectionForPlugin(next, result.pluginId);
		next = slotResult.config;
		await writeConfigFile(next);
		logSlotWarnings(slotResult.warnings);
		defaultRuntime.log(`Installed plugin: ${result.pluginId}`);
		defaultRuntime.log(`Restart the gateway to load plugins.`);
	});
	plugins.command("update").description("Update installed plugins (npm installs only)").argument("[id]", "Plugin id (omit with --all)").option("--all", "Update all tracked plugins", false).option("--dry-run", "Show what would change without writing", false).action(async (id, opts) => {
		const cfg = loadConfig();
		const installs = cfg.plugins?.installs ?? {};
		const targets = opts.all ? Object.keys(installs) : id ? [id] : [];
		if (targets.length === 0) {
			if (opts.all) {
				defaultRuntime.log("No npm-installed plugins to update.");
				return;
			}
			defaultRuntime.error("Provide a plugin id or use --all.");
			process.exit(1);
		}
		const result = await updateNpmInstalledPlugins({
			config: cfg,
			pluginIds: targets,
			dryRun: opts.dryRun,
			logger: {
				info: (msg) => defaultRuntime.log(msg),
				warn: (msg) => defaultRuntime.log(theme.warn(msg))
			}
		});
		for (const outcome of result.outcomes) {
			if (outcome.status === "error") {
				defaultRuntime.log(theme.error(outcome.message));
				continue;
			}
			if (outcome.status === "skipped") {
				defaultRuntime.log(theme.warn(outcome.message));
				continue;
			}
			defaultRuntime.log(outcome.message);
		}
		if (!opts.dryRun && result.changed) {
			await writeConfigFile(result.config);
			defaultRuntime.log("Restart the gateway to load plugins.");
		}
	});
	plugins.command("doctor").description("Report plugin load issues").action(() => {
		const report = buildPluginStatusReport();
		const errors = report.plugins.filter((p) => p.status === "error");
		const diags = report.diagnostics.filter((d) => d.level === "error");
		if (errors.length === 0 && diags.length === 0) {
			defaultRuntime.log("No plugin issues detected.");
			return;
		}
		const lines = [];
		if (errors.length > 0) {
			lines.push(theme.error("Plugin errors:"));
			for (const entry of errors) lines.push(`- ${entry.id}: ${entry.error ?? "failed to load"} (${entry.source})`);
		}
		if (diags.length > 0) {
			if (lines.length > 0) lines.push("");
			lines.push(theme.warn("Diagnostics:"));
			for (const diag of diags) {
				const target = diag.pluginId ? `${diag.pluginId}: ` : "";
				lines.push(`- ${target}${diag.message}`);
			}
		}
		const docs = formatDocsLink("/plugin", "docs.openclaw.ai/plugin");
		lines.push("");
		lines.push(`${theme.muted("Docs:")} ${docs}`);
		defaultRuntime.log(lines.join("\n"));
	});
}

//#endregion
export { registerPluginsCli };