<template>
  <popover ref="popoverRef" :visualRef="visualRef" :flowRef="flowRef" v-model="isPopover">
    <template v-for="comp in components" :key="comp.name">
      <component :is="comp" :flowRef="flowRef"></component>
    </template>
  </popover>
</template>

<script setup>
  import popover from '@/components/popover/index.vue'
  import components from './components/index'

  import {
    defineOptions,
    ref,
    inject
  } from 'vue'

  defineOptions({
    name: 'toolbarPanel'
  })
  
  const flowRef = inject('vueFlow')
  const visualRef = ref(null)
  const isPopover = ref(false)
  const { edgeClick, nodeClick } = flowRef._object.hooks
  edgeClick.on((data)=>{
    setVisualRef(data)
  })
  nodeClick.on((data)=>{
    setVisualRef(data)
  })
  const setVisualRef = function(data){
    if(visualRef.value === data.event.target && isPopover.value){
      isPopover.value = false
    }else{
      visualRef.value = data.event.target
      isPopover.value = true
    }
  }
</script>

<style lang="scss" scoped>

</style>