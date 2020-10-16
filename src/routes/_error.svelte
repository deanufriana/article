<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<body>
  <div class="container">
    <div class="row" style="padding:20px; text-align:left">
      <div class="col-md-8">
        <h1 style="font-size: 48px">{status}</h1>
        <p style="font-size: 21px">
          {error.message}
          <br />
          {#if dev && error.stack}
            <pre>{error.stack}</pre>
          {/if}
        </p>
      </div>
    </div>
  </div>
</body>
