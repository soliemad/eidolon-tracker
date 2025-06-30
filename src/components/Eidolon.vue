<script setup>
import EidolonHeader from "./EidolonHeader.vue";
import { useLocalStorage } from "../composables/useLocalStorage";
import { useEidolonTools } from "@/composables/useEidolonTools";
import { ref, provide, computed } from "vue";
import EidolonBody from "./EidolonBody.vue";
const props = defineProps({
  eidolonData: {
    type: Object,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});
provide("editMode", props.editMode);
const eidolon = ref(props.eidolonData);
const { eidolonStorage } = useLocalStorage(props.eidolonData);
const isComplete = computed(() => {
  const { isEidolonComplete } = useEidolonTools();
  return isEidolonComplete(eidolonStorage.value);
});
</script>
<template>
  <BAccordionItem class="eidolon m-2 border rounded" :class="{ 'unowned': !eidolonStorage.owned, complete: isComplete }">
    <template #title>
      <EidolonHeader
        :data="eidolon"
        v-model="eidolonStorage"
      />
    </template>
    <EidolonBody
      :eidolon="eidolon"
      v-model="eidolonStorage"
    />
  </BAccordionItem>
</template>
<style scoped>
.unowned {
  opacity: 0.5;
}
.complete {
  box-shadow:  0 0 10px 5px var(--bs-primary);
}
.eidolon :deep(.accordion-button) {
  border-radius: var(--bs-accordion-inner-border-radius);
}
</style>
