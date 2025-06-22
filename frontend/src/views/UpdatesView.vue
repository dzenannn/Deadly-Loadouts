<template>
  <div>
    <h1>What's New?</h1>
    <div>
      <p>{{ patch }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const patch = ref("");

onMounted(async () => {
  try {
    const res = await axios.get(
      "https://dbd-summarizer.onrender.com/patches?patch=510"
    );
    const data = res.data;
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
});
</script>

<style scoped>
h1 {
  text-align: center;
  padding-top: 15px;
}
</style>
