<template>
  <img src="@/assets/logo.svg" class="logo" />
  <button @click="increment" class="mybutton">{{ count }} click</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value += 1;
    };
    return { count, increment };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  background: $my-color;
}
#app {
  display: flex;
  flex-direction: column;
  margin: 100px;
}
</style>

<style lang="scss" scoped>
.logo {
  display: block;
  margin: auto;
  margin-bottom: 60px;
}
.mybutton {
  width: 200px;
  height: 40px;
  margin: auto;
}
</style>
