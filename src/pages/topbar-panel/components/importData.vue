<template>
  <svg-icon icon-class="import-data" class="color-svg-icon" @click="click" />
  <flowDialog width="500px" headerTitle="导入数据" v-model="isDialog" @confirm="confirm">
    <textarea class="maxHeight" v-model="importModelValue" :expand-depth="5" sort></textarea>
  </flowDialog>
</template>

<script setup lang="ts">
  import svgIcon from '@/components/svg-icon/index.vue'
  import flowDialog from '@/components/flow-dialog/index.vue'
  import {
    defineOptions,
    defineProps,
    ref
  } from 'vue'

  defineOptions({
    name: 'importData',
    index: 0
  })

  const props = defineProps({
    flowRef: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })
  
  const importModelValue = ref<any>([])
  
  const confirm = function(){
    try{
      const flowList = JSON.parse(importModelValue.value)
      props.flowRef.flowList = flowList.map((item:any) =>{
        return {
          data:{
            widget:item
          }
        }
      })
      props.flowRef.vueFlowExpose.fitView()
    }catch(e){
      alert('数据格式有误')
    }
  }
  
  const isDialog = ref<boolean>(false)

  const click = function () {
    isDialog.value = true
  }
</script>

<style scoped lang="scss">
  .maxHeight{
    width: 100%;
    height: 400px;
    overflow: auto;
  }
</style>