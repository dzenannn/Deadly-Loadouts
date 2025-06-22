<script setup>
import axios from "axios";
import DateScreen from "./components/DateScreen.vue";
import Sidebar from "./components/Sidebar.vue";
import { ref, onMounted } from "vue";
import Modal from "./components/ui/Modal.vue";

const landed = ref(false);

const formatPatch = (patch = "No patches found") => {
  const breakString = patch.replace(/\./g, `.<br>`);
  return breakString.replace("unknown", "latest");
};

function submitLanded() {
  landed.value = false;
  console.log(landed.value);
}

const patch = ref("");

onMounted(async () => {
  try {
    const res = await axios.get(
      "https://dbd-summarizer.onrender.com/patches?patch=510"
    );
    const data = res.data;
    patch.value = formatPatch(data);
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<template>
  <DateScreen v-if="landed" @submit-landed="submitLanded" />
  <div v-if="!landed">
    <Sidebar />
    <Modal
      style="
        padding-left: 10px;
        text-shadow: 1px 1px 2px black;
        font-style: italic;
      "
      title="What's New? (Jun 17, 2025 patch)"
      button="Latest Patch"
      color="#d90000"
    >
      <p v-html="patch" style="line-height: 2rem"></p>
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
