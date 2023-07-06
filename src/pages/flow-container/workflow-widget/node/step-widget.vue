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
   name: 'stepWidget',
   type: 'step'
 })
 const {
   widget
 } = useMixins()
</script>