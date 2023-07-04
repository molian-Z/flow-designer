<template>
  <svg-icon icon-class="export-data" class="color-svg-icon" @click="click" />
  <flowDialog width="500px" headerTitle="导出数据" v-model="isDialog" :showBtns="false">
    <json-viewer class="maxHeight" :value="flowList" :expand-depth="5" :copyable="computedCopy" sort></json-viewer>
  </flowDialog>
</template>

<script setup lang="ts">
  import svgIcon from '@/components/svg-icon/index.vue'
  import flowDialog from '@/components/flow-dialog/index.vue'
  import { $t } from '@/utils/i18n'
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

  const computedCopy = computed(() => {
    return { "copyText": $t('components.copyable.copyText'), "copiedText": $t('components.copyable.copiedText') }
  })


  const isDialog = ref<boolean>(false)

  const flowList = computed(() => {
    return props.flowRef.flowData
  })

  const click = function () {
    isDialog.value = true
  }
</script>

<style lang="scss" scoped>
  .maxHeight{
    :deep(.jv-code){
      height: 400px;
      overflow: auto;
    }
  }
</style>