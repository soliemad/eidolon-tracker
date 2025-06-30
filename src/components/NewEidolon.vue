<script setup>
import { reactive, provide } from "vue";
import EidolonHeader from "./EidolonHeader.vue";
import EidolonBody from "./EidolonBody.vue";
provide("editMode", true); // Always in edit mode for new eidolon
const props = defineProps({});
const shown = defineModel("shown", {
  type: Boolean,
  default: false,
});
const newEidolon = defineModel({
  type: Object,
  required: true,
  default: {
    name: "",
    thumbnail: "",
    url: "",
    materials: [],
    wishes: [],
  },
});
const emit = defineEmits(["ok", "close"]);
</script>
<template>
  <BModal
    class="mb-3"
    v-model="shown"
    size="xl"
    centered
    variant="primary"
    key="new-eidolon"
    data-bs-theme="dark"
    @ok="$emit('ok', newEidolon)"
    @close="$emit('close')"
  >
    <template #title>
      <EidolonHeader :data="newEidolon" v-model="newEidolon" edit-mode />
    </template>
    <EidolonBody :eidolon="newEidolon" v-model="newEidolon" edit-mode />
  </BModal>
</template>
