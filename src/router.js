import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CharactersView from "./views/CharactersView.vue";
import ItemsView from "./views/ItemsView.vue";
import TipsView from "./views/TipsView.vue";
import LoadoutBuilderView from "./views/LoadoutBuilderView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/loadout-builder",
      name: "loadout-builder",
      component: LoadoutBuilderView,
    },
    {
      path: "/characters",
      name: "characters",
      component: CharactersView,
    },
    {
      path: "/items",
      name: "items",
      component: ItemsView,
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
