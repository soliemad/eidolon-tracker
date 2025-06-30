<script setup>
import ItemList from "./ItemList.vue";
import { inject } from "vue";
const props = defineProps({
  eidolon: {
    type: Object,
    required: true,
  }
});
const editMode = inject("editMode");
const eidolonStorage = defineModel({
  type: Object,
  required: true,
})
</script>
<template>
  <div>
    <div v-if="!editMode" class="d-flex flex-column align-items-center justify-content-center">
      <BFormGroup label="Eidolon Symbol" class="d-flex flex-row">
        <BFormInput
          type="number"
          min="100"
          max="140"
          step="1"
          title="Symbol % (100 - 140)"
          v-model="eidolonStorage.symbol"
        />
      </BFormGroup>
    </div>
  </div>
  <div class="d-flex flex-row align-items-start justify-content-around">
    <ItemList
      header="Eidolon Wishes"
      v-model="eidolonStorage.wishes"
      :data="eidolon.wishes"
    />
    <ItemList
      header="Evolution Materials"
      v-model="eidolonStorage.materials"
      :data="eidolon.materials"
    />
  </div>
</template>
