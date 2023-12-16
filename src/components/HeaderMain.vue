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
  background-image: url("../media/header1.png");
  background-size: 40%;
  background-position: center;
  color: #000;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  margin: 0;
  border-bottom: var(--color-accent);
  border-width: 0 0 2px 0;
  border-style: solid;
  height: 100px;

  animation: loopBackground 50s infinite alternate ease-in-out;
}

@keyframes loopBackground {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}

.headerMain__logo {
  flex-direction: column;
  align-items: start;
  padding: 28px;
  background-color: var(--color-accent);
}

a {
  text-decoration: none;
  color: white;
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

  .headerMain__img {
    width: 100px;
  }
}
</style>
