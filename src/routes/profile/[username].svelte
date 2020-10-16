<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`profilejson/${params.username}`);
    const { success, resdata } = await res.json();

    if (success) {
      return { profile: resdata };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import axios from "axios";
  import moment from "moment";
  export let profile;
  const { session } = stores();

  async function logout() {
    const {
      data: { success },
    } = await axios.post("/logout");

    if (success) {
      session.set(false);
      window.location.href = "/";
    }
  }
</script>

<style>
  p {
    margin-top: 10px;
  }

  p:first-letter {
    float: left;
    font-size: 50px;
    line-height: 1;
    font-weight: bold;
    margin-right: 9px;
    text-align: justify;
    text-transform: uppercase;
  }
</style>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<body>
  <div class="container">
    <div
      class="row card-content center-xs"
      style="margin:20px; text-align: left">
      <div class="col-md-auto">
        <img src="avatars/{profile.avatar}" alt="avatar" width="300" />
      </div>
      <div class="col-md-7">
        <h1 class="title-content">{profile.name}</h1>
        <h4>Join At {moment(profile.createdAt).format('DD MMMM YYYY')}</h4>
        <p class="detail-content">
          Hello, let me introduce myself, my name is Devi Adi Nufriana, you can
          call me devi, i like programming, anime and music. i make this blog to
          share a little thing which i know about anything, especially related
          about my hobby. i try to help other people with what i can do for you.
          i hope what i write in this blogs can help many people.
        </p>
        <button class="btn bg-primary" on:click={logout}>Logout</button>
      </div>
    </div>
  </div>
</body>
