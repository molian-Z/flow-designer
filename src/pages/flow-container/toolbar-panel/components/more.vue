<template>
  <div ref="visualRef" class="more-container" :class="[isPopover && 'is-active']" @click="showPopover" v-if="moreComps.length > 0">
    <svg-icon icon-class="toolbar-more"></svg-icon>
    <popover :visualRef="visualRef" :insertBody="false" :vueFlowRef="vueFlowRef" v-model="isPopover">
      <div class="more-list">
        <template v-for="moreComp in moreComps" :key="moreComp.name">
          <div class="more-list-item">
            <component :is="moreComp" :vueFlowRef="vueFlowRef"></component>
          </div>
        </template>
      </div>
    </popover>
  </div>
</template>

<script setup lang="ts">
  import popover from '@/components/popover/index.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { moreComps } from './index'
  import { defineOptions, defineProps, ref } from 'vue'
  defineOptions({
    name: 'more',
    types:['node','edge'],
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

  const showPopover = function () {
    if(moreComps.value.length > 0){
      isPopover.value = !isPopover.value
    }
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