<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const characters = ref({});

async function fetchCharacters() {
  try {
    const res = await axios.get("https://www.deadly-loadouts.ct.ws/proxy.php", {
      params: { path: "api/characters" },
    });
    characters.value = res.data || {};
  } catch (err) {
    console.error("Greška pri fetchovanju:", err);
  }
}

onMounted(fetchCharacters);
</script>

<style>
.autocompletion {
  border-radius: 10px;
  width: max-content;
  background-color: #7fffd48a;
  padding-inline: 5px;
}
</style>
