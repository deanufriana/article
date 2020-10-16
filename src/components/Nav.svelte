<script>
  import { beer, home, signOut } from "svelte-awesome/icons";
  import Icon from "svelte-awesome/components/Icon.svelte";

  import {
    faAddressCard,
    faFile,
    faUser,
  } from "@fortawesome/free-regular-svg-icons";
  export let user;
  export let segment;
</script>

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

<nav class="navbar-self">
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        <!-- <Icon data={home} /> -->
        <span class="text-icon">Deanufriana</span>
      </a>
    </li>
    <!-- <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        <Icon data={faAddressCard} />
        <span class="text-icon">About</span>
      </a>
    </li> -->

    <li
      style="float: right; align-self:center; display:block"
      class="text-center">
      {#if user}
        <a
          aria-current={segment === 'user' ? 'page' : undefined}
          href="profile/{user.username}">
          <Icon data={faUser} />
          <span class="text-icon">{user.name}</span>
        </a>
      {/if}
    </li>
  </ul>
</nav>
