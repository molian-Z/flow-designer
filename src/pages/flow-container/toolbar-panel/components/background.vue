<template>
  <div ref="visualRef" class="background-color-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <div class="background-color-input">
      <svg-icon icon-class="toolbar-background" class="svg-icon"></svg-icon>
      <div class="background-color-picker" :style="{'background-color': currentColor}"></div>
    </div>
  </div>
  <popover class="color-picker-bg" :visualRef="visualRef" :insertBody="false" :vueFlowRef="vueFlowRef"
    v-model="isPopover">
    <ColorPicker :color="computedColor" @onChange="change"></ColorPicker>
  </popover>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { defineOptions, defineProps, defineEmits, ref, computed } from 'vue'
  import ColorPicker from '@/components/color-gradient-picker-vue3/index.es';
  import { HEX2RGB, rgbaToArray } from '@/utils/util'

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
    },
    optionsModel:{
      type:Object,
      default: function(){
        return null
      }
    }
  })

  const getStyle = computed(() => {
    return props.optionsModel.labelBgStyle ? props.optionsModel.labelBgStyle : props.optionsModel.style
  })

  const currentColor = computed(() => {
    if (props.currentNode.node) {
      return getStyle.value.backgroundColor || window.getComputedStyle(props.currentNode.event.target).backgroundColor
    } else if (props.currentNode.edge) {
      return getStyle.value.fill
    }
  })

  const $emit = defineEmits(['change'])

  const visualRef = ref<any>(null)
  const isPopover = ref<boolean>(false)
  const showPopover = function () {
    isPopover.value = !isPopover.value
  }

  const computedColor = computed(() => {
    const colors : any = rgbaToArray(HEX2RGB(currentColor.value))
    if (colors) {
      return {
        red: colors[0],
        green: colors[1],
        blue: colors[2],
        alpha: colors[3] ? colors[3] : 1,
      }
    }else{
      return {
        red:255,
        green:255,
        blus:255,
        alpha:1
      }
    }
  })

  const change = function (val : any) {
    const bgColor = val.style
    if (props.currentNode.node) {
      getStyle.value.backgroundColor = bgColor
    } else if (props.currentNode.edge) {
      getStyle.value.fill = bgColor
    }
    
    $emit('change', {
      type: 'color',
      value: bgColor
    })
  }
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