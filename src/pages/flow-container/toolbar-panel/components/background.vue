<template>
  <div ref="visualRef" class="background-color-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <div class="background-color-input">
      <svg-icon icon-class="toolbar-background" class="svg-icon"></svg-icon>
      <div class="background-color-picker" :style="{'background-color': currentColor}"></div>
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
    name: 'background',
    types:'node',
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
  
  const getComps = computed(()=>{
    return props.currentNode.node ? props.currentNode.node : props.currentNode.edge
  })

  const $emit = defineEmits(['change'])

  const visualRef = ref<any>(null)
  const currentColor = ref<string>(getComps.value.data.widget?.options.style?.background || window.getComputedStyle(props.currentNode.event.target).backgroundColor)
  const isPopover = ref<boolean>(false)
  const showPopover = function () {
    isPopover.value = !isPopover.value
  }
  
  watch(()=>props.currentNode,(newNode)=>{
    currentColor.value = getComps.value.data.widget?.options.style?.background || window.getComputedStyle(props.currentNode.event.target).backgroundColor
  })
  
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
    getComps.value.data.widget.options.style.background = currentColor.value
    $emit('change', {
      type: 'color',
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