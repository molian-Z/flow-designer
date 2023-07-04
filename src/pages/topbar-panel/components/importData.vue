<template>
  <svg-icon icon-class="import-data" class="color-svg-icon" @click="click" />
  <flowDialog width="500px" headerTitle="导入数据" v-model="isDialog">
    hello
  </flowDialog>
</template>

<script setup lang="ts">
  import svgIcon from '@/components/svg-icon/index.vue'
  import flowDialog from '@/components/flow-dialog/index.vue'
  import {
    defineOptions,
    defineProps,
    ref
  } from 'vue'

  defineOptions({
    name: 'importData',
    index: 0
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

  const click = function () {
    isDialog.value = true
  }
</script>

<style scoped lang="scss">
</style>