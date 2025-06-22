import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CharactersView from "./views/CharactersView.vue";
import UpdatesView from "./views/UpdatesView.vue";
import TipsView from "./views/TipsView.vue";
import Loadouts from "./views/Loadouts.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/loadouts",
      name: "loadouts",
      component: Loadouts,
    },
    {
      path: "/tips",
      name: "tips",
      component: TipsView,
    },
  ],
  linkActiveClass: "active-link",
});

export default router;
