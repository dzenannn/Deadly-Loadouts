<script setup>
import DateScreen from "./components/DateScreen.vue";
import Sidebar from "./components/Sidebar.vue";
import { ref } from "vue";
import Modal from "./components/ui/Modal.vue";

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
    <Modal
      style="
        padding-left: 10px;
        text-shadow: 1px 1px 5px black;
        font-style: italic;
      "
      title="What's New? (Jun 17, 2025 patch)"
      button="Latest Patch"
      color="#d90000"
    >
      <ul
        style="
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          font-style: italic;
          list-style-type: circle;
        "
      >
        <li>Ghostface killer release.</li>
        <li>The Nightmare buffed.</li>
        <li>New Map added - Fazbear's Pizza.</li>
      </ul>
    </Modal>
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
