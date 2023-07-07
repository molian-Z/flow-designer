<template>
  <node-container :class="widget.options.customClass">
    {{widget.options.label}}
  </node-container>
  <template v-for="pItem in widget.options.position" :key="pItem">
    <Handle :id="pItem" type="target" :position="Position[pItem]" :class="[widget.options['p'+pItem+'Class']]" />
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
    index: 2,
    name: 'endWidget',
    type: 'end',
    icon: 'node-end',
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
</script>