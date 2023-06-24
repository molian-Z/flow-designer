<template>
  <teleport to="body">
    <transition name="zoom-in-bottom">
      <div ref="popconfirm" :style="popperPosition" class="toolbar-container" v-if="isRevealed">
        some content
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
    $t
  } from '@/utils/i18n'

  import {
    ref,
    defineOptions,
    defineEmits,
    defineExpose
  } from 'vue'

  defineOptions({
    name: 'toolbarPanel'
  })

  const popconfirm = ref({})
  const currentId = ref()

  const $emit = defineEmits(['click'])

  const popperPosition = ref({
    position: 'fixed',
    left: '35px',
    top: '45px',
    zIndex: -1
  })

  const {
    isRevealed,
    reveal,
    onReveal,
    confirm,
    cancel,
    onConfirm,
    onCancel
  } = useConfirmDialog()
  onReveal((e) => {
    const {
      x,
      y,
      width,
      right
    } = e.target.getBoundingClientRect()
    const realX = x+(width/2) - 100
    const realY = y - 50
    if (right + 80 >= document.body.clientWidth) {
      popperPosition.value = {
        position: 'fixed',
        right: '5px',
        top: realY + 'px',
        zIndex: 1000
      }
    } else {
      popperPosition.value = {
        position: 'fixed',
        left: realX + 'px',
        top: realY + 'px',
        zIndex: 1000
      }
    }
  })
  onConfirm(() => {
    $emit('confirm')
  })
  onCancel(() => {
    $emit('cancel')
  })
  onClickOutside(popconfirm, () => {
    if (isRevealed.value) {
      useDebounceFn(() => {
        cancel()
      }, 50)()
    }
  })


  const show = function(data) {
    if (data.node.id === currentId.value && isRevealed.value) {
      close()
      return false
    }
    currentId.value = data.node.id
    reveal(data.event)
  }
  const close = function() {
    cancel()
  }

  defineExpose({
    show
  })
</script>

<style lang="scss" scoped>
  .toolbar-container {
    background-color: var(--bg-color);
    padding: 10px 15px;
    box-shadow: var(--box-shadow-light);
    border-radius: var(--border-radius);
    width: 170px;
  }

  .zoom-in-bottom-enter-active {
    opacity: 0;
    transform: scaleY(0);
  }

  .zoom-in-bottom-enter-to,
  .zoom-in-bottom-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform var(--transition) cubic-bezier(0.23, 1, 0.32, 1), opacity var(--transition) cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center bottom;
  }

  .zoom-in-bottom-leave-to {
    opacity: 0;
    transform: scaleY(0);
  }
</style>