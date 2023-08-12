<template>
  <div class="collapse-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, watch, provide } from 'vue'

  
  const props = defineProps({
    activeNames:Array
  })
  
  const modelValue = ref<string[]>([])
  
  watch(()=>props.activeNames,(newVal)=>{
    modelValue.value = newVal
  },{
    immediate:true
  })
  
  provide('activeNames',modelValue)
  
</script>

<style lang="scss">
  .collapse-container{
    user-select: none;
  }
</style>