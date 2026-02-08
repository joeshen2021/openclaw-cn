import "./paths-7Bb9F26w.js";
import { J as theme, K as init_theme, d as defaultRuntime, f as init_runtime, q as isRich } from "./subsystem-D_qnfThk.js";
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
import { g as saveExecApprovals, l as readExecApprovalsSnapshot } from "./exec-approvals-B50nUIsc.js";
import { t as renderTable } from "./table-Cl4aryUh.js";
import "./service-BjYI8jh3.js";
import "./systemd-Dzkx9x22.js";
import { n as callGatewayFromCli } from "./gateway-rpc-BSTA42_F.js";
import { t as describeUnknownError } from "./shared-37GZy_R9.js";
import { n as nodesCallOpts, r as resolveNodeId } from "./rpc-BnasUz2x.js";
import JSON5 from "json5";
import fs from "node:fs/promises";

//#region src/cli/exec-approvals-cli.ts
init_runtime();
init_theme();
function formatAge(msAgo) {
	const s = Math.max(0, Math.floor(msAgo / 1e3));
	if (s < 60) return `${s}s`;
	const m = Math.floor(s / 60);
	if (m < 60) return `${m}m`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h}h`;
	return `${Math.floor(h / 24)}d`;
}
async function readStdin() {
	const chunks = [];
	for await (const chunk of process.stdin) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
	return Buffer.concat(chunks).toString("utf8");
}
async function resolveTargetNodeId(opts) {
	if (opts.gateway) return null;
	const raw = opts.node?.trim() ?? "";
	if (!raw) return null;
	return await resolveNodeId(opts, raw);
}
async function loadSnapshot(opts, nodeId) {
	return await callGatewayFromCli(nodeId ? "exec.approvals.node.get" : "exec.approvals.get", opts, nodeId ? { nodeId } : {});
}
function loadSnapshotLocal() {
	const snapshot = readExecApprovalsSnapshot();
	return {
		path: snapshot.path,
		exists: snapshot.exists,
		hash: snapshot.hash,
		file: snapshot.file
	};
}
function saveSnapshotLocal(file) {
	saveExecApprovals(file);
	return loadSnapshotLocal();
}
async function loadSnapshotTarget(opts) {
	if (!opts.gateway && !opts.node) return {
		snapshot: loadSnapshotLocal(),
		nodeId: null,
		source: "local"
	};
	const nodeId = await resolveTargetNodeId(opts);
	return {
		snapshot: await loadSnapshot(opts, nodeId),
		nodeId,
		source: nodeId ? "node" : "gateway"
	};
}
function formatCliError(err) {
	const msg = describeUnknownError(err);
	return msg.includes("\n") ? msg.split("\n")[0] : msg;
}
function renderApprovalsSnapshot(snapshot, targetLabel) {
	const rich = isRich();
	const heading = (text) => rich ? theme.heading(text) : text;
	const muted = (text) => rich ? theme.muted(text) : text;
	const tableWidth = Math.max(60, (process.stdout.columns ?? 120) - 1);
	const file = snapshot.file ?? { version: 1 };
	const defaults = file.defaults ?? {};
	const defaultsParts = [
		defaults.security ? `security=${defaults.security}` : null,
		defaults.ask ? `ask=${defaults.ask}` : null,
		defaults.askFallback ? `askFallback=${defaults.askFallback}` : null,
		typeof defaults.autoAllowSkills === "boolean" ? `autoAllowSkills=${defaults.autoAllowSkills ? "on" : "off"}` : null
	].filter(Boolean);
	const agents = file.agents ?? {};
	const allowlistRows = [];
	const now = Date.now();
	for (const [agentId, agent] of Object.entries(agents)) {
		const allowlist = Array.isArray(agent.allowlist) ? agent.allowlist : [];
		for (const entry of allowlist) {
			const pattern = entry?.pattern?.trim() ?? "";
			if (!pattern) continue;
			const lastUsedAt = typeof entry.lastUsedAt === "number" ? entry.lastUsedAt : null;
			allowlistRows.push({
				Target: targetLabel,
				Agent: agentId,
				Pattern: pattern,
				LastUsed: lastUsedAt ? `${formatAge(Math.max(0, now - lastUsedAt))} ago` : muted("unknown")
			});
		}
	}
	const summaryRows = [
		{
			Field: "Target",
			Value: targetLabel
		},
		{
			Field: "Path",
			Value: snapshot.path
		},
		{
			Field: "Exists",
			Value: snapshot.exists ? "yes" : "no"
		},
		{
			Field: "Hash",
			Value: snapshot.hash
		},
		{
			Field: "Version",
			Value: String(file.version ?? 1)
		},
		{
			Field: "Socket",
			Value: file.socket?.path ?? "default"
		},
		{
			Field: "Defaults",
			Value: defaultsParts.length > 0 ? defaultsParts.join(", ") : "none"
		},
		{
			Field: "Agents",
			Value: String(Object.keys(agents).length)
		},
		{
			Field: "Allowlist",
			Value: String(allowlistRows.length)
		}
	];
	defaultRuntime.log(heading("Approvals"));
	defaultRuntime.log(renderTable({
		width: tableWidth,
		columns: [{
			key: "Field",
			header: "Field",
			minWidth: 8
		}, {
			key: "Value",
			header: "Value",
			minWidth: 24,
			flex: true
		}],
		rows: summaryRows
	}).trimEnd());
	if (allowlistRows.length === 0) {
		defaultRuntime.log("");
		defaultRuntime.log(muted("No allowlist entries."));
		return;
	}
	defaultRuntime.log("");
	defaultRuntime.log(heading("Allowlist"));
	defaultRuntime.log(renderTable({
		width: tableWidth,
		columns: [
			{
				key: "Target",
				header: "Target",
				minWidth: 10
			},
			{
				key: "Agent",
				header: "Agent",
				minWidth: 8
			},
			{
				key: "Pattern",
				header: "Pattern",
				minWidth: 20,
				flex: true
			},
			{
				key: "LastUsed",
				header: "Last Used",
				minWidth: 10
			}
		],
		rows: allowlistRows
	}).trimEnd());
}
async function saveSnapshot(opts, nodeId, file, baseHash) {
	return await callGatewayFromCli(nodeId ? "exec.approvals.node.set" : "exec.approvals.set", opts, nodeId ? {
		nodeId,
		file,
		baseHash
	} : {
		file,
		baseHash
	});
}
function resolveAgentKey(value) {
	const trimmed = value?.trim() ?? "";
	return trimmed ? trimmed : "*";
}
function normalizeAllowlistEntry(entry) {
	const pattern = entry?.pattern?.trim() ?? "";
	return pattern ? pattern : null;
}
function ensureAgent(file, agentKey) {
	const agents = file.agents ?? {};
	const entry = agents[agentKey] ?? {};
	file.agents = agents;
	return entry;
}
function isEmptyAgent(agent) {
	const allowlist = Array.isArray(agent.allowlist) ? agent.allowlist : [];
	return !agent.security && !agent.ask && !agent.askFallback && agent.autoAllowSkills === void 0 && allowlist.length === 0;
}
function registerExecApprovalsCli(program) {
	const formatExample = (cmd, desc) => `  ${theme.command(cmd)}\n    ${theme.muted(desc)}`;
	const approvals = program.command("approvals").alias("exec-approvals").description("Manage exec approvals (gateway or node host)").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/approvals", "docs.openclaw.ai/cli/approvals")}\n`);
	nodesCallOpts(approvals.command("get").description("Fetch exec approvals snapshot").option("--node <node>", "Target node id/name/IP").option("--gateway", "Force gateway approvals", false).action(async (opts) => {
		try {
			const { snapshot, nodeId, source } = await loadSnapshotTarget(opts);
			if (opts.json) {
				defaultRuntime.log(JSON.stringify(snapshot));
				return;
			}
			const muted = (text) => isRich() ? theme.muted(text) : text;
			if (source === "local") {
				defaultRuntime.log(muted("Showing local approvals."));
				defaultRuntime.log("");
			}
			renderApprovalsSnapshot(snapshot, source === "local" ? "local" : nodeId ? `node:${nodeId}` : "gateway");
		} catch (err) {
			defaultRuntime.error(formatCliError(err));
			defaultRuntime.exit(1);
		}
	}));
	nodesCallOpts(approvals.command("set").description("Replace exec approvals with a JSON file").option("--node <node>", "Target node id/name/IP").option("--gateway", "Force gateway approvals", false).option("--file <path>", "Path to JSON file to upload").option("--stdin", "Read JSON from stdin", false).action(async (opts) => {
		try {
			if (!opts.file && !opts.stdin) {
				defaultRuntime.error("Provide --file or --stdin.");
				defaultRuntime.exit(1);
				return;
			}
			if (opts.file && opts.stdin) {
				defaultRuntime.error("Use either --file or --stdin (not both).");
				defaultRuntime.exit(1);
				return;
			}
			const { snapshot, nodeId, source } = await loadSnapshotTarget(opts);
			if (source === "local") defaultRuntime.log(theme.muted("Writing local approvals."));
			const targetLabel = source === "local" ? "local" : nodeId ? `node:${nodeId}` : "gateway";
			if (!snapshot.hash) {
				defaultRuntime.error("Exec approvals hash missing; reload and retry.");
				defaultRuntime.exit(1);
				return;
			}
			const raw = opts.stdin ? await readStdin() : await fs.readFile(String(opts.file), "utf8");
			let file;
			try {
				file = JSON5.parse(raw);
			} catch (err) {
				defaultRuntime.error(`Failed to parse approvals JSON: ${String(err)}`);
				defaultRuntime.exit(1);
				return;
			}
			file.version = 1;
			const next = source === "local" ? saveSnapshotLocal(file) : await saveSnapshot(opts, nodeId, file, snapshot.hash);
			if (opts.json) {
				defaultRuntime.log(JSON.stringify(next));
				return;
			}
			defaultRuntime.log(theme.muted(`Target: ${targetLabel}`));
			renderApprovalsSnapshot(next, targetLabel);
		} catch (err) {
			defaultRuntime.error(formatCliError(err));
			defaultRuntime.exit(1);
		}
	}));
	const allowlist = approvals.command("allowlist").description("Edit the per-agent allowlist").addHelpText("after", () => `\n${theme.heading("Examples:")}\n${formatExample("openclaw approvals allowlist add \"~/Projects/**/bin/rg\"", "Allowlist a local binary pattern for the main agent.")}\n${formatExample("openclaw approvals allowlist add --agent main --node <id|name|ip> \"/usr/bin/uptime\"", "Allowlist on a specific node/agent.")}\n${formatExample("openclaw approvals allowlist add --agent \"*\" \"/usr/bin/uname\"", "Allowlist for all agents (wildcard).")}\n${formatExample("openclaw approvals allowlist remove \"~/Projects/**/bin/rg\"", "Remove an allowlist pattern.")}\n\n${theme.muted("Docs:")} ${formatDocsLink("/cli/approvals", "docs.openclaw.ai/cli/approvals")}\n`);
	nodesCallOpts(allowlist.command("add <pattern>").description("Add a glob pattern to an allowlist").option("--node <node>", "Target node id/name/IP").option("--gateway", "Force gateway approvals", false).option("--agent <id>", "Agent id (defaults to \"*\")").action(async (pattern, opts) => {
		try {
			const trimmed = pattern.trim();
			if (!trimmed) {
				defaultRuntime.error("Pattern required.");
				defaultRuntime.exit(1);
				return;
			}
			const { snapshot, nodeId, source } = await loadSnapshotTarget(opts);
			if (source === "local") defaultRuntime.log(theme.muted("Writing local approvals."));
			const targetLabel = source === "local" ? "local" : nodeId ? `node:${nodeId}` : "gateway";
			if (!snapshot.hash) {
				defaultRuntime.error("Exec approvals hash missing; reload and retry.");
				defaultRuntime.exit(1);
				return;
			}
			const file = snapshot.file ?? { version: 1 };
			file.version = 1;
			const agentKey = resolveAgentKey(opts.agent);
			const agent = ensureAgent(file, agentKey);
			const allowlistEntries = Array.isArray(agent.allowlist) ? agent.allowlist : [];
			if (allowlistEntries.some((entry) => normalizeAllowlistEntry(entry) === trimmed)) {
				defaultRuntime.log("Already allowlisted.");
				return;
			}
			allowlistEntries.push({
				pattern: trimmed,
				lastUsedAt: Date.now()
			});
			agent.allowlist = allowlistEntries;
			file.agents = {
				...file.agents,
				[agentKey]: agent
			};
			const next = source === "local" ? saveSnapshotLocal(file) : await saveSnapshot(opts, nodeId, file, snapshot.hash);
			if (opts.json) {
				defaultRuntime.log(JSON.stringify(next));
				return;
			}
			defaultRuntime.log(theme.muted(`Target: ${targetLabel}`));
			renderApprovalsSnapshot(next, targetLabel);
		} catch (err) {
			defaultRuntime.error(formatCliError(err));
			defaultRuntime.exit(1);
		}
	}));
	nodesCallOpts(allowlist.command("remove <pattern>").description("Remove a glob pattern from an allowlist").option("--node <node>", "Target node id/name/IP").option("--gateway", "Force gateway approvals", false).option("--agent <id>", "Agent id (defaults to \"*\")").action(async (pattern, opts) => {
		try {
			const trimmed = pattern.trim();
			if (!trimmed) {
				defaultRuntime.error("Pattern required.");
				defaultRuntime.exit(1);
				return;
			}
			const { snapshot, nodeId, source } = await loadSnapshotTarget(opts);
			if (source === "local") defaultRuntime.log(theme.muted("Writing local approvals."));
			const targetLabel = source === "local" ? "local" : nodeId ? `node:${nodeId}` : "gateway";
			if (!snapshot.hash) {
				defaultRuntime.error("Exec approvals hash missing; reload and retry.");
				defaultRuntime.exit(1);
				return;
			}
			const file = snapshot.file ?? { version: 1 };
			file.version = 1;
			const agentKey = resolveAgentKey(opts.agent);
			const agent = ensureAgent(file, agentKey);
			const allowlistEntries = Array.isArray(agent.allowlist) ? agent.allowlist : [];
			const nextEntries = allowlistEntries.filter((entry) => normalizeAllowlistEntry(entry) !== trimmed);
			if (nextEntries.length === allowlistEntries.length) {
				defaultRuntime.log("Pattern not found.");
				return;
			}
			if (nextEntries.length === 0) delete agent.allowlist;
			else agent.allowlist = nextEntries;
			if (isEmptyAgent(agent)) {
				const agents = { ...file.agents };
				delete agents[agentKey];
				file.agents = Object.keys(agents).length > 0 ? agents : void 0;
			} else file.agents = {
				...file.agents,
				[agentKey]: agent
			};
			const next = source === "local" ? saveSnapshotLocal(file) : await saveSnapshot(opts, nodeId, file, snapshot.hash);
			if (opts.json) {
				defaultRuntime.log(JSON.stringify(next));
				return;
			}
			defaultRuntime.log(theme.muted(`Target: ${targetLabel}`));
			renderApprovalsSnapshot(next, targetLabel);
		} catch (err) {
			defaultRuntime.error(formatCliError(err));
			defaultRuntime.exit(1);
		}
	}));
}

//#endregion
export { registerExecApprovalsCli };