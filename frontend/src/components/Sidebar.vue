<script setup>
import { defineEmits } from "vue";
import "animate.css";

const emit = defineEmits(["open-patch-notes"]);
</script>

<template>
  <div class="sidebar">
    <a
      class="animate__animated animate__bounceInRight"
      style="--animate-duration: 0.9s"
    >
      <RouterLink to="/">Main page</RouterLink></a
    >
    <a
      class="animate__animated animate__bounceInRight"
      style="--animate-duration: 1.1s; cursor: pointer"
    >
      <p @click="$emit('open-patch-notes')">Patch Notes</p>
    </a>
    <a
      style="--animate-duration: 1s; line-height: 2.8rem"
      class="animate__animated animate__bounceInRight"
    >
      <RouterLink to="/loadouts">Loadouts</RouterLink></a
    >
    <a
      class="animate__animated animate__bounceInRight"
      style="--animate-duration: 1.2s"
    >
      <RouterLink to="/tips">Tips & Tricks</RouterLink></a
    >
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Savate:ital,wght@0,200..900;1,200..900&display=swap");
.sidebar {
  font-family: "Savate";
  min-height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  width: 17.5%;
  background-color: #5e1c1c;
  border-left: 2px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  gap: 80px;
}

.sidebar {
  background: no-repeat center center;
  background-size: cover;
  box-shadow: inset 0 0 30px #a80a0a;
}

.active-link {
  font-weight: bold;
  color: #9e0000;
  text-decoration: underline;
}

a {
  text-align: center;
  text-decoration: none;
  color: #dadada;
  text-shadow: 1px 1px 3px #000;
  transition: scale 0.2s;
}

a:hover {
  scale: 1.02;
}
</style>
