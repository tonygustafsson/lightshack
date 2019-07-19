<script>
  export let clicked;

  let handleClick = () => {
    clicked++;
  };
</script>

<style>
  .app {
    background: black;
    color: white;
    user-select: none;
  }
  h1 {
    color: red;
  }
</style>

<body class="app" on:click={handleClick}>
  <h1>LightShack</h1>

  <p>Clicked {clicked} times.</p>
</body>
