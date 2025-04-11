import { controllers } from '$lib';

export function GET() {
	let controller: ReadableStreamDefaultController<unknown>;
	return new Response(
		new ReadableStream({
			start(_controller) {
				controller = _controller;
				controllers.add(controller);
			},
			cancel() {
				controllers.delete(controller);
			}
		}),
		{
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		}
	);
}
