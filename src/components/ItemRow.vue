<script setup>
import {  ref, toValue , inject} from "vue";
import Item from "./Item.vue";
import NewItemForm from "./NewItemForm.vue";
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const editMode = inject("editMode");
const items = defineModel({
  type: Array,
  required: true,
});
const newItemPopup = ref(false)
const newItem = ref({
    image: "",
    name: "",
    count: 1,
  });
const onCreateNewItem = (item) => {
  items.value.push(toValue(item));
  newItem.value = {
    image: "",
    name: "",
    count: 1,
  };
  newItemPopup.value = false;
};
</script>
<template>
  <div class="flex-grow-1 d-flex flex-row flex-nowrap justify-content-around">
    <div
      class="d-flex flex-column align-items-center me-1"
      v-for="(item, index) in items"
      :key="index"
    >
      <Item v-model="items[index]" :data="data[index]" />
    </div>
    <div v-if="editMode" class="d-flex flex-column align-items-center me-1" role="button" @click="newItemPopup = true">
      <div
        class="d-flex flex-column align-items-center border border-secondary rounded p-2 px-3 fs-2 text-secondary"
      >
      <span>
        +
      </span>
      </div>
      <span>Add item</span>
    </div>
  </div>
  <NewItemForm
    v-model:new-item="newItem"
    v-model:shown="newItemPopup"
    :data="data"
    @ok="onCreateNewItem"
    @close="newItemPopup = false"
  />
</template>
