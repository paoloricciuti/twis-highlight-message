import { PASSWORD, USERNAME as USER } from '$env/static/private';
import { controllers, valid } from '$lib';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
	let user = cookies.get('user');
	if (user && user !== valid) {
		user = undefined;
	}
	return {
		user
	};
}

export const actions = {
	async login({ request, cookies }) {
		const form_data = await request.formData();
		const user = form_data.get('user');
		const pwd = form_data.get('pwd');
		if (user === USER && pwd === PASSWORD) {
			cookies.set('user', valid, { path: '/', maxAge: 60 * 60 * 24 * 365 });
			return {
				success: true
			};
		}
		return fail(401, { message: 'Unauthorized' });
	},
	async highlight({ request, cookies }) {
		const user_cookie = cookies.get('user');
		if (!user_cookie || user_cookie !== valid) {
			return fail(401, { message: 'Unauthorized' });
		}
		const form_data = await request.formData();
		const message = form_data.get('message');
		const user = form_data.get('user');
		for (const controller of controllers) {
			controller.enqueue(`data: ${JSON.stringify({ message, user })}\n\n`);
		}
	},
	async font_size({ request, cookies }) {
		const user_cookie = cookies.get('user');
		if (!user_cookie || user_cookie !== valid) {
			return fail(401, { message: 'Unauthorized' });
		}
		const form_data = await request.formData();
		const font = form_data.get('font');
		for (const controller of controllers) {
			controller.enqueue(`event: size\ndata: ${font}\n\n`);
		}
	}
};
