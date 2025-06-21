<template>
  <button @click="toggleTheme" class="theme-toggle">
    <span v-if="theme === 'light'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 64 64"
      >
        <circle
          cx="32"
          cy="32"
          r="32"
          fill="#405866"
          stroke-width="1.5"
          stroke="#000"
        />
        <g fill="#4f6977" stroke-width="1.5" stroke="#4f6977">
          <circle cx="29.31" cy="52.982" r="9.262" />
          <path
            d="M41.943 24.333a3.936 3.936 0 0 1-7.869 0a3.934 3.934 0 0 1 7.869 0"
          />
          <circle cx="5.863" cy="36.434" r="3.86" />
          <circle cx="6.211" cy="18.742" r="2.204" />
          <circle cx="17.477" cy="19.481" r="3.446" />
          <path
            d="M47.792 10.867a4.853 4.853 0 1 1-9.706 0a4.853 4.853 0 0 1 9.706 0"
          />
        </g>
      </svg>
    </span>
    <span v-if="theme !== 'light'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
      >
        <path
          fill="#d20000"
          d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2z"
          stroke-width="1.5"
          stroke="#000"
        />
        <circle
          cx="18"
          cy="18"
          r="10"
          fill="#d20000"
          stroke-width="1.5"
          stroke="#000"
        />
      </svg>
    </span>
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
  right: 5px;
  z-index: 1;
  text-shadow: 1px 1px 6px black;
  transition: bottom 1s ease 0s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.6rem;
  transition: scale 0.25s;
}

.theme-toggle:hover {
  scale: 1.15;
}
</style>
