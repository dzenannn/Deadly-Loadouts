<script setup>
import DateScreen from "./components/DateScreen.vue";
import Sidebar from "./components/Sidebar.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import { ref } from "vue";

const landed = ref(true);

function submitLanded() {
  landed.value = false;
}
</script>

<template>
  <DateScreen v-if="landed" @submit-landed="submitLanded" />
  <div v-if="!landed">
    <Sidebar />
    <ThemeToggle />
    <div style="padding-right: 17.5%">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "./assets/themes.css";
#app {
  font-family: sans-serif;
  line-height: 1.5;
  color-scheme: light dark;
}
</style>
