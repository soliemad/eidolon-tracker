<script setup>
import { computed } from "vue";
import { useEidolonTools } from "@/composables/useEidolonTools";
import { useLocalStorage } from "../composables/useLocalStorage";
const { isEidolonComplete } = useEidolonTools();
defineEmits(["add"]);
const props = defineProps({
  eidolons: {
    type: Array,
    required: true,
  },
});
const ownedFilter = defineModel({
  type: String,
  required: true,
  default: "all",
});
const nameFilter = defineModel("name-filter", {
  type: String,
  required: true,
});

const ownedCount = computed(() => {
  return props.eidolons.filter((eidolon) => {
    const { eidolonStorage } = useLocalStorage(eidolon);

    return eidolonStorage.value.owned
  }).length;
});
const completedCount = computed(() => {
  return props.eidolons.filter((eidolon) => {
    const { eidolonStorage } = useLocalStorage(eidolon);
    
    isEidolonComplete(eidolonStorage.value)
  }).length;
});
</script>
<template>
  <BCard class="mb-3">
    <template #header>
      <div class="d-flex flex-row align-items-center">
        <div style="min-width: 130px"></div>
        <h1 class="text-center flex-grow-1 text-primary">Aura Kingdom Eidolon Tracker</h1>
        <BButton variant="primary" @click="$emit('add')">+ Add Eidolon</BButton>
      </div>
    </template>

    <BFormInput
      type="text"
      id="search"
      placeholder="Search Eidolons by name..."
      v-model="nameFilter"
      lazy
    />

    <div
      class="filters d-flex flex-row flex-nowrap justify-content-around mt-2"
    >
      <BButton
        :variant="ownedFilter === 'all' ? 'primary' : 'outline-primary'"
        @click="ownedFilter = 'all'"
        >All</BButton
      >
      <BButton
        :variant="ownedFilter === 'owned' ? 'primary' : 'outline-primary'"
        @click="ownedFilter = 'owned'"
        >Owned</BButton
      >
      <BButton
        :variant="ownedFilter === 'unowned' ? 'primary' : 'outline-primary'"
        @click="ownedFilter = 'unowned'"
        >Unowned</BButton
      >
      <BButton
        :variant="ownedFilter === 'completed' ? 'primary' : 'outline-primary'"
        @click="ownedFilter = 'completed'"
        >Completed</BButton
      >
      <BButton
        :variant="ownedFilter === 'notcompleted' ? 'primary' : 'outline-primary'"
        @click="ownedFilter = 'notcompleted'"
        >Not Completed</BButton
      >
    </div>

    <div class="d-flex flex-row flex-nowrap justify-content-around fs-5">
      <span> Eidolons Owned: {{ ownedCount }} / {{ eidolons.length }} </span>
      <span> Completed: {{ completedCount }} / {{ eidolons.length }} </span>
    </div>
  </BCard>
</template>
