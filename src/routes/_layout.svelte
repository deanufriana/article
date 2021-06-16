<script context="module">
  export async function preload(page, { user }) {
    return { user };
  }
</script>

<script>
  import Nav from "../components/Nav.svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();
  export let user;
  export let segment;
</script>

<Nav {segment} {user} />

<main>
  <slot />
</main>

<style>
  /* main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	} */
</style>
