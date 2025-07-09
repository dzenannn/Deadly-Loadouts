<template>
  <div class="loadouts">
    <h3 id="title">Create New Loadout</h3>
    <div class="role-select">
      <Button
        name="Survivor"
        @click="selectedRole = 'survivor'"
        :class="{ active: selectedRole === 'survivor' }"
      />
      <Button
        name="Killer"
        @click="selectedRole = 'killer'"
        :class="{ active: selectedRole === 'killer' }"
      />
    </div>
    <div v-if="selectedRole" class="add-loadout">
      <input
        v-model="selectedCharacter"
        class="character-input"
        placeholder="Character name..."
      />
      <PerksView :selected-role="selectedRole" :max-visible="8" />
      <Button name="Create Loadout" @click="handleAdd" class="create-btn" />
    </div>
    <h3 id="title">Your Loadouts</h3>
    <div class="map">
      <div
        class="single"
        v-for="(loadout, index) in loadoutsRef"
        :key="index"
        :class="loadout.role"
      >
        <div class="loadout-header">
          <span class="role-badge" :class="loadout.role">
            {{ loadout.role === "killer" ? "KILLER" : "SURVIVOR" }}
          </span>
          <h3 class="loadout-title">
            <template v-if="editIndex === index">
              <input
                v-model="editName"
                class="character-input"
                style="width: 140px; font-size: 1.1rem"
              />
            </template>
            <template v-else>
              {{ loadout.name }}
            </template>
          </h3>
        </div>
        <ul class="perks-list">
          <template v-if="editIndex === index">
            <li
              v-for="(perk, i) in editPerksArray"
              :key="perk.name || perk"
              class="perk-list-item"
            >
              <span class="perk-dot"></span>
              <input
                v-model="editPerksArray[i]"
                class="character-input"
                style="width: 110px; font-size: 1rem"
              />
              <button
                class="delete-btn"
                style="padding: 2px 8px; font-size: 0.9rem"
                @click="removeEditPerk(i)"
              >
                x
              </button>
            </li>
            <li v-if="editPerksArray.length < 4">
              <input
                v-model="newEditPerk"
                class="character-input"
                style="width: 110px; font-size: 1rem"
                placeholder="Add perk"
                @keyup.enter="addEditPerk"
              />
              <button
                class="edit-btn"
                style="padding: 2px 8px; font-size: 0.9rem"
                @click="addEditPerk"
              >
                +
              </button>
            </li>
          </template>
          <template v-else>
            <li
              v-for="perk in loadout.perks"
              :key="perk.name || perk"
              class="perk-list-item"
            >
              <span class="perk-dot"></span>
              {{ perk.name || perk }}
            </li>
          </template>
        </ul>
        <div class="actions">
          <template v-if="editIndex === index">
            <button class="edit-btn" @click="saveEdit(index)">Save</button>
            <button class="delete-btn" @click="cancelEdit">Cancel</button>
          </template>
          <template v-else>
            <button class="edit-btn" @click="startEdit(index, loadout)">
              Edit
            </button>
            <button class="delete-btn" @click="deleteLoadout(index)">
              Delete
            </button>
          </template>
        </div>
      </div>
    </div>
    <Characters />
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

const editIndex = ref(null);
const editName = ref("");
const editPerksArray = ref([]);
const newEditPerk = ref("");

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
  const limitedPerks = store.perks.slice(0, 8);
  if (!selectedCharacter.value) {
    alert("Please select a character!");
    return;
  }
  if (limitedPerks.length === 0) {
    alert("Select at least one perk!");
    return;
  }
  const newLoadout = {
    name: selectedCharacter.value,
    perks: limitedPerks,
    role: selectedRole.value,
  };

  await addLoadout(newLoadout);

  store.perks = [];
  selectedCharacter.value = "";
};

function startEdit(index, loadout) {
  editIndex.value = index;
  editName.value = loadout.name;
  editPerksArray.value = loadout.perks.map((p) =>
    typeof p === "string" ? p : p.name || ""
  );
  newEditPerk.value = "";
}

function cancelEdit() {
  editIndex.value = null;
  editName.value = "";
  editPerksArray.value = [];
  newEditPerk.value = "";
}

