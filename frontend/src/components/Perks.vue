<template>
  <div class="view">
    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search perk..."
      v-model="search"
    />
    <br />
    <div class="perks">
      <div
        class="perk"
        v-for="perk in filteredSurvivorPerks"
        :key="perk.id"
        v-if="selectedRole === 'survivor'"
        @click="selectPerk(perk)"
        :class="{ selected: store.perks.includes(perk) }"
      >
        <span>{{ perk.name }}</span>
      </div>
      <div
        class="perk"
        v-for="perk in filteredKillerPerks"
        :key="perk.id"
        v-if="selectedRole === 'killer'"
        @click="selectPerk(perk)"
        :class="{ selected: store.perks.includes(perk) }"
      >
        <span>{{ perk.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../store";

const store = useAuthStore();

defineProps({
  selectedRole: String,
});

const perks = ref([]);
const search = ref("");

const survivorPerks = computed(() =>
  perks.value.filter((p) => p.role === "survivor")
);

const killerPerks = computed(() =>
  perks.value.filter((p) => p.role === "killer")
);

const filteredSurvivorPerks = computed(() =>
  survivorPerks.value.filter((perk) =>
    perk.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const filteredKillerPerks = computed(() =>
  killerPerks.value.filter((perk) =>
    perk.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

async function fetchPerks() {
  try {
    const res = await axios.get("http://localhost:8888/api/proxy.php", {
      params: { path: "api/perks" },
    });
    perks.value = Object.values(res.data) || [];
  } catch (err) {
    console.error("Greška pri fetchovanju:", err);
  }
}

onMounted(fetchPerks);

const selectPerk = (perk) => {
  if (store.perks.includes(perk)) {
    const idx = store.perks.indexOf(perk);
    if (idx !== -1) store.perks.splice(idx, 1);
  } else if (store.perks.length === 4) {
    alert("Four perks is maximum number!");
  } else {
    store.perks.push(perk);
  }
  console.log(store.perks);
};
</script>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.perks {
  margin-inline: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-inline: 10px;
  background-color: #72000025;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
}

.perk {
  text-align: center;
  width: 200px;
  height: 50px;
  background-color: #c921593d;
  border-radius: 5px;
  padding: 5px;
}

.perk:hover {
  cursor: pointer;
  background-color: #c9215971;
}

.selected {
  background-color: green !important;
}
</style>
