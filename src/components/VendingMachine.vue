<template>
  <vending-machine-display />
  <inser-coin-button :amount="0.5" />
  <inser-coin-button :amount="1.0" />
  <product-button
    v-for="product in products"
    :key="product.id"
    :product="product"
  />
  RETURN: {{ coinReturn }}
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VendingMachineDisplay from "./VendingMachineDisplay.vue";
import InserCoinButton from "./InserCoinButton.vue";
import ProductButton from "./ProductButton.vue";
import useState from "@/composables/useState";

export default defineComponent({
  components: { VendingMachineDisplay, InserCoinButton, ProductButton },
  setup() {
    const { products, coinReturn } = useState();
    return { products, coinReturn };
  },
});
</script>
