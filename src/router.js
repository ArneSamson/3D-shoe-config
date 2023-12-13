// router.js
import { createRouter, createWebHistory } from "vue-router";
import Config from "./components/Config.vue";
import Config2 from "./components/Config2.vue";
import Menu from "./components/Menu.vue";
import ThankYou from "./components/ThankYouPage.vue";

const routes = [
  { path: "/", component: Menu },
  { path: "/config", component: Config },
  { path: "/config2", component: Config2 },
  {
    path: "/thankyou",
    component: ThankYou,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
