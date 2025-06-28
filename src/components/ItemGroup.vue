<script setup>
import { computed } from "vue";
import ItemRow from "./ItemRow.vue";
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
}
defineExpose({ selectAll });
</script>
<template>
  <div class="d-flex flex-row align-items-center">
    <div class="ps-3 text-center">
      {{ itemGroup.level
      }}<BFormCheckbox type="checkbox" v-model="allSelected" />
    </div>
    <ItemRow
      v-model="itemGroup.items"
      :onUpdateItemGroup="() => onUpdateItemGroup(itemGroup)"
    />
  </div>
</template>
