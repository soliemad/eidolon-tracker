<script setup>

const item = defineModel({
  required: true,
  type: Object,
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
        <img
          width="50px"
          :src="item.thumbnail"
          :class="[
            {
              'border border-3 border-success': item.selected,
            },
          ]"
        />
        <span class="item-count position-absolute bottom-0 start-90">{{
          item.count
        }}</span>
      </div>
    </BButton>
    <span class="item-name text-wrap text-center">{{ item.name }}</span>
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
