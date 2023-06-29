<template>
  <popover ref="popoverRef" :visualRef="visualRef" :flowRef="flowRef">
    <template v-for="comp in components" :key="comp.name">
      <component :is="comp" :flowRef="flowRef"></component>
    </template>
  </popover>
</template>

<script setup>
  import popover from '@/components/popover/index.vue'
  import {
    $t
  } from '@/utils/i18n'
  import components from './components/index'

  import {
    defineOptions,
    defineProps
  } from 'vue'

  defineOptions({
    name: 'toolbarPanel'
  })

  defineProps({
    flowRef: {
      type: Object,
      default: function() {
        return {}
      }
    },
    visualRef: {
      type: Object,
      default: function() {
        return {}
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>