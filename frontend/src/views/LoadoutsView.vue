<template>
  <div>
    <h2 id="title">
      Loadouts <br />
      <span id="sub">Build Your Own Loadouts</span>
    </h2>
    <div class="loadouts" v-for="(loadout, index) in loadoutsRef" :key="index">
      <strong>{{ loadout.name }}</strong> - {{ loadout.perks }}
    </div>
    <div style="margin: auto">
      <h3>Dodaj novi loadout</h3>
      <input v-model="newLoadoutName" placeholder="Ime loadouta" />
      <input v-model="newPerks" placeholder="Perkovi (zarezom)" />
      <button @click="handleAdd">Dodaj</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { watch } from "vue";
import router from "../router";
import { useAuthStore } from "../store";
import { supabase } from "../utils/supabase";

const store = useAuthStore();

const loadoutsRef = ref([]);
const newLoadoutName = ref("");
const newPerks = ref("");

//todo da se prilagodi kod loadouts(jsonb) iz supabase. u loadouts(jsonb) treba inicijalno da postoji id: user.id i loadouts: [].

async function fetchLoadouts() {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) return;

  const { data, error } = await supabase
    .from("loadouts")
    .select("loadouts")
    .eq("id", userId)
    .single();
  if (error) {
    console.log("Error while fetching: ", error);
    return;
  }

  loadoutsRef.value = data.loadouts || [];
  console.log(loadoutsRef.value);

  // let { data: loadouts, error } = await supabase.from("loadouts").select("*").eq('id', userId);
  // if (error) console.log(error.message);
  // if (!error) {
  //   loadoutsRef.value = loadouts || [];
  // }
}

const addLoadout = async (newLoadout) => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) return;

  const existingLoadouts = [...loadoutsRef.value, newLoadout];

  const { error: updateError } = await supabase
    .from("loadouts")
    .update({ loadouts: existingLoadouts })
    .eq("id", userId);
  if (updateError) {
    console.log("Error while adding loadout: ", updateError);
  } else {
    loadoutsRef.value = existingLoadouts;
    console.log("Loadout successfully added!");
  }
};

const handleAdd = async () => {
  const perksArray = newPerks.value
    .split(",")
    .map((perk) => perk.trim())
    .filter((p) => p !== "");
  const newLoadout = {
    name: newLoadoutName.value,
    perks: perksArray,
  };

  await addLoadout(newLoadout);

  newLoadoutName.value = "";
  newPerks.value = "";
};

onMounted(fetchLoadouts);

watch(
  () => store.user,
  (user) => {
    if (!user) {
      router.replace("/");
    }
  }
);
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

.loadouts {
  padding: 20px 0 20px 0;
  text-align: center;
}
</style>
