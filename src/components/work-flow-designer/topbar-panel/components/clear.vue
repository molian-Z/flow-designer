<template>
  <svg-icon icon-class="clear" class="color-svg-icon" @click="reveal" />
  <teleport to="body">
    <transition name="zoom-in-bottom">
      <div :style="popperPosition" class="clear-icon-modal-bg" v-if="isRevealed">
        <div class="popper-title">确定要清空画布么?</div>
        <div class="popper-btns">
          <button class="primary" @click="confirm">确认</button>
          <button class="warning" @click="cancel">取消</button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
  import svgIcon from '@/components/svg-icon/index.vue'
  import {
    useConfirmDialog
  } from '@vueuse/core';
  import {
    ref,
    defineOptions,
    defineEmits
  } from 'vue'
  defineOptions({
    name: 'clear',
    index: 1
  })

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
    onConfirm
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
        left: right - 150 + 'px',
        top: bottom + 10 + 'px',
        zIndex: 1000
      }
    }
  })
  onConfirm(() => {
    $emit('click')
  })
</script>

<style lang="scss" scoped>
  .clear-icon-modal-bg {
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-light);
    padding: 15px;
    width: 130px;

    .popper-title {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .popper-btns {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button+button {
        margin-left: 10px;
      }

      button {
        border-width: 0px;
        color: #FFF;
        padding: 5px 10px;
        border-radius: 4px;
        transition: var(--transition);
        cursor: pointer;

        &:hover {
          opacity: .7;
        }
      }

      .primary {
        background-color: var(--color-primary);
      }

      .warning {
        background-color: var(--color-warning);
      }
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