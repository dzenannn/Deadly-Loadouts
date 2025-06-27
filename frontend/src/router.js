import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import UpdatesView from "./views/UpdatesView.vue";
import TipsView from "./views/TipsView.vue";
import LoadoutsView from "./views/LoadoutsView.vue";
import SignUpView from "./views/SignUpView.vue";
import LogInView from "./views/LogInView.vue";
import { useAuthStore } from "./store";

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
      component: LoadoutsView,
    },
    {
      path: "/updates",
      name: "updates",
      component: UpdatesView,
    },
    {
      path: "/tips",
      name: "tips",
      component: TipsView,
    },
    {
      path: "/register",
      name: "register",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LogInView,
    },
  ],
  linkActiveClass: "active-link",
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.name === "loadouts" && store.user === null) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
