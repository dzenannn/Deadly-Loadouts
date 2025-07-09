<template>
  <button class="loadoutButton" v-text="name"></button>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style scoped>
.loadoutButton {
  height: 5vh;
  width: 15vw;
  margin-top: 50px;
  font-weight: 600;
  background-color: #830000;
  border-radius: 100px;
  box-shadow: rgba(187, 44, 44, 0.2) 0 -25px 18px -14px inset,
    rgba(187, 44, 44, 0.15) 0 1px 2px, rgba(187, 44, 44, 0.15) 0 2px 4px,
    rgba(187, 44, 44, 0.15) 0 4px 8px, rgba(187, 44, 44, 0.15) 0 8px 16px,
    rgba(187, 44, 44, 0.15) 0 16px 32px;
  color: #000;
  font-weight: bold;
  letter-spacing: 0.4rem;
  cursor: pointer;
  display: inline-block;
  font-family: monospace;
  text-transform: uppercase;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.loadoutButton:hover {
  box-shadow: rgba(187, 44, 44, 0.35) 0 -25px 18px -14px inset,
    rgba(187, 44, 44, 0.25) 0 1px 2px, rgba(187, 44, 44, 0.25) 0 2px 4px,
    rgba(187, 44, 44, 0.25) 0 4px 8px, rgba(187, 44, 44, 0.25) 0 8px 16px,
    rgba(187, 44, 44, 0.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}

.loadoutButton a {
  color: #000;
}
</style>
