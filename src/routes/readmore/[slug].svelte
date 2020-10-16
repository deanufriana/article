<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`readmorejson/${params.slug}`);
    const { success, resdata } = await res.json();

    if (success) {
      return { post: resdata };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import moment from "moment";
  export let post;
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
  <title>{post.title}</title>
</svelte:head>

<body>
  <div class="container">
    <div class="row" style="padding:20px; text-align:left">
      <div class="col-md-8">
        <h1 style="font-size: 48px">{post.title}</h1>
        <div class="row">
          <div class="col-md-auto">
            <img src="avatars/{post.user.avatar}" alt="avatar" class="avatar" />
          </div>
          <div class="col-md">
            <h5 style="font-size: 16px">{post.user.name}</h5>
            <h6 style="font-size: 16px">
              {moment(post.createdAt).format('DD MMMM YYYY HH:mm:ss')}
              |
              {moment(post.createdAt).fromNow()}
            </h6>
          </div>
        </div>
        <p style="font-size: 21px">
          {@html post.content}
        </p>
        <div class="container row" style="margin-top: 30px">
          {#each post.tags.split(',') as tag}
            <div class="tags bg-primary col-auto">{tag}</div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</body>
