import { J as theme, K as init_theme, q as isRich } from "./subsystem-D_qnfThk.js";

//#region src/terminal/prompt-style.ts
init_theme();
const stylePromptMessage = (message) => isRich() ? theme.accent(message) : message;
const stylePromptTitle = (title) => title && isRich() ? theme.heading(title) : title;
const stylePromptHint = (hint) => hint && isRich() ? theme.muted(hint) : hint;

//#endregion
export { stylePromptMessage as n, stylePromptTitle as r, stylePromptHint as t };