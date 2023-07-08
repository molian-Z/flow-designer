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
  import { defineOptions, defineProps, defineEmits, ref, computed, watch } from 'vue'
  import ColorPicker from 'color-gradient-picker-vue3';
  import { HEX2RGB, rgbaToArray } from '@/utils/util'

  defineOptions({
    name: 'color',
    types: ['node', 'edge'],
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
  const isPopover = ref<boolean>(false)
  const showPopover = function () {
    isPopover.value = !isPopover.value
  }

  const getStyle = computed(() => {
    return props.currentNode.node ? props.currentNode.node.data.widget.options.style : props.currentNode.edge.data.widget.options.labelStyle
  })
  
  const currentColor = computed(()=>{
    if(props.currentNode.node){
      return getStyle.value.color || window.getComputedStyle(props.currentNode.event.target).color
    }else if(props.currentNode.edge){
      return getStyle.value.fill
    }
  })

  const computedColor = computed(() => {
    const colors : any = rgbaToArray(HEX2RGB(currentColor.value))
    const colorObj = {
      red: colors[0],
      green: colors[1],
      blue: colors[2],
      alpha: 1,
    }
    return colorObj
  })

  const change = function (val : any) {
    const color = `rgb(${val.red},${val.green},${val.blue})`
    if (props.currentNode.node) {
      getStyle.value.color = color
    } else {
      getStyle.value.fill = color
    }
    $emit('change', {
      type: 'color',
      value: color
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