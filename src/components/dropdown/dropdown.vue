<template>
  <div @click="opened">
    <slot></slot>
  </div>
  <teleport to="body">
    <transition name="zoom-in-bottom">
      <div ref="dropdown" :style="popperPosition" class="dropdown-modal-bg" v-if="isRevealed">
        <div ref="dropdownMenu" :activeName="activeName" class="dropdown-menu" @click="itemClick">
          <slot name="dropdown"></slot>
        </div>
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
    provide
  } from 'vue'

  defineOptions({
    name: 'dropdown',
    index: 1
  })

  const props = defineProps({
    activeName: {
      type: String,
      default: ''
    },
    disabled:{
      type:Boolean,
      default:false
    }
  })
  
  provide('activeName', props.activeName)
  
  const dropdown = ref<any>({})
  const dropdownMenu = ref<any>({})

  const $emit = defineEmits(['command'])

  const popperPosition = ref<any>({
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
    cancel
  } = useConfirmDialog()
  onReveal((e) => {
    const {
      bottom,
      right
    } = e.target.getBoundingClientRect()
    if (right + 80 >= document.body.clientWidth) {
      popperPosition.value = {
        position: 'fixed',
        right: '5px',
        top: bottom + 10 + 'px',
        zIndex: 1000
      }
    } else {
      popperPosition.value = {
        position: 'fixed',
        left: right - 65 + 'px',
        top: bottom + 10 + 'px',
        zIndex: 1000
      }
    }
  })
  
  const opened = function(e:any){
    if(!props.disabled){
      reveal(e)
    }
  }

  const itemClick = function(e:any) {
    $emit('command', e.target.dataset.vValue)
    confirm()
  }
  onClickOutside(dropdown, () => {
    if (isRevealed.value) {
      useDebounceFn(() => {
        cancel()
      }, 50)()
    }
  })
</script>

<style lang="scss" scoped>
  .dropdown-modal-bg {
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-light);
    width: 130px;

    .dropdown-menu {
      user-select: none;
      padding: 10px 0;
    }
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
    transform-origin: center top;
  }

  .zoom-in-bottom-leave-to {
    opacity: 0;
    transform: scaleY(0);
  }
</style>