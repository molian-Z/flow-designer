<template>
  <teleport to="body">
    <transition>
      <div class="modal-mask-bg" v-if="isRevealed" @click="cancel(false)"></div>
    </transition>
    <transition>
      <div v-if="isRevealed" class="modal-layout" :style="{width}">
        <div class="modal">
          <div class="modal-header">
            <span class="header-title">
              {{headerTitle}}
            </span>
            <svg-icon class="svg-icon-close" icon-class="close" @click="cancel(false)"></svg-icon>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
          <div class="modal-btns" v-if="showBtns">
            <button type="primary" @click="confirm(true)">确定</button>
            <button type="warning" @click="cancel(false)">取消</button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
  import svgIcon from '@/components/svg-icon/index.vue'
  import { useConfirmDialog } from '@vueuse/core'
  import { defineProps, defineEmits, watch, onMounted } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    showBtns: {
      type: Boolean,
      default: true
    },
    headerTitle: {
      type: String,
      defuault: ''
    }
  })
  onMounted(() => {
    watch(() => props.modelValue, (newVal : boolean) => {
      if (newVal) {
        openDialog()
      }
    }, {
      immediate: true
    })
  })

  const {
    isRevealed,
    reveal,
    confirm,
    cancel,
    onConfirm,
    onCancel
  } = useConfirmDialog()

  const $emit = defineEmits(['update:modelValue','confirm','cancel'])

  const openDialog = async () => {
    await reveal()
    
  }
  onConfirm(()=>{
    $emit('update:modelValue', false)
    $emit('confirm')
  })

  onCancel(() => {
    $emit('update:modelValue', false)
    $emit('cancel')
  })
</script>

<style lang="scss" scoped>
  .modal-mask-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: var(--mask-bg);
    backdrop-filter: blur(4px);
    z-index: 1000;
  }

  .modal-layout {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    background-color: var(--bg-color);
    border-radius: var(--border-radius-body);

    .modal {
      padding: 15px 20px;

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-title {
          font-size: 22px;
          font-weight: bold;
        }

        .svg-icon-close {
          color: var(--text-color-primary);
          font-size: 12px;
          cursor: pointer;
          transition: var(--transition);
          &:hover{
            opacity: .5;
          }
        }
      }
      
      .modal-content{
        padding: 20px 0;
      }

      .modal-btns {
        text-align: right;
      }
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>