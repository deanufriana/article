<script>
  import { beer, home, signOut, signIn } from "svelte-awesome/icons";
  import Icon from "svelte-awesome/components/Icon.svelte";

  import {
    faAddressCard,
    faFile,
    faUser,
  } from "@fortawesome/free-regular-svg-icons";
  export let user;
  export let segment;
</script>

<nav class="navbar-self">
  <ul>
    <li>
      <a aria-current={segment === undefined ? "page" : undefined} href=".">
        <Icon data={home} />
        <span class="text-icon">Home</span>
      </a>
    </li>
    <li>
      <a aria-current={segment === "about" ? "page" : undefined} href="/about">
        <Icon data={faAddressCard} />
        <span class="text-icon">About</span>
      </a>
    </li>

    <li
      style="float: right; align-self:center; display:block"
      class="text-center"
    >
      {#if user}
        <a
          aria-current={segment === "user" ? "page" : undefined}
          href="profile/{user.username}"
        >
          <Icon data={faUser} />
          <span class="text-icon">{user.name}</span>
        </a>
      {:else}
        <a
          aria-current={segment === "login" ? "page" : undefined}
          href="/login"
        >
          <Icon data={signIn} />
          <span class="text-icon">Login</span>
        </a>
      {/if}
    </li>
  </ul>
</nav>

<style>
  .text-icon {
    margin-left: 10px;
    color: #132743;
  }

  @media (max-width: 1000px) {
    li {
      display: none;
    }
  }
</style>
