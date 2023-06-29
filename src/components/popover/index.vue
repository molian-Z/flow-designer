<template>
  <teleport to="body">
    <transition :name="transName">
      <div ref="popoverRef" :style="position" class="popover-container" v-if="isRevealed">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
  import {
    useConfirmDialog,
    onClickOutside,
    useDebounceFn
  } from '@vueuse/core'

  import {
    ref,
    defineOptions,
    defineEmits,
    defineProps,
    watch
  } from 'vue'

  defineOptions({
    name: 'popover'
  })

  const props = defineProps({
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

  watch(() => props.visualRef, (showRef) => {
    if (showRef) {
      reveal(showRef)
    } else {
      cancel()
    }
  })

  const popoverRef = ref({})
  const currentId = ref()
  const transName = ref('')

  const $emit = defineEmits(['click'])

  const position = ref({})

  const {
    isRevealed,
    reveal,
    onReveal,
    cancel
  } = useConfirmDialog()
  onReveal((showRef) => {
    currentId.value = showRef.node.id
    const flowRect = props.flowRef.vueFlowRef.getBoundingClientRect()
    const {
      x,
      y,
      width,
      bottom
    } = showRef.event.target.getBoundingClientRect()
    const realX = x + (width / 2) - 100
    const realY = y - 50
    const currentPosition = {
      position: 'fixed',
      top: realY + 'px',
      zIndex:1000
    }
    if (realX+205 >= document.body.clientWidth) {
      currentPosition.right = '5px'
    }else if(realX - flowRect.x - 5 <= 0){
      currentPosition.left = flowRect.x + 5 + 'px'
    }else{
      currentPosition.left = realX + 'px'
    }
    
    if(realY - flowRect.y <= 0){
      currentPosition.top = bottom + 10 + 'px'
      transName.value = "zoom-in-bottom"
    }else{
      transName.value = "zoom-in-top"
    }
    position.value = currentPosition
  })
  onClickOutside(popoverRef, () => {
    if (isRevealed.value && props.visualRef.node.id === currentId.value) {
      useDebounceFn(()=>{
        cancel()
      },50)()
    }
  })
</script>

<style lang="scss" scoped>
  .popover-container {
    background-color: var(--bg-color);
    padding: 10px 15px;
    box-shadow: var(--box-shadow-light);
    border-radius: var(--border-radius);
    width: 170px;
  }

  .zoom-in-bottom-enter-active,.zoom-in-top-enter-active {
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
  
  .zoom-in-bottom-leave-to,.zoom-in-top-leave-to {
    opacity: 0;
    transform: scaleY(0);
  }
</style>