<script lang="ts">
  let count: number = 0;

  function handleClick(a: string) {
    count += a;
  }
</script>

<style lang="scss" global>
  @import "bootstrap/scss/bootstrap";
</style>

<template>
  <p>Hello World!</p>
  <input type="text" value={count} />
  <button on:click={() => handleClick(10)}>+</button>
</template>
