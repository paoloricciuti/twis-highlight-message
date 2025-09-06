import { controllers, valid } from '$lib';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const user_cookie = request.headers.get('Authorization')?.replace('Bearer ', '');
	if (!user_cookie || user_cookie !== valid) {
		console.log({ user_cookie, valid });
		return json({ message: 'Unauthorized' }, { status: 401 });
	}
	const form_data = await request.json();
	const message = form_data.message;
	const user = form_data.user;
	if (!message || !user) {
		return json({ message: 'Bad Request' }, { status: 400 });
	}
	for (const controller of controllers) {
		controller.enqueue(`data: ${JSON.stringify({ message, user })}\n\n`);
	}
	return new Response(null, { status: 204 });
}
