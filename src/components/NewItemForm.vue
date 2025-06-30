<script setup>
const shown = defineModel("shown", {
  type: Boolean,
  default: false,
});
const newItem = defineModel("newItem", {
  type: Object,
  default: () => ({
    image: "",
    name: "",
    count: 1,
  }),
});
const emit = defineEmits(["ok", "close"]);
</script>
<template>
  <BForm @submit.prevent>
    <BModal
      class="mb-3"
      v-model="shown"
      size="sm"
      centered
      variant="primary"
      key="new-item"
      data-bs-theme="dark"
      @ok="emit('ok', newItem)"
      @close="emit('close')"
    >
      <template #title>
        <h1 class="text-center text-primary">New Item</h1>
      </template>
      <div class="d-flex flex-column align-items-center">
        <ImageBrowser lg class="mb-3" v-model="newItem.thumbnail" />
        <BFormGroup class="mb-3">
          <BFormInput
            type="text"
            v-model="newItem.name"
            placeholder="Enter item name"
            required
          />
        </BFormGroup>
        <BFormGroup class="mb-3">
          <BFormInput
            type="number"
            v-model="newItem.count"
            min="1"
            placeholder="Enter item count"
            required
          />
        </BFormGroup>
      </div>
    </BModal>
  </BForm>
</template>
