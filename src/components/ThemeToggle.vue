<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ theme === "light" ? "🌙" : "☀️" }}
  </button>
</template>

<script setup>
import { useTheme } from "../composables/useTheme";
/* eslint-disable */
const { theme, toggleTheme } = useTheme();
localStorage.setItem("theme", theme.value);
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  text-shadow: 1px 1px 6px black;
  transition: bottom 1s ease 0s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.6rem;
  transition: scale 0.25s;
}

.theme-toggle:hover {
  scale: 1.15;
}
</style>
