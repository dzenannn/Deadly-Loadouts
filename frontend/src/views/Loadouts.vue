<template>
  <div>
    <h2 style="text-align: center">Loadout Builder</h2>
    <!-- <div
      style="display: flex; align-items: center; margin-top: 100px; gap: 30px"
    >
      <img
        src="https://deadbydaylight.com/static/dd09945fdeec09efd789b1eb39efab42/a4a52/dbd_chap12_ghostface_keyart_03059329eb.jpg"
        alt="ghostface"
        style="
          margin-left: 150px;
          height: 200px;
          width: 400px;
          object-fit: cover;
          border: 1px solid black;
        "
      />
      <h1>Ghostface. Lorem, ipsum dolor.</h1>
    </div> -->
    <div class="builder">
      <label for="killer">Killer</label>
      <br />
      <input type="text" v-model="killer" />
      <button @click="createLoadout">Create</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Loadouts",
  data() {
    return {
      killer: "",
    };
  },
  methods: {
    async createLoadout() {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/loadouts.php",
          {
            killer: this.killer,
          },
          {
            withCredentials: true,
          }
        );
        console.log(`Killer sent => ${JSON.stringify(res.data.killer)}`);
      } catch (e) {
        alert("Error: " + e.message);
      }
    },
  },
};
</script>

<style scoped></style>
