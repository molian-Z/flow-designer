<template>
  <popconfirm @confirm="click">
    <svg-icon icon-class="clear" class="color-svg-icon" />
    <template v-slot:reference>
      <div class="popper-title">{{$t('pages.topbarPanel.clearTitle')}}</div>
    </template>
  </popconfirm>
</template>

<script setup>
  import svgIcon from '@/components/svg-icon/index.vue'
  import popconfirm from '@/components/popconfirm/index.vue'
  import { $t } from '@/utils/i18n'

  import {
    defineOptions,
    defineProps
  } from 'vue'
  defineOptions({
    name: 'clear',
    index: 30
  })
  
  const props = defineProps({
    flowRef:{
      type:Object,
      default:function(){
        return {}
      }
    }
  })
  
  const click = function(){
    props.flowRef.clearFlowData()
  }
</script>
<style scoped lang="scss">
  .popper-title {
    color:var(--text-color-primary);
    font-size: 14px;
    margin-bottom: 10px;
  }
</style>