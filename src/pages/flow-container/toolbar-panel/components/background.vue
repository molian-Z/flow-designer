<template>
  <div ref="visualRef" class="background-color-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <div class="background-color-input">
      <svg-icon icon-class="toolbar-background" class="svg-icon"></svg-icon>
      <div class="background-color-picker" :style="{'background-color': currentColor}"></div>
    </div>
  </div>
  <popover class="color-picker-bg" :visualRef="visualRef" :insertBody="false" :vueFlowRef="vueFlowRef" v-model="isPopover">
    <Vue3ColorPicker :isWidget="true" use-type="both" @pureColorChange="change" @gradientColorChange="change" />
    <div class="popover-btns" @click="showPopover()">
      {{$t('components.popconfirm.close')}}
    </div>
  </popover>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { defineOptions, defineProps, defineEmits, ref } from 'vue'
  import { $t } from '@/utils/i18n'

  defineOptions({
    name: 'background',
    index: 3
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

  const $emit = defineEmits(['change'])

  const visualRef = ref<any>(null)
  const currentColor = ref<string>(props.currentNode.node.data.widget.style.background || window.getComputedStyle(props.currentNode.event.target).backgroundColor)
  const isPopover = ref<boolean>(false)
  const showPopover = function () {
    isPopover.value = !isPopover.value
  }
  
  const change = function (val : string) {
    currentColor.value = val
    props.currentNode.node.data.widget.style.background = currentColor.value
    $emit('change', {
      type: 'background',
      value: currentColor.value
    })
  }
</script>

<style scoped lang="scss">
  .background-color-container {
    .background-color-input {
      user-select: none;
      font-weight: 500;
      position: relative;

      .background-color-picker {
        width: 26px;
        height: 3px;
        position: absolute;
        left: 5px;
      }
    }
  }
  
  .popover-btns{
    background-color: var(--bg-color);
    transition: var(--transition);
    height: 36px;
    line-height: 36px;
    border-radius: var(--border-radius);
    color:var(--color-primary);
    &:hover{
      background-color: var(--bg-color-page);
    }
  }
  
  .color-picker-bg:hover{
    background-color: var(--bg-color);
  }
</style>