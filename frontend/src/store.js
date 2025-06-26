import { defineStore } from "pinia";
import { supabase } from "./utils/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    password: "",
    name: "Dzeno",
    loggedIn: false,
    currentUser: null,
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    async logIn() {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });
      // after loged in/error handling ↓↓
      if (error) console.log(error.message);
      if (!error) {
        console.log(`Logged in successfully!`);
        this.loggedIn = true;
        localStorage.setItem("logged", this.loggedIn);
        this.currentUser = data.user;
      }
    },
    async signUp() {
      let { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });
      // after signed up/error handling ↓↓
      if (error) console.log(error.message);
      if (!error) {
        console.log(await supabase.auth.getUser());
      }
    },
    async getUser() {
      await supabase.auth.getUser();
    },
    async logOut() {
      let { error } = await supabase.auth.signOut();
      this.loggedIn = false;
      if (error) console.log(error.message);
    },
  },
});
