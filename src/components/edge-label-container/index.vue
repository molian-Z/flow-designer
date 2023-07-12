<template>
  <tspan>
    {{label}}
  </tspan>
</template>

<script setup lang="ts">
  import { defineProps, defineOptions, nextTick } from 'vue'
  defineOptions({
    name: 'edgeLabelContainer'
  })
  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    vueFlowRef: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })
  
  /* nextTick(()=>{
    const { edgeClick } = props.vueFlowRef._object.hooks
    edgeClick.on((data : any) => {
      console.log(data)
    })
  }) */
  
  
</script>

<style scoped lang="scss">
</style>