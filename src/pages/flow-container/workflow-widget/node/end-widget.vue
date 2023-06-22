<template>
  <div class="node" :class="widget.options.customClass">
    {{widget.options.label}}
  </div>
  <template v-for="pItem in widget.options.position" :key="pItem">
    <Handle :id="pItem" type="target" :position="Position[pItem]" :class="[widget.options['p'+pItem+'Class']]" />
  </template>
</template>


<script>
  import mixin from './nodeConfig'
  export default {
    name: 'endWidget',
    type: 'end',
    mixins:[mixin]
  }
</script>