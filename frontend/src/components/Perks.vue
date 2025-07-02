<template>
  <div>
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
      >
        <span>{{ perk.name }}</span>
      </div>
      <div
        class="perk"
        v-for="perk in filteredKillerPerks"
        :key="perk.id"
        v-if="selectedRole === 'killer'"
      >
        <span>{{ perk.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";

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
</script>

<style scoped>
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
</style>
