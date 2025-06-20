<template>
  <div class="melting-text-container">
    <h1 :data-text="meltingText" class="melting-text">{{ meltingText }}</h1>
  </div>
</template>

<script>
export default {
  name: "MeltingText",
  props: {
    meltingText: String,
  },
};
</script>

<style scoped>
.melting-text-container {
  min-height: 50vh;
  position: relative;
  overflow: hidden;
}

.melting-text {
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: relative;
  animation: melt 3s infinite ease-in-out;
  background: linear-gradient(90deg, #b90000, #520000, #740000);
  -webkit-background-clip: text;
  color: transparent;
}

.melting-text::before,
.melting-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #b90000, #520000, #740000);
  -webkit-background-clip: text;
  color: transparent;
  z-index: -1;
  transform: scaleY(1);
  opacity: 0.5;
  animation: drip 3s infinite ease-in-out;
}

.melting-text::after {
  filter: blur(10px);
  opacity: 0.3;
}

@keyframes melt {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
}

@keyframes drip {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 0.5;
  }
  50% {
    transform: scaleY(1.5);
    opacity: 0.6;
  }
}
</style>
