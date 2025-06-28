<script setup>
import Item from "./Item.vue";
const items = defineModel({
    type: Array,
    required: true,
})
</script>
<template>
  <div class="flex-grow-1 d-flex flex-row flex-nowrap justify-content-around">
    <div class="d-flex flex-column align-items-center me-1" v-for="(item, index) in items">
      <Item v-model="items[index]"/>
    </div>
  </div>
</template>
