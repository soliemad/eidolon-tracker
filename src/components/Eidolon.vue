<script setup>
import ItemList from "./ItemList.vue";
import { useLocalStorage } from "../composables/useLocalStorage";
import { useEidolonTools } from "@/composables/useEidolonTools";
import StarLevel from "./StarLevel.vue";
import { computed } from "vue";
const { isEidolonComplete } = useEidolonTools();
const eidolon = defineModel({
  type: Object,
  required: true,
});
useLocalStorage(`eidolon-data-${eidolon.value.name}`, eidolon);
const eidolonCompleted = computed(() => {
  return isEidolonComplete(eidolon.value);
});
</script>
<template>
  <BAccordionItem class="eidolon">
    <template #title>
      <div
        class="d-flex flex-grow-1 me-5 justify-content-between align-items-center"
      >
        <div class="eidolon-name fs-2 flex-grow-1">
          <a :href="eidolon.url" target="_blank" rel="noopener noreferrer">
            <img :src="eidolon.thumbnail" alt="Serif" />
          </a>
          {{ eidolon.name }}
        </div>
        <StarLevel :eidolon="eidolon" class="me-5" />
        <div style="min-width: 80px; width: 80px; text-align: center" class="d-flex flex-column me-2" @click="(event) => event.stopPropagation()">
          <label :for="`owned-chk-${eidolon.name}`" role="button"> Owned:   </label>
          <BFormCheckbox :id="`owned-chk-${eidolon.name}`" v-model="eidolon.owned" type="checkbox"  />
        </div>
        <div style="min-width: 80px; width: 80px; text-align: center" class="d-flex flex-column">
          <label :for="`completed-chk-${eidolon.name}`" role="button"> Completed: </label>
          <BFormCheckbox :id="`completed-chk-${eidolon.name}`" v-model="eidolonCompleted" type="checkbox" disabled />
        </div>
      </div>
    </template>
    <div class="">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <BFormGroup label="Eidolon Symbol" class="d-flex flex-row" >
          <BFormInput
            type="number"
            min="100"
            max="140"
            step="1"
            title="Symbol % (100 - 140)"
            v-model="eidolon.symbol"
          />
        </BFormGroup>
      </div>
    </div>
    <div class="d-flex flex-row align-items-start justify-content-around">
      <ItemList header="Eidolon Wishes" v-model="eidolon.wishes" />
      <ItemList header="Evolution Materials" v-model="eidolon.materials" />
    </div>
  </BAccordionItem>
</template>
