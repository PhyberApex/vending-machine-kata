<template>
  <vending-machine-display />
  <inser-coin-button :coin="{ name: 'dime' }" />
  <inser-coin-button :coin="{ name: 'nickel' }" />
  <inser-coin-button :coin="{ name: 'quarter' }" />
  <inser-coin-button :coin="{ name: 'penny' }" />
  <br />
  <product-button
    v-for="product in products"
    :key="product.id"
    :product="product"
  />
  <br />
  <return-coins-button />
  <br />
  RETURN: {{ coinReturn }}
  <br />
  <button type="button" @click="takeReturn">TAKE IT</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VendingMachineDisplay from "./VendingMachineDisplay.vue";
import InserCoinButton from "./InserCoinButton.vue";
import ProductButton from "./ProductButton.vue";
import useState from "../composables/useState";
import ReturnCoinsButton from "./ReturnCoinsButton.vue";

export default defineComponent({
  components: {
    VendingMachineDisplay,
    InserCoinButton,
    ProductButton,
    ReturnCoinsButton,
  },
  setup() {
    const { products, coinReturn, takeReturn } = useState();
    return { products, coinReturn, takeReturn };
  },
});
</script>
