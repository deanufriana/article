<script context="module">
  export async function preload(page, { user }) {
    return { user };
  }
</script>

<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import moment from "moment";
  import MultiSelect from "../components/MultiSelect.svelte";
  export let user;

  let title;
  let tags;
  // let content;
  let isLoading = false;
  let isForm = false;
  let article = [];
  let editor;
  let recommended;
  let page = 1;
  let countArticle;
  let search;
  let articleFilterBy;
  let timer;

  async function addArticle() {
    isLoading = true;
    const {
      data: { message, resdata, success },
    } = await axios.post("/addArticle", {
      title,
      content: editor.root.innerHTML,
      tags,
    });
    if (success) {
      article[article.length] = resdata;
    } else {
      alert(message);
    }
    isLoading = false;
  }

  async function fetchArticle(page = 1) {
    const {
      data: { resdata },
    } = await axios.post("/fetchArticle", { page });
    article = resdata.data.rows;
    countArticle = resdata.data.count;
    recommended = resdata.recommended;
  }

  let content = { html: "", text: "" };
  onMount(async () => {
    await fetchArticle(page);
    await fetchQuill();
  });

  async function fetchQuill() {
    if (user) {
      import("quill/dist/quill.snow.css");
      const quillModule = await import("quill/dist/quill");
      const Quill = quillModule.default;
      const container = document.getElementById("editor-container");

      editor = new Quill(container, {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            ["link", "image", "formula"],
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],

            [{ size: ["small", false, "large", "huge"] }],

            [{ color: [] }, { background: [] }],

            ["clean"],
          ],
        },
        placeholder: "Type something...",
        theme: "snow", // or 'bubble'
      });
      debugger;
    }
  }

  async function searchArticle() {
    const {
      data: { resdata },
    } = await axios.post("/searchArticle", { search });
    articleFilterBy = resdata;
  }

  async function inputSearch() {
    clearTimeout(timer);
    timer = setTimeout(searchArticle, 1000);
  }

  async function clickForm() {
    isForm = !isForm;
  }
</script>

<style>
  #suggest_container {
    position: relative;
    overflow: visible;
  }

  #autosuggest {
    position: absolute;
    top: 50px;
    background-color: rgb(255, 255, 255);
    width: 100%;
    left: 0px;
    border-radius: 3px;
    border: 1px solid black;
  }

  #editor-container {
    height: 350px;
  }

  .subsuggest:hover {
    background-color: #132743;
    color: white;
    cursor: pointer;
  }
</style>

<svelte:head>
  <title>deanblogs</title>
</svelte:head>

<body>
  <div class="container">
    <div class="row" style="margin:10px">
      <div class="col-md-9">
        <button
          on:click={clickForm}
          hidden={!user}
          class="btn bg-primary"
          style="width: 100%; text-align: left; margin-bottom:10px">
          Form Article
        </button>
        {#if user}
          <form
            enctype="multipart/form-data"
            class="form-content"
            hidden={!isForm}
            style="margin-bottom:10px"
            transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
            on:submit|preventDefault={addArticle}>
            <input
              type="text"
              name="title"
              class="form-control"
              bind:value={title}
              placeholder="title ..."
              style="margin-bottom: 10px"
              required />

            <div id="editor-container" height={'200px'} />

            <MultiSelect id="tags" bind:value={tags} placeholder="tags">
              <option value="Code">Code</option>
              <option value="Belajar">Belajar</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Javascript">Javascript</option>
            </MultiSelect>
            <button
              type="submit"
              class="btn bg-primary"
              disabled={isLoading}
              style="margin-top:10px"
              class:btn-grey={!isLoading}>
              {isLoading ? 'Loading ...' : 'Send'}
            </button>
          </form>
        {/if}
        <article>
          {#each article as item}
            <div class="card">
              <h4 class="card-header" style="color:#132743; font-size:21px">
                {item.title}
              </h4>
              <div class="row" style="margin-left:10px">
                <div class="col-md-auto">
                  <img
                    src="avatars/{item.user.avatar}"
                    alt="avatar"
                    width="43px" />
                </div>
                <div class="col-md">
                  <h5 style="font-size: 12px">{item.user.name}</h5>
                  <h6 style="font-size: 12px">
                    {moment(item.createdAt).fromNow()}
                  </h6>
                </div>
              </div>
              <div class="card-content" style="font-size: larger">
                {@html item.content.substring(0, 300)}
                <a style="color:blue" href="/readmore/{item.slug}">
                  read more ...</a>
              </div>
              <div class="card-footer">
                <div class="container row">
                  {#each item.tags.split(',') as tag}
                    <div class="tags bg-primary col-auto">{tag}</div>
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </article>
        {#if article.length > 0}
          <div style="margin-top:10px;margin-bottom:20px">
            <button class="btn">Previous</button>
            <button class="btn">Next</button>
          </div>
        {/if}
      </div>
      {#if recommended}
        <div class="col-md-3">
          <div id="suggest_container">
            <input
              type="text"
              id="search-form"
              on:change={inputSearch}
              bind:value={search}
              placeholder="search ..."
              style="margin-bottom:10px" />
            {#if articleFilterBy}
              <div id="autosuggest">
                {#each articleFilterBy as searchA}
                  <div
                    class="subsuggest"
                    onclick="window.location.href = '/readmore/{searchA.slug}'">
                    <h4
                      style="padding:5px 10px; font-size:16px; font-weight: 900">
                      {searchA.title}
                    </h4>
                    <h6 style="font-size: 12px; padding:5px 10px">
                      {moment(searchA.createdAt).fromNow()}
                    </h6>
                  </div>
                {/each}
              </div>
            {/if}
          </div>

          <div class="card">
            <h5 class="card-header bg-primary">Recomendasi Bacaan ...</h5>
            <div style="margin:10px">
              <h4>{recommended.title}</h4>
              <h6 style="font-size: 12px">
                {moment(recommended.createdAt).fromNow()}
              </h6>
              {@html recommended.content.substring(0, 200)}
              <a style="color:blue" href="/readmore/{recommended.slug}">
                read more ...</a>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</body>
