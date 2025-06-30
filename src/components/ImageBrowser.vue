<script setup>
import { ref } from "vue";
const model = defineModel({
  type: String,
  required: true,
});
const props = defineProps({
  lg: {
    type: Boolean,
    default: false,
  },
});
const fileInput = ref(null);

function openFileDialog() {
  fileInput.value.click();
}

function onFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    model.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
</script>
<template>
  <div
    :class="[
      'main-container fs-4 border rounded me-2 text-center text-secondary',
      { lg: lg },
    ]"
    @click="openFileDialog"
    width="50px"
  >
    <template v-if="!model">
      <font-awesome-icon :icon="['fas', 'image']" role="button" />
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="onFileChange"
      />
    </template>
    <template v-else>
      <img
        :src="model"
        :class="{ lg: lg }"
        class="rounded"
        @click="openFileDialog"
      />
    </template>
  </div>
</template>
<style scoped>
.main-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.lg {
  width: 64px;
  height: 64px;
}
</style>
