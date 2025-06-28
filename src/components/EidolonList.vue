<script setup>
import { computed, ref } from "vue";
import { useEidolonTools } from "@/composables/useEidolonTools";
const { isEidolonComplete } = useEidolonTools();

import rawEidolons from "../assets/eidolons.json";
import Eidolon from "./Eidolon.vue";
import EidolonListHeader from "./EidolonListHeader.vue";
const eidolons = ref(rawEidolons);
const ownedFilter = ref("all");
const nameFilter = ref("");
const filteredEidolons = () => {
  if (ownedFilter.value === "all") {
    return eidolons.value;
  }
  return eidolons.value.filter(eidolonFilter);
};
const eidolonFilter = (eidolon) => {
  if (ownedFilter.value === "owned") {
    return eidolon.owned;
  } else if (ownedFilter.value === "unowned") {
    return !eidolon.owned;
  } else if (ownedFilter.value === "completed") {
    return isEidolonComplete(eidolon);
  } else if (ownedFilter.value === "notcompleted") {
    return !isEidolonComplete(eidolon);
  }
  if (nameFilter.value !== "") {
    return eidolon.name.toLowerCase().includes(nameFilter.value.toLowerCase());
  }
  return true;
};
</script>
<template>
  <EidolonListHeader
    v-model="ownedFilter"
    v-model:name-filter="nameFilter"
    :eidolons="eidolons"
  ></EidolonListHeader>
  <BAccordion free lazy>

    <template  v-for="(eidolon, index) in filteredEidolons()">
      <Eidolon v-if="eidolonFilter(eidolon)" v-model="eidolons[index]" />
    </template>
  </BAccordion>

</template>
<style></style>
