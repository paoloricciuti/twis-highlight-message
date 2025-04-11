<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<main>
	{#if data.user}
		<form use:enhance action="?/highlight" method="POST">
			<fieldset>
				<legend>Highlight</legend>
				<textarea name="message"></textarea>
				<input name="user" />
				<button>Highlight</button>
			</fieldset>
		</form>
		<form use:enhance action="?/font_size" method="POST">
			<fieldset>
				<legend>Font size</legend>
				<input value="3.5" name="font" step=".1" type="number" />
				<button>change font</button>
			</fieldset>
		</form>
	{:else}
		<form use:enhance action="?/login" method="POST">
			<label>User: <input name="user" /></label>
			<label>Password: <input name="pwd" /></label>
			<button>Login</button>
		</form>
	{/if}
</main>

<style>
	main {
		display: grid;
		place-items: center;
		height: 100vh;
		overflow: auto;
		background-color: var(--color-black);
		color: var(--color-white);
	}
	form {
		width: 100%;
		label {
			display: grid;
			gap: 1rem;
			grid-template-columns: 1fr 2fr;
		}
	}
	fieldset {
		padding: 1rem;
		margin: 0;
		width: 100%;
		display: grid;
		gap: 1rem;
		border: 1px solid var(--color-white);
		border-radius: 0.5rem;
	}
</style>
