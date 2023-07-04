<template>
  <svg-icon icon-class="export-data" class="color-svg-icon" @click="click" />
  <flowDialog width="500px" headerTitle="导出数据" v-model="isDialog">
    <json-viewer :value="flowList" :expand-depth="5" copyable boxed sort></json-viewer>
  </flowDialog>
</template>

<script setup lang="ts">
  import svgIcon from '@/components/svg-icon/index.vue'
  import flowDialog from '@/components/flow-dialog/index.vue'
  import {
    defineOptions,
    defineProps,
    ref,
    computed
  } from 'vue'

  defineOptions({
    name: 'exportData',
    index: 10
  })

  const props = defineProps({
    flowRef: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })


  const isDialog = ref<boolean>(false)

  const flowList = computed(() => {
    return props.flowRef.flowList
  })

  const click = function () {
    isDialog.value = true
  }
</script>

<style>
</style>