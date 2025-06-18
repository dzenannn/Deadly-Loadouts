<script setup>
import Sidebar from "./components/Sidebar.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
</script>

<template>
  <Sidebar />
  <ThemeToggle />
  <div style="padding-right: 17.5%">
    <RouterView />
  </div>
</template>

<style>
@import "./assets/themes.css";
#app {
  font-family: sans-serif;
  min-height: 200vh;
  line-height: 1.5;
  color-scheme: light dark;
}
</style>
