<template>
  <button @click="insertCoins(coin)" type="button">
    Insert {{ coin.name }}
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useState from "../composables/useState";

export default defineComponent({
  props: {
    coin: { required: true, type: Object },
  },
  setup() {
    const { currentAmount, insertCoins } = useState();
    return { currentAmount, insertCoins };
  },
});
</script>
