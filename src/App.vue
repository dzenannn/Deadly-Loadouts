<script setup>
import Sidebar from "./components/Sidebar.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
</script>

<template>
  <ThemeToggle />
  <Sidebar />
</template>

<style>
@import "./assets/themes.css";
#app {
  min-height: 100vh;
  line-height: 1.5;
  color-scheme: light dark;
}
</style>
