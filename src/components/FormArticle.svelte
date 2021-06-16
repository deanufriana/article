<script context="module">
  export async function preload(page, { user }) {
    return { user };
  }
</script>

<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";
  import MultiSelect from "../components/MultiSelect.svelte";
  export let user;

  let content = { html: "", text: "" };
  let title;
  let tags;
  let isLoading = false;
  let isForm = false;
  let article = [];
  let editor;

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

  async function clickForm() {
    isForm = !isForm;
  }

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
        theme: "snow",
      });
    }
  }

  onMount(async () => {
    await fetchQuill();
  });
</script>

<button
  on:click={clickForm}
  hidden={!user}
  class="btn bg-primary"
  style="width: 100%; text-align: left; margin-bottom:10px"
>
  Form Article
</button>
{#if user}
  <form
    enctype="multipart/form-data"
    class="form-content"
    hidden={!isForm}
    style="margin-bottom:10px"
    transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
    on:submit|preventDefault={addArticle}
  >
    <input
      type="text"
      name="title"
      class="form-control"
      bind:value={title}
      placeholder="title ..."
      style="margin-bottom: 10px"
      required
    />

    <div id="editor-container" height={"200px"} />

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
      class:btn-grey={!isLoading}
    >
      {isLoading ? "Loading ..." : "Send"}
    </button>
  </form>
{/if}
