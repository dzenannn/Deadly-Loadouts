<script setup>
import DateScreen from "./components/DateScreen.vue";
import Sidebar from "./components/Sidebar.vue";
import { ref, onMounted } from "vue";
import Modal from "./components/ui/Modal.vue";
import { useAuthStore } from "./store";
import axios from "axios";

const store = useAuthStore();
const showModal = ref(false);
const landed = ref(false);
const patch = ref([]);

function submitLanded() {
  landed.value = false;
  console.log(landed.value);
}

async function getPatch() {
  try {
    const res = await axios.get(
      "https://dbd-summarizer.onrender.com/patches?patch=510"
    );
    const data = res.data.split(".");
    patch.value = data.slice(0, -1);
  } catch (e) {
    console.log(e.message);
  }
}

onMounted(() => {
  getPatch();
  store.fetchUser();
  store.initAuthListener();
});
</script>

<template>
  <DateScreen
    v-if="landed"
    style="overflow: hidden"
    @submit-landed="submitLanded"
  />
  <div v-if="!landed">
    <!-- <h4 style="text-align: center" v-if="store.user">
      User: {{ store.user.email.split("@")[0] }}
    </h4> -->
    <!-- <button
      v-if="store.user"
      @click="store.logOut"
      style="padding-inline: 30px; margin-left: 10px"
    >
      Logout
    </button> -->
    <Modal
      style="
        padding-left: 10px;
        text-shadow: 1px 1px 3px black;
        font-style: italic;
      "
      title="What's New? (Jun 17, 2025 patch)"
      button="Latest Patch"
      :showModal="showModal"
      @close="showModal = false"
    >
      <ul style="line-height: 2.5rem" v-for="el in patch">
        <li :key="el">
          {{ el.concat(".") }}
        </li>
      </ul>
    </Modal>
    <Sidebar @open-patch-notes="showModal = true" />
    <div style="padding-right: 17.5%">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "./assets/themes.css";
html {
  user-select: none;
  scroll-behavior: smooth;
  overflow-y: scroll;
}

#app {
  min-width: 100%;
  font-family: sans-serif;
  line-height: 1.5;
  color-scheme: light dark;
}

a {
  text-decoration: none;
}
</style>
