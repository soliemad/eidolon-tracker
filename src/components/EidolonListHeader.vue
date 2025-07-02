<script setup>
import { computed } from "vue";
import { useEidolonTools } from "@/composables/useEidolonTools";
import { useLocalStorage } from "../composables/useLocalStorage";
import FilterBar from "./FilterBar.vue";
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
const starLevelFilter = defineModel("star-level-filter", {
  type: Number,
  required: true,
  default: 0,
});

const ownedCount = computed(() => {
  return props.eidolons.filter((eidolon) => {
    const { eidolonStorage } = useLocalStorage(eidolon);

    return eidolonStorage.value.owned;
  }).length;
});
const completedCount = computed(() => {
  return props.eidolons.filter((eidolon) => {
    const { eidolonStorage } = useLocalStorage(eidolon);

    return isEidolonComplete(eidolonStorage.value);
  }).length;
});
</script>
<template>
  <BCard class="mb-3">
    <template #header>
      <div class="d-flex flex-row align-items-center">
        <div style="min-width: 130px"></div>
        <h1 class="text-center flex-grow-1 text-primary">
          Aura Kingdom Eidolon Tracker
        </h1>
        <BButton variant="primary" @click="$emit('add')">
          <font-awesome-icon :icon="['fas', 'gear']" />
        </BButton>
      </div>
    </template>

    <FilterBar v-model="ownedFilter" v-model:name-filter="nameFilter" v-model:star-level-filter="starLevelFilter"/>

    <div class="d-flex flex-row flex-nowrap justify-content-around fs-5">
      <span> Eidolons Owned: {{ ownedCount }} / {{ eidolons.length }} </span>
      <span> Completed: {{ completedCount }} / {{ eidolons.length }} </span>
    </div>
  </BCard>
</template>
