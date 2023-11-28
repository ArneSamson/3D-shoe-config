// router.js
import { createRouter, createWebHistory } from "vue-router";
import Config from "./components/Config.vue";
import Config2 from "./components/Config2.vue";

const routes = [
  { path: "/", component: Config },
  { path: "/config2", component: Config2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
