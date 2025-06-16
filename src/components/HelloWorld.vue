<script setup>
import { ref } from "vue";
import axios from "axios";

const count = ref(0);
const state = ref(false);
const p = ref("");

function fetchData() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
      p.value = res.data.title;
      state.value = true;
    })
    .catch((err) => console.log(err));
}
</script>

<template>
  <div>
    <p>Hello World</p>
    <button @click="fetchData">Fetch Todo</button>
    <p v-if="state">{{ p }}</p>
  </div>
</template>

<style scoped></style>
