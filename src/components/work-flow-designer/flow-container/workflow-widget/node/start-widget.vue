<template>
  <div class="node" :class="widget.options.customClass">
    {{widget.options.label}}
  </div>
  <template v-for="pItem in widget.options.position" :key="pItem">
    <Handle :id="pItem" type="source" :position="Position[pItem]" :class="[widget.options['p'+pItem+'Class']]" />
  </template>
</template>


<script>
  import mixin from './nodeConfig'
  export default{
    name: 'startWidget',
    type: 'start',
    mixins:[mixin]
  }
</script>