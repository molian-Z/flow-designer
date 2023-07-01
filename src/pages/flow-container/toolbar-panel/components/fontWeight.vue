<template>
  <div class="font-weight-container" :class="[isActive && 'is-active']" @click="setBold()">
    <svg-icon icon-class="toolbar-bold" class="svg-icon"></svg-icon>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions, defineProps, defineEmits, ref, computed } from 'vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  defineOptions({
    name: 'fontWeight',
    index: 1
  })

  const props = defineProps({
    vueFlowRef: {
      type: Object,
      default: function () {
        return {}
      }
    },
    currentNode:{
      type:Object,
      default:function(){
        return []
      }
    }
  })
  
  const $emit = defineEmits(['change'])

  const isActive = computed(() => {
    return props.currentNode.node.data.widget.style.fontWeight === 'bold'
  })

  const setBold = function () {
    if(props.currentNode.node.data.widget.style.fontWeight === 'bold'){
      props.currentNode.node.data.widget.style.fontWeight = 500
    }else{
      props.currentNode.node.data.widget.style.fontWeight = 'bold'
    }
    
    $emit('change', {
      type: 'fontWeight',
      value: props.currentNode.node.data.widget.style.fontWeight
    })
  }
</script>

<style scoped lang="scss">
  .font-weight-container {
    
    .svg-icon{
      fill:var(--text-color-primary);
    }

    &.is-active {
      background-color: var(--bg-color-page);
    }
  }
</style>