<template>
  <button @click="buyProduct(product.id)" type="button">
    {{ product.name }} - ${{ product.price }} ({{ product.stock }})
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useState from "../composables/useState";

export default defineComponent({
  props: {
    product: { required: true, type: Object },
  },
  setup() {
    const { buyProduct } = useState();
    return { buyProduct };
  },
});
</script>
