<template>
  <div class="signup" v-if="!store.user">
    <h2 style="text-align: center">Sign Up</h2>
    <div class="signup-form">
      <h4>Email</h4>
      <input v-model="store.email" type="email" name="email" id="email" />
      <h4>Password</h4>
      <input v-model="store.password" type="password" name="pass" id="pass" />
    </div>
    <Button name="Sign Up" @click="store.signUp"></Button>
    <p>
      Already have an account?
      <a><RouterLink to="/login">Log in</RouterLink></a>
    </p>
  </div>
</template>

<script setup>
import Button from "./ui/Button.vue";
import { useAuthStore } from "../store";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAuthStore();

onMounted(() => {
  store.fetchUser();
});

watch(
  () => store.user,
  (user) => (user ? router.replace("/") : "")
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
