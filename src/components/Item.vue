<script setup>
import ImageBrowser from "./ImageBrowser.vue";
const props = defineProps({
  eidolonData: {
    type: Object,
    required: true,
  },
});
import { computed, inject } from "vue";
import items from "../assets/items.json";
import itemsTW from "../assets/items-tw.json";
const editMode = inject("editMode");
const item = defineModel({
  type: Object,
  required: true,
});
const data = computed(() => {
  const itemData = items[props.eidolonData.id];
  if (!itemData) {
    const itemDataTW = itemsTW[props.eidolonData.id];
    if (itemDataTW) {
      return itemDataTW;
    } else {
      console.warn(new Error(`Item with id ${props.eidolonData.id} not found`));
      return {
        id: props.eidolonData.id,
        name: "Unknown Item",
      };
    }
  }
  return itemData;
});
const emit = defineEmits(["update:modelValue"]);
const toggleValue = () => {
  item.value.selected = !item.value.selected;
};
</script>
<template>
  <div class="d-flex flex-column">
    <BButton role="button" variant="link" @click="toggleValue">
      <div class="position-relative">
        <ImageBrowser v-if="editMode" v-model="data.thumbnail" />
        <img
          v-else
          width="50px"
          :src="`image/items/${data.id}.png`"
          :class="[
            {
              'border border-3 border-success': item.selected,
            },
          ]"
        />
        <span class="item-count position-absolute bottom-0 start-90">{{
          data.count
        }}</span>
      </div>
    </BButton>
    <span class="item-name text-wrap text-center">{{ data.name }}</span>
  </div>
</template>
<style scoped>
.item-name {
  max-width: 100px;
}
.item-count {
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 5;
}
</style>
