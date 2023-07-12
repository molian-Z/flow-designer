<template>
  <div ref="collapse" class="collapse-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const collapse = ref<any[]>([])
</script>

<style lang="scss">
  .collapse-container{
    user-select: none;
  }
</style>