function addEditPerk() {
  if (
    newEditPerk.value &&
    editPerksArray.value.length < 4 &&
    !editPerksArray.value.includes(newEditPerk.value)
  ) {
    editPerksArray.value.push(newEditPerk.value);
    newEditPerk.value = "";
  }
}

function removeEditPerk(i) {
  editPerksArray.value.splice(i, 1);
}

async function saveEdit(index) {
  const updatedLoadout = {
    ...loadoutsRef.value[index],
    name: editName.value,
    perks: editPerksArray.value.filter((p) => p && p.trim() !== ""),
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
@import url("https://fonts.googleapis.com/css2?family=Caprasimo&display=swap");

.loadouts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #3a0d0d 100%);
  padding-bottom: 60px;
}

#title {
  color: #830000;
  text-shadow: 2px 2px 8px #000, 0 0 10px #ff2e2e;
  font-family: "Caprasimo", serif;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  margin: 40px 0 30px 0;
  text-align: center;
}

.role-select {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.role-select .active {
  border: 2px solid #ff2e2e;
  background: #2d0000;
  color: #fff;
  box-shadow: 0 0 10px #ff2e2e88;
}

.add-loadout {
  background: #2d0000cc;
  border: 2px solid #ff2e2e;
  border-radius: 12px;
  padding: 24px 32px 18px 32px;
  margin-bottom: 40px;
  box-shadow: 0 2px 12px #000a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.character-input {
  background: #1a1a1a;
  border: 2px solid #ff2e2e;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  padding: 8px 18px;
  margin-bottom: 10px;
  outline: none;
  box-shadow: 0 0 4px #ff2e2e44;
}

.character-input:focus {
  border-color: #fff;
}

.create-btn {
  margin-top: 10px;
}

.map {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 35px;
  margin-top: 20px;
}

.single {
  background: linear-gradient(120deg, #2d0000 60%, #1a1a1a 100%);
  border: 2.5px solid #ff2e2e;
  border-radius: 14px;
  min-width: 340px;
  min-height: 180px;
  box-shadow: 0 4px 18px #000a;
  padding: 28px 32px 18px 32px;
  position: relative;
  transition: transform 0.15s, box-shadow 0.15s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.single.killer {
  border-left: 8px solid #d20000;
}

.single.survivor {
  border-left: 8px solid #1e90ff;
}

.single:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 32px #ff2e2e55;
  background: linear-gradient(120deg, #3a0d0d 60%, #222 100%);
}

.loadout-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 10px;
}

.role-badge {
  font-size: 0.9rem;
  font-weight: bold;
  padding: 3px 14px;
  border-radius: 8px;
  background: #d20000;
  color: #fff;
  letter-spacing: 2px;
  box-shadow: 0 1px 4px #0002;
  border: 2px solid #fff2;
}

.role-badge.survivor {
  background: #1e90ff;
  color: #fff;
}

.role-badge.killer {
  background: #d20000;
  color: #fff;
}

.loadout-title {
  font-family: sans-serif;
  color: #fff;
  font-size: 1.35rem;
  letter-spacing: 0.1rem;
  text-shadow: 1px 1px 4px #000;
}

.perks-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 18px 0;
  padding: 0;
  list-style: none;
}

.perk-list-item {
  background: #ff2e2e22;
  border-radius: 6px;
  padding: 2px 12px 2px 22px;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  font-family: sans-serif;
  letter-spacing: 1px;
  box-shadow: 0 1px 4px #0002;
}

.perk-dot {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #ff2e2e;
  border-radius: 50%;
  box-shadow: 0 0 4px #ff2e2e88;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.edit-btn,
.delete-btn {
  background: #1a1a1a;
  border: 2px solid #ff2e2e;
  color: #fff;
  border-radius: 6px;
  padding: 5px 18px;
  font-family: "Caprasimo", serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border 0.15s;
}

.edit-btn:hover {
  background: #1e90ff;
  color: #fff;
  border-color: #fff;
}

.delete-btn:hover {
  background: #d20000;
  color: #fff;
  border-color: #fff;
}
</style>
