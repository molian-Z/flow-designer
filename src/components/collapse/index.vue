<template>
  <div ref="collapse" class="collapse-container">
    <slot></slot>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const collapse = ref([])
</script>

<style lang="scss">
  .collapse-container{
    
  }
</style>