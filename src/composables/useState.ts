import { reactive, toRefs, computed } from "vue";

const state = reactive({
  currentAmount: 0,
  coinReturn: 0,
  soldOutError: false,
  priceError: false as boolean | number,
  products: [
    {
      id: "1",
      name: "Cola",
      price: 1.0,
      stock: 20,
    },
    {
      id: "2",
      name: "Chips",
      price: 0.5,
      stock: 1,
    },
    {
      id: "3",
      name: "Candy",
      price: 0.65,
      stock: 1,
    },
  ],
});

const insertCoins = (value: number) => {
  state.currentAmount += value;
};

const buyProduct = (id: string) => {
  const foundProduct = state.products.find((p) => p.id === id);
  if (!foundProduct) return;
  if (foundProduct.price > state.currentAmount) {
    state.priceError = foundProduct.price;
    return;
  }
  if (foundProduct.stock <= 0) {
    state.soldOutError = true;
    return;
  }
  state.coinReturn = state.currentAmount - foundProduct.price;
  state.currentAmount = 0;
  foundProduct.stock--;
};

const displayMessage = computed(() => {
  if (state.soldOutError) {
    setTimeout(() => {
      state.soldOutError = false;
    }, 2000);
    return "SOLD OUT";
  }
  if (state.priceError) {
    setTimeout(() => {
      state.priceError = false;
    }, 2000);
    return `PRICE $${state.priceError}`;
  }
  if (state.currentAmount === 0) return "INSERT COIN";
  return `$${state.currentAmount}`;
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  return { ...toRefs(state), insertCoins, buyProduct, displayMessage };
};
