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
  @import "vue3-colorpicker/style.css";
  @import 'styles/index.scss';
  html,body,#app {
    height: 100%;
    overflow: hidden;
    margin: 0;
  }
</style>