<script setup>
import DateScreen from "./components/DateScreen.vue";
import Sidebar from "./components/Sidebar.vue";
import { ref } from "vue";

const landed = ref(false);

function submitLanded() {
  landed.value = false;
  console.log(landed.value);
}
</script>

<template>
  <DateScreen v-if="landed" @submit-landed="submitLanded" />
  <div v-if="!landed">
    <Sidebar />
    <div style="padding-right: 17.5%">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "./assets/themes.css";
html {
  scroll-behavior: smooth;
  /* user-select: none; */
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
