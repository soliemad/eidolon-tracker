<script setup>
import { computed } from "vue";
import ItemRow from "./ItemRow.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
import { inject } from "vue";
const editMode = inject("editMode");
const itemGroup = defineModel({
  type: Object,
  required: true,
});
const allSelected = computed({
  get() {
    return itemGroup.value.items.every((item) => item.selected);
  },
  set(value) {
    itemGroup.value.items.forEach((item) => (item.selected = value));
    emit("on-all-selected", value);
  },
});
const emit = defineEmits(["on-all-selected"]);
const selectAll = () => {
  allSelected.value = true;
};
defineExpose({ selectAll });
</script>
<template>
  <div class="d-flex flex-row align-items-center">
    <div v-if="editMode" class="text-input ps-3 me-2 text-center d-flex flex-column">
      <BFormInput lazy v-model="data.level" placeholder="level" size="sm"  />
    </div>
    <div v-else class="ps-3 text-center">
      {{ data.level }}
      <BFormCheckbox v-if="!editMode" type="checkbox" v-model="allSelected" />
    </div>
    <div class="flex-grow-1">
      <ItemRow
        v-model="itemGroup.items"
        :data="data.items"
      />
    </div>
  </div>
</template>
<style scoped>
.text-input {
  width: 80px;
}
</style>
