<template>
  <h1>
    {{ displayMessage }} {{ state.matches("active") }}
    {{ state.context.count }}
  </h1>
  <button type="button" @click="send('TOGGLE')">SEND IT</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useState, { useToggleMachine } from "../composables/useState";

export default defineComponent({
  setup() {
    const { displayMessage } = useState();
    const { state, send } = useToggleMachine();
    return { displayMessage, state, send };
  },
});
</script>
