<script setup></script>

<template>
  <div class="sidebar">
    <a> <RouterLink to="/">Main page</RouterLink></a>
    <a style="line-height: 2.8rem">
      <RouterLink to="/loadout-builder">Loadout Builder</RouterLink></a
    >
    <a> <RouterLink to="/characters">Characters</RouterLink></a>
    <a> <RouterLink to="/tips">Tips & Tricks</RouterLink></a>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Savate:ital,wght@0,200..900;1,200..900&display=swap");
.sidebar {
  font-family: "Savate";
  min-height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  width: 17.5%;
  background-color: #464646;
  border-left: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2.25rem;
  gap: 80px;
}

.active-link {
  font-weight: bold;
  color: #b9b9b9;
  text-decoration: underline;
}

a {
  text-align: center;
  text-decoration: none;
  color: #000000;
  transition: scale 0.2s;
}

a:hover {
  scale: 1.06;
}
</style>
