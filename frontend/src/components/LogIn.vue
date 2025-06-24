<template>
  <div class="login">
    <div>
      <h2 style="text-align: center">Login</h2>
      <h4>Email</h4>
      <input v-model="email" type="email" name="email" id="email" />
      <h4>Password</h4>
      <input v-model="password" type="password" name="pass" id="pass" />
    </div>
    <Button name="Login" @click="logIn"></Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../utils/supabase";
import Button from "./ui/Button.vue";

const email = ref("");
const password = ref("");

async function signUp() {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) alert(error.message);
  if (!error) alert(`Logged in successfully!`);
}
</script>

<style lang="scss" scoped></style>
