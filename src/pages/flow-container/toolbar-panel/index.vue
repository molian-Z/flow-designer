<template>
  <popover :visualRef="visualRef" :vueFlowRef="vueFlowRef" v-model="isPopover">
    <div class="toolbar-container">
      <template v-for="comp in components" :key="comp.name">
        <component :is="comp" :vueFlowRef="vueFlowRef"></component>
      </template>
    </div>
  </popover>
</template>

<script setup lang="ts">
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
  
  const vueFlowRef = inject<any>('vueFlow')
  const visualRef = ref<any>(null)
  const isPopover = ref<Boolean>(false)
  const { edgeClick, nodeClick } = vueFlowRef._object.hooks
  edgeClick.on((data:any)=>{
    setVisualRef(data)
  })
  nodeClick.on((data:any)=>{
    setVisualRef(data)
  })
  const setVisualRef = function(data:any){
    if(visualRef.value === data.event.target && isPopover.value){
      isPopover.value = false
    }else{
      visualRef.value = data.event.target
      isPopover.value = true
    }
  }
</script>

<style lang="scss">
  .toolbar-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    >*{
      padding: 10px 10px;
      transition: var(--transition);
      &:hover{
        background-color: var(--bg-color-page);
      }
    }
  }
</style>