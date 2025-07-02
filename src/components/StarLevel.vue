<script setup>
import { computed } from "vue";
import {useEidolonTools} from "@/composables/useEidolonTools";
const { getEidolonStarLevel } = useEidolonTools();

const props = defineProps({
  eidolon: {
    type: Object,
    required: true,
  },
});

const starLevel = computed(() => {
  return getEidolonStarLevel(props.eidolon);
});
</script>
<template>
  <div class="eidolon-star">
    <div style="min-width: 70px; text-align: center">
      <img
        :src="`image/stars/${starLevel}.png`"
        :alt="`${starLevel + 1} star(s)`"
        style="
          vertical-align: middle;
          width: 50px;
          height: 50px;
          margin-top: 4px;
        "
      />
    </div>
  </div>
</template>
