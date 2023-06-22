<template>
  <popconfirm @confirm="$emit('click')">
    <svg-icon icon-class="clear" class="color-svg-icon" />
    <template v-slot:reference>
      <div class="popper-title">确定要清空画布么?</div>
    </template>
  </popconfirm>
</template>

<script setup>
  import svgIcon from '@/components/svg-icon/index.vue'
  import popconfirm from '@/components/popconfirm/index.vue'

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
    font-size: 14px;
    margin-bottom: 10px;
  }
</style>