<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<head>
    <title>Ivan Matiash</title>
</head>
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
