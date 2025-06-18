import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import PerksView from "./views/PerksView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/perks",
      name: "perks",
      component: PerksView,
    },
  ],
});

export default router;
