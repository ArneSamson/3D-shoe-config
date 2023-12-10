<script setup>
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import HeaderMain from "./components/HeaderMain.vue";
import Config from "./components/Config.vue";
import Config2 from "./components/Config2.vue";
import Menu from "./components/Menu.vue";

const route = useRoute();
</script>

<template>
  <Header v-if="route.path !== '/'"/>
  <HeaderMain v-else/>
  <router-view />
</template>

<style scoped></style>
