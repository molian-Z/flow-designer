<template>
  <node-container :class="widget.options.customClass">
    {{widget.options.label}}
  </node-container>
  <template v-for="pItem in widget.options.position" :key="pItem">
    <Handle :id="pItem" type="source" :position="Position[pItem]" :class="[widget.options['p'+pItem+'Class']]" />
  </template>
</template>


<script setup>
  import nodeContainer from '@/components/node-container/index.vue'
 import {
   defineOptions
 } from 'vue'
 import {
   Handle,
   Position
 } from '@vue-flow/core'
 import {
   useMixins
 } from './nodeMixins'
 defineOptions({
   category: 'basicFields',
   index: 1,
   name: 'stepWidget',
   type: 'step',
   icon: 'node-step',
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
</script>