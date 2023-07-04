<template>
  <popover :visualRef="visualRef" :vueFlowRef="vueFlowRef" v-model="isPopover">
    <div class="toolbar-container">
      <template v-for="comp in components" :key="comp.name">
        <div class="toolbar-item" :class="[comp.split && 'split']">
          <component :is="comp" :vueFlowRef="vueFlowRef" :currentNode="currentNode"></component>
        </div>
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
  const isPopover = ref<boolean>(false)
  const { edgeClick, nodeClick } = vueFlowRef._object.hooks
  const currentNode = ref<any>(null)
  edgeClick.on((data : any) => {
    setVisualRef(data)
  })
  nodeClick.on((data : any) => {
    setVisualRef(data)
  })
  const setVisualRef = function (data : any) {
    currentNode.value = data
    if (visualRef.value === data.event.target && isPopover.value) {
      isPopover.value = false
    } else {
      visualRef.value = data.event.target
      isPopover.value = true
    }
  }
</script>

<style lang="scss">
  .toolbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.toolbar-item {
      position: relative;

      >* {
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

      &.split::after {
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
  }
</style>