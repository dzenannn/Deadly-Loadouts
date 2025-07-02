<template>
  <div class="loadouts">
    <h2 id="title">Loadouts</h2>
    <Characters v-model="selectedCharacter" />
    <div class="map" v-for="(loadout, index) in loadoutsRef" :key="index">
      <div class="loadout">
        <template v-if="editIndex === index">
          <input v-model="editName" placeholder="Loadout Name" />
          <input v-model="editPerks" placeholder="Perks (comma separated)" />
          <button @click="saveEdit(index)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </template>
        <template v-else>
          <strong>{{ loadout.name }}</strong>
          <p
            v-html="
              loadout.perks.map((perk) => {
                return `<i> ${perk}</i>`;
              })
            "
          ></p>
          <button @click="startEdit(index, loadout)">Edit</button>
          <button
            @click="deleteLoadout(index)"
            style="margin-left: 8px; color: #830000"
          >
            Delete
          </button>
        </template>
      </div>
    </div>
    <div class="add-loadout">
      <h3>Dodaj novi loadout</h3>
      <div>
        <input v-model="newPerks" placeholder="Perks (separated with comma)" />
      </div>
      <Button name="Create Loadout" @click="handleAdd"></Button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import router from "../router";
import { useAuthStore } from "../store";
import { supabase } from "../utils/supabase";
import Characters from "../components/Characters.vue";
import Button from "../components/ui/Button.vue";

const dataa = ref({ perks: [], killers: [], survivors: [] });

const selectedCharacter = ref("");

const store = useAuthStore();

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
  const perksArray = newPerks.value
    .split(",")
    .map((perk) => perk.trim())
    .filter((p) => p !== "");
  if (!selectedCharacter.value) {
    alert("Please select a character!");
    return;
  }
  const newLoadout = {
    name: selectedCharacter.value,
    perks: perksArray,
  };

  await addLoadout(newLoadout);

  newPerks.value = "";
  selectedCharacter.value = "";
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

/* .loadouts {
}

.map {
}

.loadout {
} */

.add-loadout {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
