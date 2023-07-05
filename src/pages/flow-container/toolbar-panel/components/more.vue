<template>
  <div ref="visualRef" class="more-container" :class="[isPopover && 'is-active']" @click="showPopover">
    <svg-icon icon-class="toolbar-more"></svg-icon>
    <popover :visualRef="visualRef" :insertBody="false" :vueFlowRef="vueFlowRef" v-model="isPopover">
      <div class="more-list">
        <div class="more-list-item" v-for="more in moreList" :key="more">{{more}}</div>
      </div>
    </popover>
  </div>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { defineOptions, defineProps, ref } from 'vue'
  defineOptions({
    name: 'more',
    index: 99999
  })

  defineProps({
    vueFlowRef: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })

  const visualRef = ref<any>()
  const isPopover = ref<boolean>(false)
  const moreList = ref<number[]>([13,14,15,16,17,18,22,26,32,36,42,48,54])

  const showPopover = function () {
    isPopover.value = !isPopover.value
  }
</script>

<style scoped lang="scss">
  .more-container {
    padding: 10px 5px;
    width: 28px;
    .svg-icon{
      user-select: none;
      font-weight: bold;
      fill:var(--text-color-primary);
      margin: 0;
    }
    
    &.is-active{
      background-color: var(--bg-color-page);
    }

    .more-list{
      padding: 5px 0;
      max-height: 200px;
      overflow-y: auto;
      text-align: center;
      width: 55px;
      &::-webkit-scrollbar{
        width: 0px;
      }
      .more-list-item{
        line-height: 36px;
        height: 36px;
        transition: var(--transition);
        
        &:hover{
          background-color: var(--bg-color-page);
        }
      }
    }
  }
</style>