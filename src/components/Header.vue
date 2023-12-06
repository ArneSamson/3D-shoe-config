<template>
  <header>
    <div class="shoe-desc">
      <img src="/media/logo.webp" alt="SWEAR-LOGO" />
    </div>
  </header>
</template>

<script></script>

<style scoped>
header {
  position: absolute;
  z-index: 5;
  background-color: transparent;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin: 0;
}

.shoe-desc {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
}

img {
  width: 200px;
}
</style>
