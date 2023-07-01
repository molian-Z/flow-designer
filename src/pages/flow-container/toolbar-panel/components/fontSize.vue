<template>
  <div ref="visualRef" class="font-size-container">
    <div class="font-size-input" @click="showPopover">{{fontSize}}px</div>
  </div>
  <popover :insertBody="false" :visualRef="visualRef" :vueFlowRef="vueFlowRef" v-model="isPopover">
    <div>sadasdsad</div>
  </popover>
</template>

<script setup>
  import popover from '@/components/popover/index.vue'
  import {defineOptions, defineProps,ref, watch} from 'vue'
  defineOptions({
    name:'fontSize',
    index:0
  })
  
  defineProps({
    vueFlowRef:{
      type:Object,
      default:function(){
        return {}
      }
    }
  })
  
  const visualRef = ref()
  const fontSize = ref(16)
  const isPopover = ref(false)
  
  watch(isPopover,(newVal)=>{
    console.log(newVal)
  })
  
  const showPopover = function(){
    isPopover.value = !isPopover.value
  }
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