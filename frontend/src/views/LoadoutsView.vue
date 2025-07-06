<template>
  <div class="loadouts">
    <h2 id="title">Loadouts</h2>
    <div class="map">
      <div class="single" v-for="(loadout, index) in loadoutsRef" :key="index">
        <h3>{{ loadout.name }}</h3>
        <ul style="list-style-type: none">
          <li v-for="perk in loadout.perks">- {{ perk.name || perk }}</li>
        </ul>

        <button @click="startEdit(index, loadout)">Edit</button>
        <button
          @click="deleteLoadout(index)"
          style="margin-left: 8px; color: #830000"
        >
          Delete
        </button>
      </div>
    </div>
    <br />
    <h3>Dodaj novi loadout</h3>
    <div>
      <input v-model="selectedCharacter" placeholder="Loadout Name" />
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
        gap: 50px;
      "
    >
      <Button name="Survivor" @click="selectedRole = 'survivor'"></Button>
      <Button name="Killer" @click="selectedRole = 'killer'"></Button>
    </div>
    <PerksView :selected-role="selectedRole" />
    <Characters />
    <Button name="Create Loadout" @click="handleAdd"></Button>
    <br />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import router from "../router";
import { useAuthStore } from "../store";
import { supabase } from "../utils/supabase";
import Characters from "../components/Characters.vue";
import Button from "../components/ui/Button.vue";
import PerksView from "./PerksView.vue";

const store = useAuthStore();

const selectedCharacter = ref("");
const selectedRole = ref("");

const loadoutsRef = ref([]);
const newLoadoutName = ref("");
const newLoadoutCharacter = ref("");
const newPerks = ref("");

// Edit state
const editIndex = ref(null);
const editName = ref("");
const editPerks = ref("");

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
  if (!selectedCharacter.value) {
    alert("Please select a character!");
    return;
  }
  const newLoadout = {
    name: selectedCharacter.value,
    perks: store.perks,
  };

  await addLoadout(newLoadout);

  store.perks = [];
  selectedCharacter.value = "";

  window.scrollTo(0, 0);
};

function startEdit(index, loadout) {
  editIndex.value = index;
  editName.value = loadout.name;
  editPerks.value = loadout.perks.join(", ");
}

function cancelEdit() {
  editIndex.value = null;
  editName.value = "";
  editPerks.value = "";
}

async function saveEdit(index) {
  const updatedLoadout = {
    ...loadoutsRef.value[index],
    name: editName.value,
    perks: editPerks.value
      .split(",")
      .map((perk) => perk.trim())
      .filter((p) => p !== ""),
  };

  const updatedLoadouts = [...loadoutsRef.value];
  updatedLoadouts[index] = updatedLoadout;

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) return;

  const { error: updateError } = await supabase
    .from("loadouts")
    .update({ loadouts: updatedLoadouts })
    .eq("id", userId);

  if (updateError) {
    console.log("Error while updating loadout: ", updateError);
  } else {
    loadoutsRef.value = updatedLoadouts;
    cancelEdit();
    console.log("Loadout updated!");
  }
}

async function deleteLoadout(index) {
  const updatedLoadouts = [...loadoutsRef.value];
  updatedLoadouts.splice(index, 1);

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) return;

  const { error: updateError } = await supabase
    .from("loadouts")
    .update({ loadouts: updatedLoadouts })
    .eq("id", userId);

  if (updateError) {
    console.log("Error while deleting loadout: ", updateError);
  } else {
    loadoutsRef.value = updatedLoadouts;
    cancelEdit();
    console.log("Loadout deleted!");
  }
}

// async function fetchAssets() {
//   try {
//     const res = await axios.get("http://localhost:8888/api/assets.php");
//     dataa.value = res.data || {};
//   } catch (err) {
//     console.error("Greška pri fetchovanju:", err);
//   }
// }

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
.loadouts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

.single {
  background-color: #5e0000;
  padding: 25px;
  height: max-content;
  min-width: 350px;
  border-radius: 10px;
}

.single:hover {
  background-color: #6d00009c;
}

#button {
  justify-self: center;
}
#title {
  color: #830000;
  text-shadow: 1px 1px 4px black;
  padding-bottom: 20px;
  font-family: "Caprasimo";
  font-size: 2rem;
  text-align: center;
  letter-spacing: 0.5rem;
}
.add-loadout {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
