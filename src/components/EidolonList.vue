<script setup>
import { computed, reactive, ref, toValue } from "vue";
import { useEidolonTools } from "@/composables/useEidolonTools";
import {
  useLocalStorage,
  exportSavedData,
  importSaveData,
} from "../composables/useLocalStorage";

const { isEidolonComplete, isEidolonMaterialComplete, isEidolonWishComplete, getEidolonStarLevel } = useEidolonTools();

import rawEidolons from "../assets/eidolons.json";
import Eidolon from "./Eidolon.vue";
import EidolonListHeader from "./EidolonListHeader.vue";
import NewEidolon from "./NewEidolon.vue";
import TrackerSettings from "./TrackerSettings.vue";
const eidolons = ref(rawEidolons);
const ownedFilter = ref("all");
const nameFilter = ref("");
const showAddEidolonModal = ref(false);
const showSettingsModal = ref(false);
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
  if (starLevelFilter.value > 0) {
    const starLevel = getEidolonStarLevel(eidolonStorage);
    isIncluded = isIncluded && starLevel == starLevelFilter.value;
  }
  if (ownedFilter.value === "owned") {
    isIncluded = isIncluded && eidolonStorage.owned;
  } else if (ownedFilter.value === "unowned") {
    isIncluded = isIncluded && !eidolonStorage.owned;
  } else if (ownedFilter.value === "completed") {
    isIncluded = isIncluded && isEidolonComplete(eidolonStorage);
  } else if (ownedFilter.value === "notcompleted") {
    isIncluded = isIncluded && !isEidolonComplete(eidolonStorage);
  } else if (ownedFilter.value === "wishCompleted") {
    isIncluded = isIncluded && isEidolonWishComplete(eidolonStorage);
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
const exportData = () => {
  const dataStr = exportSavedData();
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "eidolon_tracker_data.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
  showSettingsModal.value = false;
};

const importData = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const success = importSaveData(e.target.result);
      if (success) {
        // Reload the page to apply the imported data
        window.location.reload();
      }
    };
    reader.readAsText(file);
  };
  input.click();
  showSettingsModal.value = false;
};

const openAddEidolonModal = () => {
  showAddEidolonModal.value = true;
  showSettingsModal.value = false;
};
const starLevelFilter = ref(0);
</script>
<template>
  <EidolonListHeader
    v-model="ownedFilter"
    v-model:name-filter="nameFilter"
    v-model:star-level-filter="starLevelFilter"
    :eidolons="eidolons"
    @add="() => (showSettingsModal = true)"
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
  <TrackerSettings
    v-model="showSettingsModal"
    @add="openAddEidolonModal"
    @export="exportData"
    @import="importData"
  ></TrackerSettings>
</template>
<style></style>
