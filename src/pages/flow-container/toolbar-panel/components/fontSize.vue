<template>
  <div ref="visualRef" class="font-size-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <div class="font-size-input">{{fontSize}}</div>
  </div>
  <popover :visualRef="visualRef" :insertBody="false" :vueFlowRef="vueFlowRef" v-model="isPopover">
    <div ref="sizeListRef" class="font-size-list">
      <div :id="'font-size-list-item__'+currentSize" class="font-size-list-item"
        :class="[ fontSize === currentSize && 'is-selected']" v-for="currentSize in fontSizeList" :key="fontSize"
        @click="setFontSize(currentSize)">{{currentSize}}</div>
    </div>
  </popover>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import { defineOptions, defineProps, defineEmits, ref, nextTick } from 'vue'
  defineOptions({
    name: 'fontSize',
    index: 1
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

  const $emit = defineEmits(['change'])

  const visualRef = ref<any>(null)
  const fontSize = ref<number>(16)
  const isPopover = ref<boolean>(false)
  const fontSizeList = ref<number[]>([13, 14, 15, 16, 17, 18, 22, 26, 32, 36, 42, 48, 54])
  const sizeListRef = ref<any>(null)

  const showPopover = function () {
    isPopover.value = !isPopover.value
    nextTick(() => {
      const currentDom : any = document.getElementById('font-size-list-item__' + fontSize.value)
      if (currentDom.offsetTop - 72 >= 0) {
        sizeListRef?.value?.scrollTo(0, currentDom.offsetTop - 72)
      } else {
        sizeListRef?.value?.scrollTo(0, 0)
      }
    })
  }

  const setFontSize = function (val : number) {
    props.currentNode.node.data.widget.style.fontSize = val + 'px'
    fontSize.value = val
    $emit('change', {
      type: 'fontSize',
      value: val
    })
  }
</script>

<style scoped lang="scss">
  .font-size-container {
    .font-size-input {
      width: 28px;
      height: 100%;
      user-select: none;
      font-weight: 500;
      color: var(--text-color-primary);
    }

    &.is-active {
      background-color: var(--bg-color-page);
    }
  }
  .font-size-list {
    padding: 5px 0;
    max-height: 200px;
    overflow-y: auto;
    text-align: center;
    color: var(--text-color-primary);
    width: 55px;
  
    &::-webkit-scrollbar {
      width: 0px;
    }
  
    .font-size-list-item {
      line-height: 36px;
      height: 36px;
      transition: var(--transition);
  
      &:hover {
        background-color: var(--bg-color-page);
      }
  
      &.is-selected {
        background-color: var(--bg-color-page);
      }
    }
  }
</style>