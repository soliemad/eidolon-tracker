<script setup>
import { computed } from "vue";
import { useEidolonTools } from "@/composables/useEidolonTools";
const { isEidolonComplete } = useEidolonTools();

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
  return props.eidolons.filter((eidolon) => eidolon.owned).length;
});
const completedCount = computed(() => {
  return props.eidolons.filter((eidolon) => isEidolonComplete(eidolon)).length;
});
</script>
<template>
  <BCard class="mb-3">
    <template #header>
      <h1 class="text-center">Aura Kingdom Eidolon Tracker</h1>
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
        :variant="ownedFilter === 'all' ? 'primary' : 'secondary'"
        @click="ownedFilter = 'all'"
        class="active"
        >All</BButton
      >
      <BButton
        :variant="ownedFilter === 'owned' ? 'primary' : 'secondary'"
        @click="ownedFilter = 'owned'"
        >Owned</BButton
      >
      <BButton
        :variant="ownedFilter === 'unowned' ? 'primary' : 'secondary'"
        @click="ownedFilter = 'unowned'"
        >Unowned</BButton
      >
      <BButton
        :variant="ownedFilter === 'completed' ? 'primary' : 'secondary'"
        @click="ownedFilter = 'completed'"
        >Completed</BButton
      >
      <BButton
        :variant="ownedFilter === 'notcompleted' ? 'primary' : 'secondary'"
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
