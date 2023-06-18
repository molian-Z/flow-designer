<template>
  <div class="designer-container">
    <leftPanel></leftPanel>
    <flowContainer :designer="designer" v-model="workflowData"></flowContainer>
  </div>
</template>

<script setup name="workflowDesigner">
  import {ref} from 'vue'
  import leftPanel from './left-panel/index.vue'
  import flowContainer from './flow-container/index.vue'
  const workflowData = ref([])
  const designer = ref({})
</script>

<style lang="scss" scoped>
  .designer-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>