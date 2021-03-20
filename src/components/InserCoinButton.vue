<template>
  <button @click="insertCoins(amount)" type="button">
    Insert {{ amount }}
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useState from "@/composables/useState";

export default defineComponent({
  props: {
    amount: { required: true, type: Number },
  },
  setup() {
    const { currentAmount, insertCoins } = useState();
    return { currentAmount, insertCoins };
  },
});
</script>
