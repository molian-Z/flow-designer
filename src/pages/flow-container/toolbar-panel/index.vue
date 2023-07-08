<template>
  <popover :visualRef="visualRef" :vueFlowRef="vueFlowRef" v-model="isPopover">
    <div class="toolbar-container" :class="[toolbarConfig.sort]">
      <template v-for="comp in components" :key="comp.name">
        <div class="toolbar-item" :class="[comp.split && 'split']" v-if="showComp(comp)">
          <component :is="comp" :vueFlowRef="vueFlowRef" :currentNode="currentNode"></component>
        </div>
      </template>
    </div>
  </popover>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import components, { toolbarConfig } from './components/index'
  import { getParentNodes } from '@/utils/util'

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
  const isPopover = ref<boolean>(false)
  const { edgeClick, nodeClick } = vueFlowRef._object.hooks
  const currentNode = ref<any>(null)
  const visualType = ref<'node' | 'edge'>('node')
  edgeClick.on((data : any) => {
    visualType.value = 'edge'
    setVisualRef(data)
  })
  nodeClick.on((data : any) => {
    visualType.value = 'node'
    setVisualRef(data)
  })
  const setVisualRef = function (data : any) {
    const selectedDoms = ['vue-flow__node','vue-flow__edge']
    const selectedDom = getParentNodes(data.event.target,selectedDoms)
    if (selectedDom) {
      currentNode.value = data
      if (visualRef.value === selectedDom && isPopover.value) {
        isPopover.value = false
      } else {
        visualRef.value = selectedDom
        isPopover.value = true
      }
    }
  }
  
  const showComp = function(comp:any){
    return comp.types.indexOf(visualType.value) > -1
  }
</script>

<style lang="scss">
  .toolbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.toolbar-item {
      position: relative;

      >*:not(.popover-container) {
        padding: 10px 10px;
        min-width: 36px;
        text-align: center;
        transition: var(--transition);
        cursor: pointer;

        &:hover {
          background-color: var(--bg-color-page);
        }

        &.is-active {
          background-color: var(--bg-color-page);
        }
      }

    }

    &.asc {
      >.toolbar-item.split::after {
        content: " ";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        height: calc(100% - 20px);
        background-color: var(--border-color);
        margin: 10px 0;
      }
    }

    &.desc {
      >.toolbar-item.split::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        height: calc(100% - 20px);
        background-color: var(--border-color);
        margin: 10px 0;
      }
    }
  }
</style>