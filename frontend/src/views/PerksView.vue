<template>
  <div class="perks">
    <Perks :selected-role="selectedRole" />
  </div>
</template>

<script setup>
import Perks from "../components/Perks.vue";

defineProps({
  selectedRole: String,
});
</script>

<style scoped>
#search {
  width: 250px;
  margin: auto;
}

.perks {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
