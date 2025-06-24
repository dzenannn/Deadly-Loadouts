<template>
  <div>
    <h2 id="title">
      Loadouts <br />
      <span id="sub">Build Your Own Loadouts</span>
    </h2>
    <h1></h1>
    <div class="view">
      <SignUp v-if="!loggedIn" />
      <LogIn v-else />
    </div>
    <div id="button"><Button name="Log Out" @click="logOut"></Button></div>
  </div>
</template>

<script>
import { supabase } from "../utils/supabase";
import LogIn from "../components/LogIn.vue";
import SignUp from "../components/SignUp.vue";
import Button from "../components/ui/Button.vue";

export default {
  name: "Loadouts",
  components: { SignUp, Button, LogIn },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    async logOut() {
      let { error } = await supabase.auth.signOut();
    },
    async getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    },
    // async getLoadouts() {
    //   const {
    //     data: { user },
    //   } = await supabase.auth.getUser();
    //   let { data: loadouts, error } = await supabase
    //     .from("loadouts")
    //     .select("*");
    //   //
    //   console.log(loadouts);
    // },
    // //
    // selectKiller(param) {
    //   this.killerSelected = true;
    //   this.chosenLoadout.name = param;
    //   this.chosenLoadout.content = this.loadoutMap.perks;
    // },
    // //
    // async createLoadout() {
    //   try {
    //     const res = await axios.post(
    //       "http://localhost:8000/api/loadouts.php",
    //       {
    //         killer: this.killer,
    //       },
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     console.log(`Killer sent => ${JSON.stringify(res.data.killer)}`);
    //   } catch (e) {
    //     alert("Error: " + e.message);
    //   }
    // },
  },
};
</script>

<style scoped>
#button {
  justify-self: center;
}
#title {
  color: #830000;
  text-shadow: 1px 1px 4px black;
  font-family: "Caprasimo";
  font-size: 2rem;
  padding-top: 2%;
  text-align: center;
  letter-spacing: 1rem;
}

#sub {
  letter-spacing: 0.45rem;
}

.view {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
