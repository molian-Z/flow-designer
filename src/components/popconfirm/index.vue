<template>
  <div @click="reveal">
    <slot></slot>
  </div>
  <teleport to="body">
    <transition name="zoom-in-bottom">
      <div ref="popconfirm" :style="popperPosition" class="popconfirm-modal-bg" v-if="isRevealed">
        <slot name="reference"></slot>
        <div class="popper-btns">
          <button type="primary" @click="confirm">{{!confirmButtonText?$t('components.popconfirm.confirm'):confirmButtonText}}</button>
          <button type="warning" @click="cancel">{{!cancelButtonText?$t('components.popconfirm.cancel'):cancelButtonText}}</button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
  import {
    useConfirmDialog,onClickOutside,useDebounceFn 
  } from '@vueuse/core'
  import { $t } from '@/utils/i18n'
  
  import {
    ref,
    defineOptions,
    defineEmits,
    defineProps
  } from 'vue'
  const {confirmButtonText,cancelButtonText} = defineProps({
    confirmButtonText:{type:String,default: '' },
    cancelButtonText:{type:String,default:''}
  })
  
  defineOptions({
    name: 'popconfirm',
    index: 1
  })
  
  const popconfirm = ref({})
  
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
      bottom,
      right
    } = e.target.getBoundingClientRect()
    if(right + 80 >= document.body.clientWidth){
      popperPosition.value = {
        position: 'fixed',
        right: '5px',
        top: bottom + 10 + 'px',
        zIndex: 1000
      }
    }else{
      popperPosition.value = {
        position: 'fixed',
        left: right - 75 + 'px',
        top: bottom + 10 + 'px',
        zIndex: 1000
      }
    }
  })
  onConfirm(() => {
    $emit('confirm')
  })
  onCancel(()=>{
    $emit('cancel')
  })
  onClickOutside(popconfirm, (e) => {
    if(isRevealed.value){
      useDebounceFn(() => {
        cancel()
      }, 50)()
    }
  })
  
</script>

<style lang="scss" scoped>
  .popconfirm-modal-bg {
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-light);
    padding: 15px;
    width: 150px;

    .popper-title {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .popper-btns {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .zoom-in-bottom-enter-active{
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