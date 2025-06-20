<template>
  <div>
    <h2 style="text-align: center">Tips</h2>
    <h3>User Account</h3>
    <p v-if="killer">Killer name: {{ killer.killer }}</p>
    <p v-else>Loading...</p>
    <button @click="fetchUser">Load User</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TipsView",
  data() {
    return {
      killer: null,
    };
  },
  methods: {
    async fetchUser() {
      const res = await axios.get("http://localhost:8000/api/user.php", {
        withCredentials: true,
      });
      this.killer = res.data;
      console.log(res.data);
    },
  },
};
</script>

<style scoped></style>
