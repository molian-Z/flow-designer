<template>
  <div ref="visualRef" class="background-color-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <div class="background-color-input">
      <svg-icon icon-class="toolbar-background" class="svg-icon"></svg-icon>
      <div class="background-color-picker" :style="{'background-color': currentColor}"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import svgIcon from '@/components/svg-icon/index.vue'
  import { defineOptions, defineProps, defineEmits, ref, computed } from 'vue'
  import ColorPicker from '@/components/color-gradient-picker-vue3/index.es';

  defineOptions({
    name: 'background',
    types: ['node', 'edge'],
    index: 30
  })

  const props = defineProps({
    vueFlowRef: {
      type: Object,
      default: function () {
        return {}
      }
    },
    currentNode: {
      type: Object,
      default: function () {
        return []
      }
    }
  })
</script>

<style scoped lang="scss">
  .background-color-container {
    .background-color-input {
      user-select: none;
      font-weight: 500;
      position: relative;

      .svg-icon {
        fill: var(--text-color-primary);
      }

      .background-color-picker {
        width: 26px;
        height: 3px;
        position: absolute;
      }
    }
  }

  .popover-btns {
    background-color: var(--bg-color);
    transition: var(--transition);
    height: 36px;
    line-height: 36px;
    border-radius: var(--border-radius);
    color: var(--color-primary);

    &:hover {
      background-color: var(--bg-color-page);
    }
  }

  .color-picker-bg:hover {
    background-color: var(--bg-color);
  }
</style>