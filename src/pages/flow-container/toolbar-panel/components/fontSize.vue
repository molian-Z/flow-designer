<template>
  <div ref="visualRef" class="font-size-container">
    <div class="font-size-input" @click="showPopover">{{fontSize}}px</div>
    <popover :insertBody="false" :visualRef="visualRef" :flowRef="flowRef" v-model="isPopover">
      <div>sadasdsad</div>
    </popover>
  </div>
</template>

<script setup>
  /* import popover from '@/components/popover/index.vue'
  import {defineOptions, defineProps,ref} from 'vue'
  defineOptions({
    name:'fontSize',
    index:0
  })
  
  defineProps({
    flowRef:{
      type:Object,
      default:function(){
        return {}
      }
    }
  })
  
  const visualRef = ref()
  const fontSize = ref(16)
  const isPopover = ref(false)
  
  const showPopover = function(){
    isPopover.value = !isPopover.value
  } */
</script>

<style scoped lang="scss">
  .font-size-container{
    .font-size-input{
      user-select: none;
      font-weight: 500;
    }
    .font-size-select{
      display: flex;
      position: absolute;
    }
  }
</style>