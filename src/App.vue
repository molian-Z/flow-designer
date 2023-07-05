<script setup>
  import {
    ref,
    reactive,
    defineExpose
  } from 'vue'
  import workFlowDesginer from '@/pages/index.vue'

  const config = reactive({})
  const flowList = reactive([])
  const flowRef = ref()
  defineExpose({
    config,
    flowList,
    flowRef
  })
</script>

<template>
    <workFlowDesginer ref="flowRef" :flowList="flowList" :config="config"></workFlowDesginer>
</template>

<style lang="scss">
  html,body,#app {
    height: 100%;
    overflow: hidden;
    margin: 0;
  }
  @import 'color-gradient-picker-vue3/dist/style.css';
  @import 'styles/index.scss';
  @import 'vue-json-viewer/style.css';
</style>