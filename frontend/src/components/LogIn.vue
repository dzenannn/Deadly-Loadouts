<template>
  <div class="login">
    <h2 style="text-align: center">Log In</h2>
    <div class="login-form">
      <h4>Email</h4>
      <input v-model="store.email" type="email" name="email" id="email" />
      <h4>Password</h4>
      <input v-model="store.password" type="password" name="pass" id="pass" />
    </div>
    <Button name="Log In" @click="store.logIn"></Button>
  </div>
</template>

<script setup>
import Button from "./ui/Button.vue";
import { useAuthStore } from "../store";
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";

const store = useAuthStore();
const router = useRouter();
const route = useRoute();

watch(
  () => store.loggedIn,
  (loggedIn) => {
    if (loggedIn) {
      const redirect = route.query.redirect || "/";
      router.replace(redirect);
    }
  }
);
</script>

<style scoped>
.login {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login input {
  width: 250px;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding-inline: 10px;
}
</style>
