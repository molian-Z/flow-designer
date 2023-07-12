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
    index: 1,
    name: 'stepWidget',
    type: 'step',
    icon: 'node-step',
    rules:{
      source:true,
      target:true,
    },
    options: {
      name: '',
      label: 'stepNode',
      customClass: '',
      hidden: false,
      position: ['Left', 'Right'],
      pTopClass: '',
      pLeftClass: '',
      pRightClass: '',
      pBottomClass: ''
    }
  })
  const {
    widget
  } = useMixins()

  const isValidConnection = function(connection: any) {
    return connection.target.indexOf('start-dndnode') === -1
  }
</script>