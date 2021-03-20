import { reactive, toRefs, computed } from "vue";

const validCoins = Object.freeze([
  { name: "quarter", value: 0.25 },
  { name: "dime", value: 0.1 },
  { name: "nickel", value: 0.05 },
]);

const state = reactive({
  currentCoins: [] as Array<{ name: string }>,
  coinReturn: [] as Array<{ name: string }>,
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

const insertCoins = (insertedCoin: { name: string }) => {
  const foundValidCoin = validCoins.find(
    (coin) => coin.name.toLowerCase() === insertedCoin.name.toLowerCase()
  );
  if (!foundValidCoin) state.coinReturn.push(insertedCoin);
  else {
    state.currentCoins.push(insertedCoin);
  }
};

const currentAmount = computed(() => {
  return Number(
    state.currentCoins
      .map(
        (c) => validCoins.find((vc) => vc.name === c.name.toLowerCase())?.value
      )
      .reduce((sum = 0, value = 0) => sum + value, 0)
      ?.toFixed(2)
  );
});

const buyProduct = (id: string) => {
  const foundProduct = state.products.find((p) => p.id === id);
  if (!foundProduct) return;
  if (foundProduct.price > currentAmount.value) {
    state.priceError = foundProduct.price;
    return;
  }
  if (foundProduct.stock <= 0) {
    state.soldOutError = true;
    return;
  }
  let change = Number((currentAmount.value - foundProduct.price).toFixed(2));
  const validCoinsByValue = [...validCoins].sort((a, b) =>
    a.value > b.value ? -1 : 1
  );
  validCoinsByValue.forEach((coin) => {
    const amount = Math.floor(change / coin.value);
    change = Number((change - amount * coin.value).toFixed(2));
    for (let index = 0; index < amount; index++) {
      state.coinReturn.push(coin);
    }
  });
  // TODO add exchange
  state.currentCoins = [];
  foundProduct.stock--;
};

const returnCoins = () => {
  state.coinReturn.push(...state.currentCoins);
  state.currentCoins = [];
};

const takeReturn = () => {
  state.coinReturn = [];
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
  if (currentAmount.value === 0) return "INSERT COIN";
  return `$${currentAmount.value}`;
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  return {
    ...toRefs(state),
    insertCoins,
    buyProduct,
    displayMessage,
    currentAmount,
    returnCoins,
    takeReturn,
  };
};
