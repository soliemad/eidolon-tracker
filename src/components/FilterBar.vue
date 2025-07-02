<script setup>
import StarLevel from "./StarLevel.vue";
const ownedFilter = defineModel({
  type: String,
  required: true,
  default: "all",
});
const nameFilter = defineModel("name-filter", {
  type: String,
  required: true,
});
const starLevelFilter = defineModel("star-level-filter", {
  type: Number,
  required: true,
  default: 0,
});
</script>
<template>
  <BFormInput
    type="text"
    id="search"
    placeholder="Search Eidolons by name..."
    v-model="nameFilter"
    lazy
  />

  <div class="filters d-flex flex-row flex-nowrap justify-content-around mt-2">
    <BButton
      :variant="ownedFilter === 'all' ? 'primary' : 'outline-primary'"
      @click="ownedFilter = 'all'"
      >All</BButton
    >
    <BButton
      :variant="ownedFilter === 'unowned' ? 'primary' : 'outline-primary'"
      @click="ownedFilter = 'unowned'"
      >Unowned</BButton
    >
    <BButton
      :variant="ownedFilter === 'owned' ? 'primary' : 'outline-primary'"
      @click="ownedFilter = 'owned'"
      >Owned</BButton
    >

    <BButton
      :variant="ownedFilter === 'wishCompleted' ? 'primary' : 'outline-primary'"
      @click="ownedFilter = 'wishCompleted'"
      >Wishes Completed</BButton
    >
    <BDropdown
      :variant="starLevelFilter !== 0 ? 'primary' : 'outline-primary'"
      :text="
        starLevelFilter !== 0 ? `${starLevelFilter}-Star` : 'All star Levels'
      "
    >
      <template #button-content>
        <img
          v-if="starLevelFilter !== 0"
          class="me-2"
          :src="`/image/stars/${starLevelFilter}.png`"
          width="24"
          height="24"
        />
        <span v-if="starLevelFilter !== 0">{{ starLevelFilter }}-Star</span>
        <span v-else>All star Levels</span>
      </template>
      <BDropdownItem @click="starLevelFilter = 0">All</BDropdownItem>
      <BDropdownItem @click="starLevelFilter = 1">
        <img src="/image/stars/1.png" width="24" height="24" /> 1-Star
      </BDropdownItem>
      <BDropdownItem @click="starLevelFilter = 2">
        <img src="/image/stars/2.png" width="24" height="24" /> 2-Star
      </BDropdownItem>
      <BDropdownItem @click="starLevelFilter = 3">
        <img src="/image/stars/3.png" width="24" height="24" /> 3-Star
      </BDropdownItem>
      <BDropdownItem @click="starLevelFilter = 4">
        <img src="/image/stars/4.png" width="24" height="24" /> 4-Star
      </BDropdownItem>
    </BDropdown>
    <BButton
      :variant="ownedFilter === 'completed' ? 'primary' : 'outline-primary'"
      @click="ownedFilter = 'completed'"
      >Completed</BButton
    >
    <BButton
      :variant="ownedFilter === 'notcompleted' ? 'primary' : 'outline-primary'"
      @click="ownedFilter = 'notcompleted'"
      >Not Completed</BButton
    >
  </div>
</template>
