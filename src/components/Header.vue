<template>
  <header>
    <router-link to="/">
      <div class="shoe-desc">
        <img src="/media/logo-white.webp" alt="SWEAR-LOGO" />
      </div>
    </router-link>
    <button @click="toggleSound">
      <img class="shoe-desc__img" src="/media/sound.svg" alt="" />
    </button>
  </header>
</template>

<script>
import { Howl } from "howler";

export default {
  data() {
    return {
      sound: null,
      isPlaying: false,
    };
  },
  methods: {
    initSound() {
      this.sound = new Howl({
        src: ["/media/sonicbranding.mp3"],
        loop: true,
      });
    },
    toggleSound() {
      if (!this.sound) {
        this.initSound();
      }

      if (this.isPlaying) {
        this.sound.pause();
      } else {
        this.sound.play();
      }

      this.isPlaying = !this.isPlaying;
    },
  },
};
</script>

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

.shoe-desc__img {
  height: 50px;
  width: 50px;
  margin-top: 10px;
}

button {
  color: var(--color-accent);
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 40px;
  display: block;
  margin: auto;
  margin-right: 50px;
}

button:hover {
  cursor: pointer;
}

@media (max-width: 700px) {
  img {
    width: 150px;
  }

  .shoe-desc__img {
    height: 30px;
    width: 30px;
    margin-right: -25px;
  }
}
</style>
