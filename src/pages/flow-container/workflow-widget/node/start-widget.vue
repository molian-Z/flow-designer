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
    index: 0,
    name: 'startWidget',
    type: 'start',
    icon: 'node-start',
    rules:{
      source:false,
      target:true,
    },
    options: {
      name: '',
      label: 'startNode',
      customClass: '',
      hidden: false,
      position: ['Right'],
      pTopClass: '',
      pLeftClass: '',
      pRightClass: '',
      pBottomClass: ''
    }
  })


  const {
    widget
  } = useMixins()
  
  const isValidConnection = function(connection:any){
    return connection.target.indexOf('end-dndnode') === -1
  }
</script>