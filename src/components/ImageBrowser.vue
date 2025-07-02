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
const isDragging = ref(false);

function openFileDialog() {
  fileInput.value.click();
}

function onFileChange(event) {
  handleFile(event.target.files[0]);
}

function onDrop(event) {
  isDragging.value = false;
  handleFile(event.dataTransfer.files[0]);
}

function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) return;
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
      { lg: lg, dragging: isDragging },
    ]"
    @click="openFileDialog"
    @dragenter.prevent.stop="isDragging = true"
    @dragover.prevent.stop
    @dragleave.prevent.stop="isDragging = false"
    @drop.prevent.stop="onDrop"
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
  transition: border-color 0.2s;
}
.dragging {
  box-shadow: 0 0 10px 5px var(--bs-primary);
  transition: box-shadow 0.2s ease;
}
.dragging * {
  pointer-events: none;
}
.lg {
  width: 64px;
  height: 64px;
}
</style>
