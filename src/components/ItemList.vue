<script setup>
import { useTemplateRef } from "vue";
import ItemGroup from "./ItemGroup.vue";
defineProps({
  header: {
    type: String,
    required: true,
  },
});
const itemGroups = defineModel({
   type: Array,
    required: true,
})

</script>
<template>
  <BCard body-class="p-0 ">
    <template #header>
      <div class="w-100 p-1 fs-4 text-center" variant="light">{{ header }}</div>
    </template>
    <div class="d-flex flex-column align-items-center">
      <div
      v-for="(itemGroup, index) in itemGroups"
      :class="['flex-grow-1 w-100 p-1', {'border-bottom' : index !== itemGroups.length - 1}]"
      >
        <ItemGroup v-model="itemGroups[index]"/>
      </div>
    </div>
  </BCard>
</template>