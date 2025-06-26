<template>
  <div class="signup">
    <h2 style="text-align: center">Sign Up</h2>
    <div class="signup-form">
      <h4>Email</h4>
      <input v-model="store.email" type="email" name="email" id="email" />
      <h4>Password</h4>
      <input v-model="store.password" type="password" name="pass" id="pass" />
    </div>
    <Button name="Sign Up" @click="store.signUp"></Button>
  </div>
</template>

<script setup>
import Button from "./ui/Button.vue";
import { useAuthStore } from "../store";

const store = useAuthStore();
</script>

<style scoped>
.signup {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.signup input {
  width: 250px;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding-inline: 10px;
}
</style>
