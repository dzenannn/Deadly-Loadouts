import { defineStore } from "pinia";
import { supabase } from "./utils/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    password: "",
    user: null,
  }),
  actions: {
    async logIn() {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });
      if (error) console.log(error.message);
      if (!error) {
        alert(`Logged in successfully!`);
        this.email = "";
        this.password = "";
        this.user = data?.user;
      }
    },
    async signUp() {
      let { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });
      if (error) console.log(error.message);
      if (!error) {
        console.log(await supabase.auth.getUser());
      }
      const user = data.user;
      // on successful signup
      const { error: insertError } = await supabase.from("loadouts").insert([
        {
          id: user.id,
          loadouts: [],
        },
      ]);
      if (insertError)
        console.log("Failed to create loadouts row:", insertError);
      if (!insertError) console.log("Empty loadouts for user created.");
    },
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      this.user = data?.user || null;
    },
    async logOut() {
      await supabase.auth.signOut();
      this.user = null;
    },
    initAuthListener() {
      supabase.auth.onAuthStateChange((event, session) => {
        this.user = session?.user || null;
      });
    },
  },
});
