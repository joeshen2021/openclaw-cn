import { v as __esmMin } from "./paths-7Bb9F26w.js";

//#region src/utils/boolean.ts
function parseBooleanValue(value, options = {}) {
	if (typeof value === "boolean") return value;
	if (typeof value !== "string") return;
	const normalized = value.trim().toLowerCase();
	if (!normalized) return;
	const truthy = options.truthy ?? DEFAULT_TRUTHY;
	const falsy = options.falsy ?? DEFAULT_FALSY;
	const truthySet = truthy === DEFAULT_TRUTHY ? DEFAULT_TRUTHY_SET : new Set(truthy);
	const falsySet = falsy === DEFAULT_FALSY ? DEFAULT_FALSY_SET : new Set(falsy);
	if (truthySet.has(normalized)) return true;
	if (falsySet.has(normalized)) return false;
}
var DEFAULT_TRUTHY, DEFAULT_FALSY, DEFAULT_TRUTHY_SET, DEFAULT_FALSY_SET;
var init_boolean = __esmMin((() => {
	DEFAULT_TRUTHY = [
		"true",
		"1",
		"yes",
		"on"
	];
	DEFAULT_FALSY = [
		"false",
		"0",
		"no",
		"off"
	];
	DEFAULT_TRUTHY_SET = new Set(DEFAULT_TRUTHY);
	DEFAULT_FALSY_SET = new Set(DEFAULT_FALSY);
}));

//#endregion
export { parseBooleanValue as n, init_boolean as t };