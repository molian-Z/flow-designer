<template>
  <div ref="visualRef" class="color-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <div class="color-input">
      <svg-icon icon-class="toolbar-color" class="svg-icon"></svg-icon>
      <div class="color-picker" :style="{'background-color': currentColor}"></div>
    </div>
  </div>
  <popover class="color-picker-bg" :visualRef="visualRef" :insertBody="false" :vueFlowRef="vueFlowRef"
    v-model="isPopover">
    <ColorPicker :color="computedColor" :on-end-change="(color:any) => change(color)"></ColorPicker>
  </popover>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { defineOptions, defineProps, defineEmits, ref, computed } from 'vue'
  import ColorPicker from 'color-gradient-picker-vue3';
  import { HEX2RGB, rgbaToArray } from '@/utils/util'

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

  const computedColor = computed(() => {
    const colors:any = rgbaToArray(HEX2RGB(currentColor.value))
    const colorObj = {
      red: colors[0],
      green: colors[1],
      blue: colors[2],
      alpha: 1,
    }
    return colorObj
  })

  const change = function (val : any) {
    currentColor.value = `rgb(${val.red},${val.green},${val.blue})`
    props.currentNode.node.data.widget.style.color = currentColor.value
    $emit('change', {
      type: 'color',
      value: currentColor.value
    })
  }
</script>

<style scoped lang="scss">
  .color-container {
    .color-input {
      user-select: none;
      font-weight: 500;
      position: relative;

      .svg-icon {
        fill: var(--text-color-primary);
      }

      .color-picker {
        width: 26px;
        height: 3px;
        position: absolute;
      }
    }
  }

  .color-picker-bg:hover {
    background-color: var(--bg-color);
  }
</style>