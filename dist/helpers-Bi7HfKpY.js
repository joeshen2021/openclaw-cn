import { c as init_session_key, t as DEFAULT_ACCOUNT_ID } from "./session-key-9TMHrLw0.js";

//#region src/channels/plugins/helpers.ts
init_session_key();
function resolveChannelDefaultAccountId(params) {
	const accountIds = params.accountIds ?? params.plugin.config.listAccountIds(params.cfg);
	return params.plugin.config.defaultAccountId?.(params.cfg) ?? accountIds[0] ?? DEFAULT_ACCOUNT_ID;
}

//#endregion
export { resolveChannelDefaultAccountId as t };