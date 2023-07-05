<template>
  <transition :name="transName" v-if="!insertBody">
    <div ref="popoverRef" :style="position" :class="[!removeClass && 'popover-container']" v-if="isRevealed">
      <slot></slot>
    </div>
  </transition>
  <teleport to="body" v-else>
    <transition :name="transName">
      <div ref="popoverRef" :style="position" :class="[!removeClass && 'popover-container']" v-if="isRevealed">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
  import {
    useConfirmDialog,
    onClickOutside,
    useDebounceFn
  } from '@vueuse/core'

  import {
    ref,
    defineOptions,
    defineProps,
    defineEmits,
    watch,
    nextTick
  } from 'vue'

  defineOptions({
    name: 'popover'
  })

  const $emit = defineEmits(['update:modelValue'])

  const props = defineProps({
    vueFlowRef: {
      type: Object,
      default: function () {
        return {}
      }
    },
    visualRef: {
      type: Object,
      default: function () {
        return {}
      }
    },
    insertBody: {
      type: Boolean,
      default: true
    },
    removeClass:{
      type:Boolean,
      default:false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    offsetY:{
      type:Number,
      default:10
    }
  })

  watch(() => props.modelValue, (newVal) => {
    if (newVal) {
      reveal(props.visualRef)
    } else {
      cancel()
    }
  })

  const popoverRef = ref<any>({})
  const transName = ref<'zoom-in-bottom' | 'zoom-in-top'>('zoom-in-top')

  const position = ref<{
    position : 'fixed'
    top ?: String
    zIndex : Number
    right ?: String
    left ?: String
  }>({
    position: 'fixed',
    zIndex: 1000
  })

  const {
    isRevealed,
    reveal,
    onReveal,
    cancel
  } = useConfirmDialog()
  onReveal((showRef) => {
    const flowRect = props.vueFlowRef.getBoundingClientRect()
    const {
      x,
      y,
      width,
      bottom
    } = showRef.getBoundingClientRect()
    nextTick(() => {
      const realX = x + ((width - popoverRef.value.clientWidth) / 2)
      const realY = y - popoverRef.value.clientHeight - props.offsetY
      const currentPosition : {
        position : 'fixed'
        top ?: String
        zIndex : Number
        right ?: String
        left ?: String
      } = {
          position: 'fixed',
          top: realY + 'px',
          zIndex: 1000
        }
      if (realX + popoverRef.value.clientWidth + 5 >= document.body.clientWidth) {
        currentPosition.right = '5px'
      } else if (realX - flowRect.x - 5 <= 0) {
        currentPosition.left = flowRect.x + 5 + 'px'
      } else {
        currentPosition.left = realX + 'px'
      }

      if (realY - flowRect.y <= 0) {
        currentPosition.top = bottom + 10 + 'px'
        transName.value = "zoom-in-bottom"
      } else {
        transName.value = "zoom-in-top"
      }
      position.value = currentPosition
    })
  })
  onClickOutside(popoverRef, (e:any) => {
    if (e?.target?.__vnode?.key === "pane-vue-flow-0" || e?.target?.tagName === 'svg') {
      useDebounceFn(() => {
        close()
      }, 50)()
    }else if(isRevealed.value){
      if(props.insertBody){
        reveal(e.target)
      }else{
        reveal(props.visualRef)
      }
    }
  })

  const close = function () {
    $emit('update:modelValue', false)
  }
</script>

<style lang="scss" scoped>
  .popover-container {
    background-color: var(--bg-color);
    box-shadow: var(--box-shadow-light);
    border-radius: var(--border-radius);
  }

  .zoom-in-bottom-enter-active,
  .zoom-in-top-enter-active {
    opacity: 0;
    transform: scaleY(0);
  }

  .zoom-in-bottom-enter-to,
  .zoom-in-bottom-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform var(--transition) cubic-bezier(0.23, 1, 0.32, 1), opacity var(--transition) cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center top;
  }

  .zoom-in-top-enter-to,
  .zoom-in-top-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform var(--transition) cubic-bezier(0.23, 1, 0.32, 1), opacity var(--transition) cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center bottom;
  }

  .zoom-in-bottom-leave-to,
  .zoom-in-top-leave-to {
    opacity: 0;
    transform: scaleY(0);
  }
</style>