<script setup>
import { computed, ref, useTemplateRef } from "vue";
import ItemGroup from "./ItemGroup.vue";
defineProps({
  header: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});
import { inject } from "vue";
const editMode = inject("editMode");
const itemGroups = defineModel({
  type: Array,
  required: true,
});
const allSelected = computed({
  get() {
    return itemGroups.value.every((itemGroup) =>
      itemGroup.items.every((item) => item.selected)
    );
  },
  set(value) {
    itemGroups.value.forEach((itemGroup) =>
      itemGroup.items.forEach((item) => (item.selected = value))
    );
  },
});
</script>
<template>
  <BCard body-class="p-0 ">
    <template #header>
      <div class="d-flex flex-row align-items-center">
        <div class="w-100 p-1 fs-4 text-center" variant="light">
          {{ header }}
        </div>
        <BFormCheckbox v-if="!editMode" v-model="allSelected" class="ms-3" />
      </div>
    </template>
    <div class="d-flex flex-column align-items-center">
      <div
        v-for="(itemGroup, index) in data"
        :key="itemGroup.level"
        :class="[
          'flex-grow-1 w-100 p-1',
          { 'border-bottom': index !== itemGroups.length - 1 || editMode },
        ]"
      >
        <ItemGroup v-model="itemGroups[index]" :data="data[index]" />
      </div>
      <div
        v-if="editMode"
        :class="[
          'flex-grow-1 w-100 p-1 py-3 fs-5 ',
        ]"
      >
        <div class="d-flex flex-row align-items-center justify-content-center  text-secondary" role="button" @click="itemGroups.push({ level: '', items: [] })">
          + Add Item Group
        </div>
      </div>
    </div>
  </BCard>
</template>
