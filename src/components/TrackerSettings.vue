<script setup>
defineEmits(["add", "export", "import"]);
const model = defineModel({
  type: Boolean,
  required: true,
});
</script>
<template>
  <BModal v-model="model" title="Settings" hide-footer>
    <div class="d-grid gap-2">
      <BButton variant="primary" @click="$emit('add')">
        <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />
        Add New Eidolon
      </BButton>
      <BButton variant="success" @click="$emit('export')">
        <font-awesome-icon :icon="['fas', 'file-export']" class="me-2" />
        Export to JSON
      </BButton>
      <BButton variant="info" @click="$emit('import')">
        <font-awesome-icon :icon="['fas', 'file-import']" class="me-2" />
        Import Data
      </BButton>
    </div>
  </BModal>
</template>
