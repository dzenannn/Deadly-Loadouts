<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const characters = ref([]);

async function fetchCharacters() {
  try {
    await axios
      .get("http://localhost:8888/api/proxy.php")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Greška pri fetchovanju:", err);
      });
  } catch (e) {
    console.log(e.message);
  }
}

onMounted(() => {
  fetchCharacters();
});
</script>

<style scoped></style>
