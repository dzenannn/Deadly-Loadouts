<template>
  <div>
    <h2 id="title">
      Loadouts <br />
      <span id="sub">Build Your Own Loadouts</span>
    </h2>
    <button @click="store.logOut">Logout</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { watch } from "vue";
import router from "../router";
import { useAuthStore } from "../store";
import { supabase } from "../utils/supabase";

const store = useAuthStore();

async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    store.currentUser = data.user;
    store.loggedIn = true;
  } else {
    store.currentUser = null;
    store.loggedIn = false;
  }
}

onMounted(() => {
  getUser();
});

watch(
  () => store.loggedIn,
  (loggedIn) => {
    if (!loggedIn) {
      router.replace("/");
    }
  }
);
</script>

<style scoped>
#button {
  justify-self: center;
}
#title {
  color: #830000;
  text-shadow: 1px 1px 4px black;
  font-family: "Caprasimo";
  font-size: 2rem;
  padding-top: 2%;
  text-align: center;
  letter-spacing: 1rem;
}

#sub {
  letter-spacing: 0.45rem;
}
</style>
