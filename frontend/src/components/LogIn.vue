<template>
  <div class="login" v-if="!store.user">
    <h2 style="text-align: center">Log In</h2>
    <div class="login-form">
      <h4>Email</h4>
      <input v-model="store.email" type="email" name="email" id="email" />
      <h4>Password</h4>
      <input v-model="store.password" type="password" name="pass" id="pass" />
    </div>
    <Button name="Log In" @click="store.logIn"></Button>
    <p>
      Don't have an account?
      <a><RouterLink to="/register">Sign up</RouterLink></a>
    </p>
  </div>
  <div v-else>
    Ulogovan si
    <br />
    <Button name="Log Out" @click="store.logOut"></Button>
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
  () => store.user,
  (user) => {
    if (user) {
      const redirect = route.query.redirect || "/";
      router.replace(redirect);
    }
  }
);
</script>

<style scoped>
p {
  padding-top: 10px;
}
a {
  color: #ff0000;
}
a:hover {
  text-decoration: underline;
}
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
