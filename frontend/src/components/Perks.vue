<template>
  <div class="view">
    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search perk..."
      v-model="search"
    />
    <button
      v-if="shouldShowToggle"
      @click="showAll = !showAll"
      class="show-more-btn"
      style="align-self: flex-end; padding-right: 15px"
    >
      {{ showAll ? "Show less..." : "Show more..." }}
    </button>
    <div class="perks">
      <div
        class="perk"
        v-for="perk in visiblePerks"
        :key="perk.id"
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

const props = defineProps({
  selectedRole: String,
});

const perks = ref([]);
const search = ref("");
const showAll = ref(false);
const MAX_VISIBLE = 8;

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

const currentPerks = computed(() =>
  props.selectedRole === "killer"
    ? filteredKillerPerks.value
    : filteredSurvivorPerks.value
);

const visiblePerks = computed(() =>
  showAll.value ? currentPerks.value : currentPerks.value.slice(0, MAX_VISIBLE)
);

const shouldShowToggle = computed(
  () => currentPerks.value.length > MAX_VISIBLE
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
};
</script>

<style scoped>
.view {
  max-width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.perks {
  padding: 15px;
  background-color: #72000025;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
}

.perk {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: auto;
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

.show-more-btn {
  margin-top: 10px;
  background: none;
  border: none;
  color: #830000;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
}
</style>
