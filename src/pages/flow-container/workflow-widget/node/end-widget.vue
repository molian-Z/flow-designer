<template>
  <node-container :is-valid-connection="isValidConnection">
    {{widget.options.label}}
  </node-container>
</template>


<script setup lang="ts">
  import nodeContainer from '@/components/node-container/index.vue'
  import {
    defineOptions
  } from 'vue'
  import {
    useMixins
  } from './nodeMixins'
  defineOptions({
    category: 'basicFields',
    index: 2,
    name: 'endWidget',
    type: 'end',
    icon: 'node-end',
    rules:{
      source:false,
      target:true,
    },
    options: {
      name: '',
      label: 'endNode',
      customClass: '',
      hidden: false,
      position: ['Left'],
      pTopClass: '',
      pLeftClass: '',
      pRightClass: '',
      pBottomClass: ''
    }
  })
  const {
    widget
  } = useMixins()
  
  const isValidConnection = function (){
    return false
  }
</script>