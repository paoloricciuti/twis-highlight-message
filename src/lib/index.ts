import { PASSWORD, USER } from '$env/static/private';

export const controllers = new Set<ReadableStreamDefaultController<unknown>>();

export const valid = await sha256(USER + PASSWORD);

async function sha256(str: string) {
	const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
	let hexString = '';
	const view = new Uint8Array(hash);
	for (let i = 0; i < view.length; i++) {
		hexString += ('0' + view[i].toString(16)).slice(-2);
	}
	return hexString;
}
