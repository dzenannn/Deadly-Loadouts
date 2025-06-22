<template>
  <div>
    <a :style="color" @click="showModal = true">{{ button }}</a>
    <div v-if="showModal" class="modal" @click.self="showModal = false">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h1>{{ title }}</h1>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      showModal: false,
    };
  },
  props: { color: String, button: String, title: String },
  computed: {
    color() {
      return "color: " + this.color;
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #770000;
  padding: 40px 20px 20px 20px;
  border-radius: 8px;
  min-width: 50%;
  width: min-content;
  position: relative;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 28px;
  cursor: pointer;
  color: rgb(121, 121, 121);
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
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  text-align: center;
  padding-bottom: 40px;
  color: #300000;
}
</style>
