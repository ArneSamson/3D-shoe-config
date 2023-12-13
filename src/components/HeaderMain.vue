<template>
  <header class="headerMain">
    <router-link to="/">
      <div class="headerMain__logo">
        <img class="headerMain__img" src="/media/logo.webp" alt="SWEAR-LOGO" />
      </div>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.headerMain {
  background-color: #242424;
  color: #000;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  margin: 0;
  border-bottom: #d6ff38;
  border-width: 0 0 2px 0;
  border-style: solid;
  height: 122px;
}

.headerMain__logo {
  flex-direction: column;
  align-items: start;
  padding: 40px;
  background-color: var(--color-accent);
}

a {
  text-decoration: none;
  color: white;
}

.headerMain__admin-button {
  color: var(--color-accent);
  background-color: #000;
  width: 80%;
  max-width: 300px;
  height: 68px;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin-right: 100px;
  margin-top: 30px;
}

@media (max-width: 600px) {
  .headerMain {
    height: 63px;
  }
  .headerMain__logo {
    flex-direction: column;
    align-items: start;
    padding: 20px;
    background-color: var(--color-accent);
  }

  .headerMain__admin-button {
    width: 60%;
    max-width: 200px;
    height: 30px;
    font-size: 12px;
    margin-right: 40px;
    margin-top: 20px;
    margin-bottom: 0px;
  }

  .headerMain__img {
    width: 100px;
  }
}
</style>
