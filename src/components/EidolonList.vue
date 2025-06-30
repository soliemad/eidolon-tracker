<script setup>
import { computed, reactive, ref, toValue } from "vue";
import { useEidolonTools } from "@/composables/useEidolonTools";
import { useLocalStorage } from "../composables/useLocalStorage";

const { isEidolonComplete } = useEidolonTools();

import rawEidolons from "../assets/eidolons.json";
import Eidolon from "./Eidolon.vue";
import EidolonListHeader from "./EidolonListHeader.vue";
import NewEidolon from "./NewEidolon.vue";
const eidolons = ref(rawEidolons);
const ownedFilter = ref("all");
const nameFilter = ref("");
const showAddEidolonModal = ref(false);
const filteredEidolons = computed(() => {
  const eidolonFilterMap = {};
  eidolons.value.forEach((eidolon, index) => {
    const { eidolonStorage } = useLocalStorage(eidolon);
    if (eidolonFilter(eidolon, eidolonStorage.value)) {
      eidolonFilterMap[index] = eidolon;
    }
  });
  return eidolonFilterMap;
});
const eidolonFilter = (eidolon, eidolonStorage) => {
  let isIncluded = true;
  if (nameFilter.value !== "") {
    isIncluded =
      eidolon.name.toLowerCase().includes(nameFilter.value.toLowerCase()) ||
      (eidolonStorage.nickname &&
        eidolonStorage.nickname
          ?.toLowerCase()
          .includes(nameFilter.value.toLowerCase()));
  }
  if (ownedFilter.value === "owned") {
    isIncluded = eidolonStorage.owned;
  } else if (ownedFilter.value === "unowned") {
    isIncluded = !eidolonStorage.owned;
  } else if (ownedFilter.value === "completed") {
    isIncluded = isEidolonComplete(eidolonStorage);
  } else if (ownedFilter.value === "notcompleted") {
    isIncluded = !isEidolonComplete(eidolonStorage);
  }
  return isIncluded;
};
const newEidolon = reactive({
  name: "",
  thumbnail: "",
  url: "",
  materials: [],
  wishes: [],
});
const addNewEidolon = (value) => {
  eidolons.value.push({ ...value });
  clearNewEidolon();

  showAddEidolonModal.value = false;
};
const clearNewEidolon = () => {
  newEidolon.name = "";
  newEidolon.thumbnail = "";
  newEidolon.url = "";
  newEidolon.materials = [];
  newEidolon.wishes = [];
};
const cancelCreateEidelon = () => {
  clearNewEidolon();
  showAddEidolonModal.value = false;
};
</script>
<template>
  <EidolonListHeader
    v-model="ownedFilter"
    v-model:name-filter="nameFilter"
    :eidolons="eidolons"
    @add="() => (showAddEidolonModal = true)"
  ></EidolonListHeader>
  <BAccordion free lazy>
    <template
      v-for="(eidolon, index) in filteredEidolons"
      :key="eidolons[index].name"
    >
      <Eidolon :eidolon-data="eidolons[index]" />
    </template>
  </BAccordion>
  <NewEidolon
    v-model:shown="showAddEidolonModal"
    v-model="newEidolon"
    @ok="addNewEidolon"
    @close="cancelCreateEidelon"
  ></NewEidolon>
</template>
<style></style>
