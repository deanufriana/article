<script>
  import Axios from "axios";
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  let isLogin = true;
  let registerData = {};
  let loginData = {};
  let isLoadingRegistered = false;
  let isLoadingLogin = false;

  async function setChange() {
    isLogin = !isLogin;
  }

  async function inputFile(input) {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      const image = document.getElementById("preview-image");
      reader.onload = function (e) {
        image.setAttribute("src", e.target.result);
      };
      registerData.avatar = input.target.files[0];
      reader.readAsDataURL(input.target.files[0]);
    }
  }

  async function register() {
    const formdata = new FormData();
    isLoadingRegistered = true;
    Object.entries(registerData).map((item) => {
      formdata.append([item[0]], item[1]);
    });

    const {
      data: { message, success },
    } = await Axios.post("/register", formdata);
    isLoadingRegistered = false;
    if (success) {
      isLogin = true;
    }
    alert(message);
  }

  async function login() {
    isLoadingLogin = true;
    const {
      data: { success, message, resdata },
    } = await Axios.post("/login", loginData);
    isLoadingLogin = false;
    alert(message);
    if (success) {
      session.set({ user: resdata });
      window.location.href = "/";
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>
<body>
  <div class="container">
    {#if isLogin}
      <div style="height: 70%; margin-top:15vh" class="row">
        <div
          class="card"
          style="margin: 0 auto; border-radius: 5px; background:rgba(255, 255,
          255, 0.8)">
          <form
            method="POST"
            class="card-content"
            on:submit|preventDefault={login}
            id="login">
            <div class="form-group">
              <label for="nopeg">Email</label>
              <input
                type="text"
                autocomplete="on"
                name="username"
                id="username"
                bind:value={loginData.username}
                required />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input
                autocomplete="password"
                name="password"
                bind:value={loginData.password}
                id="Password"
                type="password"
                required />
            </div>
            <div class="form-group">
              <button class="btn bg-primary fullwidth" type="submit">
                <i class="fas fa-sign-in-alt" />
                {isLoadingLogin ? 'Loading ...' : 'Login'}
              </button>
            </div>
            <div class="card-footer">
              <label for="daftar">Belum punya akun ? Daftar</label>
              <button
                on:click={() => setChange()}
                class="btn bg-success fullwidth"
                type="button">
                <i class="fas fa-sign-in-alt" />
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    {:else}
      <div
        class="card"
        id="home"
        style="margin: 0 auto; border-radius: 5px; background:rgba(255, 255,
        255, 0.8)">
        <div class="card-header bg-primary text-white">Register</div>
        <form
          method="POST"
          on:submit|preventDefault={register}
          class="card-content row"
          id="register">
          <div class="col-md col-12 col-sm-12">
            <div class="form-group">
              <label for="name">Nama</label>
              <input
                type="text"
                class="form-control"
                autocomplete="on"
                name="name"
                bind:value={registerData.name}
                id="name"
                required />
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                class="form-control"
                autocomplete="on"
                name="username"
                bind:value={registerData.username}
                id="username"
                required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                autocomplete="on"
                name="password"
                bind:value={registerData.password}
                id="password"
                required />
            </div>
            <div class="form-group">
              <label for="Password">Gender</label>
              <select
                name="gender"
                id="gender"
                class="form-control"
                bind:value={registerData.gender}
                required>
                <option value="L">Laki Laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div class="form-group">
              <label for="Password">Email</label>
              <input
                class="form-control"
                name="email"
                id="email"
                bind:value={registerData.email}
                type="email"
                required />
            </div>
            <div class="form-group">
              <label for="Password">Phone</label>
              <input
                class="form-control"
                name="phone"
                id="phone"
                bind:value={registerData.phone}
                type="phone" />
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">
                {#if isLoadingRegistered}
                  Loading ...
                {:else}<i class="fas fa-sign-in-alt" /> Register{/if}
              </button>
            </div>
          </div>
          <div class="col-md-4 col-sm-12 col-12">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-auto">
                    <button
                      type="button"
                      onclick="document.getElementById('upload-file').click();"
                      class="btn">
                      Upload Foto
                    </button>
                  </div>
                </div>
              </div>
              <input
                type="file"
                hidden
                accept=".png,.jpg"
                id="upload-file"
                on:change={inputFile}
                required />
              <div>
                <img
                  class="img-thumbnail"
                  id="preview-image"
                  style="width:100%"
                  src="https://www.pngitem.com/pimgs/m/80-800194_transparent-users-icon-png-flat-user-icon-png.png"
                  alt="imagenotfound" />
              </div>
            </div>
          </div>
        </form>
        <div class="card-footer">
          <label for="daftar">Sudah punya akun ? Silahkan login</label>
          <button
            on:click={() => setChange()}
            class="btn bg-success fullwidth"
            type="button">
            <i class="fas fa-sign-in-alt" />
            Login
          </button>
        </div>
      </div>
    {/if}
  </div>
</body>
