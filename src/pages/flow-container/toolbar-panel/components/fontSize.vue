<template>
  <div class="font-size-container">
    <div class="font-size-input">{{fontSize}}</div>
    <div class="font-size-select">
      
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import {defineOptions,ref} from 'vue'
  defineOptions({
    name:'fontSize',
    index:0
  })
  const fontSize = ref(16)
</script>

<style scoped lang="scss">
  .font-size-container{
    .font-size-input{
      cursor: e-resize;
      user-select: none;
      font-weight: 500;
    }
    .font-size-select{
      
    }
  }
</style>