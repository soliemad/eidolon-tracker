<script setup>
import { useEidolonTools } from "@/composables/useEidolonTools";
import StarLevel from "./StarLevel.vue";
import { computed, ref, inject } from "vue";
import ImageBrowser from "./ImageBrowser.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const editMode = inject("editMode");
const eidolon = defineModel({
  type: Object,
  required: true,
});
const idEditingName = ref(false);

const editName = (event) => {
  idEditingName.value = true;
  event.stopPropagation();
};
const { isEidolonComplete } = useEidolonTools();

const eidolonCompleted = computed(() => {
  return isEidolonComplete(eidolon.value);
});
</script>
<template>
  <div
    class="d-flex flex-grow-1 me-5 justify-content-between align-items-center"
  >
    <div class="eidolon-name d-flex flex-row flex-grow-1">
        <ImageBrowser
          v-if="editMode"
          v-model="eidolon.thumbnail"
          lg
        />
        
      <a  v-else :href="data.url" target="_blank" rel="noopener noreferrer">
        <img  :src="data.thumbnail" />
      </a>
      <BFormInput
        v-if="editMode"
        class="ms-2 fs-2"
        type="text"
        v-model="eidolon.name"
        :placeholder="data.name || 'Eidolon Name'"
        @click="(event) => event.stopPropagation()"
      />
      <BFormInput
        v-else-if="idEditingName"
        class="ms-2 fs-2"
        type="text"
        v-model="eidolon.nickname"
        @blur="idEditingName = false"
        :placeholder="data.name || 'Eidolon Name'"
        @click="(event) => event.stopPropagation()"
      />
      <div v-else class="d-flex flex-row align-items-center ms-2">
        <span class="fs-2">{{ eidolon.nickname || data.name }}</span>
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          class="ms-2"
          @click="editName"
          role="button"
        />
      </div>
    </div>
    <StarLevel v-if="!editMode" :eidolon="eidolon" class="me-5" />
    <div
      v-if="!editMode"
      style="min-width: 80px; width: 80px; text-align: center"
      class="d-flex flex-column me-2"
      @click="(event) => event.stopPropagation()"
    >
      <label :for="`owned-chk-${data.name}`" role="button"> Owned: </label>
      <BFormCheckbox
        :id="`owned-chk-${data.name}`"
        v-model="eidolon.owned"
        type="checkbox"
      />
    </div>
    <div
      v-if="!editMode"
      style="min-width: 80px; width: 80px; text-align: center"
      class="d-flex flex-column"
    >
      <label :for="`completed-chk-${data.name}`" role="button">
        Completed:
      </label>
      <BFormCheckbox
        :id="`completed-chk-${data.name}`"
        v-model="eidolonCompleted"
        type="checkbox"
        disabled
      />
    </div>
  </div>
</template>
