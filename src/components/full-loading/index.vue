<template>
  <teleport to="body">
    <transition>
      <div class="modal-mask-bg" v-if="isRevealed"></div>
    </transition>
    <transition>
      <div v-if="isRevealed" class="modal-layout">
        <div class="modal-loading">
          <div class="loadBox">
            <div class="loaderContantBox"></div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
  import { useConfirmDialog } from '@vueuse/core'
  import { defineProps, watch, onMounted } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      defuault: ''
    }
  })
  onMounted(() => {
    watch(() => props.modelValue, (newVal : boolean) => {
      if (newVal) {
        reveal()
      } else {
        cancel()
      }
    }, {
      immediate: true
    })
  })

  const {
    isRevealed,
    reveal,
    cancel
  } = useConfirmDialog()
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

    .modal-loading {
      .loadBox .loaderContantBox {
        color: var(--color-primary);
        font-size: 60px;
        overflow: hidden;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        transform: translateZ(0);
        /* animation：规定完成动画所花费的时间，该属性必须规定，否则动画时长为0，无法播放 */
        animation: loadBox 1.7s infinite ease, round 1.7s infinite ease;
      }

      @keyframes loadBox {
        0% {
          box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
        }

        5%,
        95% {
          box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
        }

        10%,
        59% {
          box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
            -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
            -0.297em -0.775em 0 -0.477em;
        }

        20% {
          box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
            -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
            -0.749em -0.34em 0 -0.477em;
        }

        38% {
          box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
            -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
            -0.82em -0.09em 0 -0.477em;
        }

        100% {
          box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
        }
      }

      @keyframes round {
        0% {
          transform: rotate(0deg);
          /* 开始旋转 div 元素 */
        }

        100% {
          transform: rotate(360deg);
          /* 结束旋转 div 元素 */
        }
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