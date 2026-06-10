<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<head>
    <title>Ivan Matiash</title>
</head>
<svelte:head><link rel="icon" type="image/jpeg" href="/spiral.jpeg" /></svelte:head>
{@render children()}
