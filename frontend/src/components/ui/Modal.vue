<template>
  <div>
    <!-- <a :style="color" @click="$emit('open')">{{ button }}</a> -->
    <div v-if="showModal" class="modal" @click.self="$emit('close')">
      <div class="modal-content animate__animated animate__fadeInDown">
        <span class="close" @click="$emit('close')">&times;</span>
        <h1>{{ title }}</h1>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: Boolean, //color: String//,
    button: String,
    title: String,
  },
  data() {
    return {
      images: {
        prva: {
          src: "../../assets/claire-redfield.jpg",
          alt: "Claire",
        },
        druga: {
          src: "",
          alt: "",
        },
        treca: {
          src: "",
          alt: "",
        },
      },
    };
  },
  computed: {
    // color() {
    //   return "color: " + this.color;
    // },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 20px 20px 20px;
  border-radius: 15px;
  min-height: 80%;
  min-width: 60%;
  width: min-content;
  position: relative;
  border: 3px solid #000;
  color: #fff;
  font-weight: bold;
}

.modal-content::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("../../assets/huntress.jpg") center/cover no-repeat;
  filter: blur(2px);
  z-index: -1;
  border-radius: 15px;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 28px;
  cursor: pointer;
  color: #000;
}

.close:hover {
  color: #505050;
}

a,
button {
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

h1 {
  position: absolute;
  top: 10px;
  text-shadow: 1px 1px 2px #000000;
  text-align: center;
  padding-bottom: 40px;
  color: #510000;
}

.animate__animated.animate__headShake {
  --animate-duration: 0.75s;
}
</style>
