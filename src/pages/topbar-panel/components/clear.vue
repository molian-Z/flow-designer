<template>
  <popconfirm @confirm="$emit('click')">
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
    defineEmits
  } from 'vue'
  defineOptions({
    name: 'clear',
    index: 1
  })
  const $emit = defineEmits(['click'])
</script>
<style scoped lang="scss">
  .popper-title {
    color:var(--text-color-primary);
    font-size: 14px;
    margin-bottom: 10px;
  }
</style>