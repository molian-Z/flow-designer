<template>
  <div class="font-weight-container" :class="[isActive && 'is-active']" @click="setBold()">
    <svg-icon icon-class="toolbar-bold" class="svg-icon"></svg-icon>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions, defineProps, defineEmits, computed } from 'vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  defineOptions({
    name: 'fontWeight',
    index: 10,
    types:['node','edge'],
    split:true
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
  
  const getStyle = computed(()=>{
    return props.currentNode.node ? props.currentNode.node.data.widget.options.style : props.currentNode.edge.data.widget.options.labelStyle
  })

  const isActive = computed(() => {
    return getStyle.value.fontWeight === 'bold'
  })

  const setBold = function () {
    if(getStyle.value.fontWeight === 'bold'){
      getStyle.value.fontWeight = 500
    }else{
      getStyle.value.fontWeight = 'bold'
    }
    
    $emit('change', {
      type: 'fontWeight',
      value: getStyle.value.fontWeight
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