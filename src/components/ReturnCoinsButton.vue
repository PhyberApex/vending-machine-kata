<template>
  <button type="button" @click="returnCoins">C</button>
</template>
<script lang="ts">
import useState from "../composables/useState";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { returnCoins } = useState();
    return { returnCoins };
  },
});
</script>
