<template>
  <div class="designer-container">
    <leftPanel class="designer-container__left_body"></leftPanel>
    <div class="designer-container__body">
      <topbar-panel class="designer-container__header_body" ref="topbarRef" :flowRef="flowRef" v-model="workflowData"></topbar-panel>
      <flowContainer :topbarRef="topbarRef" ref="flowRef" :designer="designer" v-model="workflowData"></flowContainer>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,defineOptions
  } from 'vue'
  import leftPanel from './left-panel/index.vue'
  import flowContainer from './flow-container/index.vue'
  import topbarPanel from './topbar-panel/index.vue'
  
  defineOptions({
    name:"workFlowDesigner"
  })
  
  const workflowData = ref([])
  const designer = ref({})
  const flowRef = ref({})
  const topbarRef = ref({})
</script>

<style lang="scss" scoped>
  .designer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    
    .designer-container__left_body{
      border-right: 1px solid var(--border-color);
      max-width: 260px;
      width: 260px;
      min-width: 260px;
      background-color: var(--bg-color);
    }
    .designer-container__header_body{
      /* box-shadow: 3px 7px 9px 0px rgba(0, 0, 0, 0.12); */
      border-bottom: 1px solid var(--border-color);
      position: relative;
      z-index: 1000;
      width: calc(100% + 1px);
      left: -1px;
      background:var(--bg-color);
    }

    .designer-container__body {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }
  }
</style>