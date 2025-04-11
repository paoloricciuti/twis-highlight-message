<script lang="ts">
	import { fly } from 'svelte/transition';
	let highlighted_message = $state('');
	let user = $state('');
	let font_size = $state(3.5);
	$effect(() => {
		const abort_controller = new AbortController();
		const event_source = new EventSource('/message');
		event_source.addEventListener(
			'message',
			({ data }) => {
				const { user: user_sent, message } = JSON.parse(data);
				highlighted_message = message;
				user = user_sent;
			},
			{
				signal: abort_controller.signal
			}
		);
		event_source.addEventListener(
			'size',
			({ data: size }) => {
				console.log('size', size);
				font_size = +size;
			},
			{
				signal: abort_controller.signal
			}
		);

		return () => {
			abort_controller.abort();
		};
	});
</script>

{#if highlighted_message}
	{#key highlighted_message}
		<div
			style:--size={font_size}
			in:fly|global={{
				x: '-100%',
				duration: 500,
				delay: 500
			}}
			out:fly|global={{
				x: '-100%',
				duration: 500
			}}
		>
			{highlighted_message}
			<small>{user}</small>
		</div>
	{/key}
{/if}

<style>
	div {
		--border: 1rem;
		--extra-length: 7rem;
		color: var(--color-white);
		position: fixed;
		bottom: 3rem;
		font-size: calc(var(--size) * 1rem);
		min-width: 50%;
		max-width: calc(90% - var(--extra-length));
		padding: 1rem 10rem 1rem 1rem;
	}
	div::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% + var(--extra-length));
		height: 100%;
		background-color: var(--color-svelte);
		z-index: -1;
		clip-path: polygon(0 0, 0 100%, calc(100% - var(--extra-length)) 100%, 100% 0);
	}

	div::after {
		content: '';
		position: absolute;
		top: calc(var(--border) * -1);
		left: 0;
		width: calc(100% + var(--extra-length) + var(--border) * 2);
		height: calc(100% + var(--border) * 2);
		background-color: var(--color-white);
		z-index: -2;
		clip-path: polygon(0 0, 0 100%, calc(100% - var(--extra-length) - var(--border)) 100%, 100% 0);
	}

	small {
		display: block;
		font-size: 2.5rem;
		font-style: italic;
	}
</style>
