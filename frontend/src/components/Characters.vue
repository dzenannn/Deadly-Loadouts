<template>
  <div class="autocompletion">
    <AutoComplete
      v-model="selectedCharacter"
      :suggestions="filteredCharacters"
      @complete="search"
      :forceSelection="true"
      placeholder="Select character"
    />
    <div v-if="errorMsg" style="color: red; font-size: 0.9rem">
      {{ errorMsg }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import AutoComplete from "primevue/autocomplete";

const characters = ref({});
const selectedCharacter = ref("");
const filteredCharacters = ref([]);
const errorMsg = ref("");

const characterNames = computed(() =>
  Object.values(characters.value).map((character) => character.name)
);

const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCharacters.value = [...characterNames.value];
    } else {
      filteredCharacters.value = characterNames.value.filter((name) =>
        name.toLowerCase().startsWith(event.query.toLowerCase())
      );
    }
  }, 250);
};

async function fetchCharacters() {
  try {
    const res = await axios.get("http://localhost:8888/api/proxy.php", {
      params: { path: "api/characters" },
    });
    characters.value = res.data || {};
  } catch (err) {
    console.error("Greška pri fetchovanju:", err);
  }
}

onMounted(fetchCharacters);
</script>

<style>
.autocompletion {
  border-radius: 10px;
  width: max-content;
  background-color: #7fffd48a;
  padding-inline: 5px;
}
</style>
