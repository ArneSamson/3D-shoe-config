<template>
  <header>
    <div class="shoe-desc">
      <H1>AIR REV. NITRO S</H1>
      <p>€ 200</p>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    //when done is clicked, console log the final options from selection menu component
    logfunction() {
      console.log(this.$root.finalOptions);
    },
  },
};
</script>

<style scoped>
header {
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin: 0;
  border-bottom: #000;
  border-width: 0 0 2px 0;
  border-style: solid;
}

.shoe-desc {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 43px;
  background-color: #d6ff38;
}

h1 {
  color: #000;
  font-size: 1.5rem;
  margin: 0;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.6px;
}
p {
  font-family: "inter", sans-serif;
  font-size: 1§px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

button {
  color: #d6ff38;
  background-color: #000;
  margin: 43px;
  width: 300px;
  height: 68px;
  font-family: "inter", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
</style>
