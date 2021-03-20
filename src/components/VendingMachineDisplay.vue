<template>
  <h1>{{ displayMessage }}</h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useState from "../composables/useState";

export default defineComponent({
  setup() {
    const { displayMessage } = useState();
    return { displayMessage };
  },
});
</script>
