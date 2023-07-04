<template>
  <div ref="visualRef" class="color-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <div class="color-input">
      <svg-icon icon-class="toolbar-color" class="svg-icon"></svg-icon>
      <div class="color-picker" :style="{'background-color': currentColor}"></div>
    </div>
  </div>
  <popover class="color-picker-bg" :visualRef="visualRef" :insertBody="false" :vueFlowRef="vueFlowRef" v-model="isPopover">
    <Vue3ColorPicker :isWidget="true" @pureColorChange="change"></Vue3ColorPicker>
  </popover>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { defineOptions, defineProps, defineEmits, ref } from 'vue'

  defineOptions({
    name: 'color',
    index: 20
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
  const currentColor = ref<string>(window.getComputedStyle(props.currentNode.event.target).color)
  const isPopover = ref<boolean>(false)

  const showPopover = function () {
    isPopover.value = !isPopover.value
  }

  const change = function (val : string) {
    currentColor.value = val
    props.currentNode.node.data.widget.style.color = currentColor.value
    $emit('change', {
      type: 'color',
      value: currentColor.value
    })
    showPopover()
  }
</script>

<style scoped lang="scss">
  .color-container {
    .color-input {
      user-select: none;
      font-weight: 500;
      position: relative;
      
      .svg-icon{
        fill:var(--text-color-primary);
      }

      .color-picker {
        width: 26px;
        height: 3px;
        position: absolute;
        left: 5px;
      }
    }
  }
  
  .color-picker-bg:hover{
    background-color: var(--bg-color);
  }
</style>