<template>
  <div>
    <h1
      style="
        text-align: center;
        font-family: monospace;
        margin-top: 20rem;
        color: orange;
      "
    >
      // todo
    </h1>
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
