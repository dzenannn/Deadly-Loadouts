<template>
  <div class="date-screen">
    <form @submit="submitHandler">
      <VueDatePicker
        :min-date="`01/01/1970`"
        :max-date="max"
        v-model="date"
        required
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, defineEmits } from "vue";

const emit = defineEmits(["submit-landed"]);
const date = ref();

const year = new Date().getFullYear();
const max = ref(`${year - 18}-12-31`);

function submitHandler(e) {
  e.preventDefault();
  if (!date.value) return;
  emit("submit-landed");
}
</script>

<style scoped>
.date-screen {
  min-height: 100vh;
  min-width: 100vw;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #272727;
  z-index: 20;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
}

form input {
  padding: 10px;
  box-shadow: 1px 1px 3px black;
  border: none;
  font-size: 2rem;
  width: 20vw;
}

.date-screen button {
  height: 4vh;
  width: 20vw;
  box-shadow: 1px 1px 3px black;
  border: none;
  font-size: 1.25rem;
  letter-spacing: 0.6rem;
  background-color: grey;
  cursor: pointer;
}
</style>
