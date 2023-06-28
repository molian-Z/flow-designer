<template>
  <NodeResizer min-width="50" min-height="20" :isVisible="selected"></NodeResizer>
  <div class="node">
    <div class="vue-flow-edit-label__input-container" v-if="isDbl">
      <textarea ref="textareaRef" v-model="editName" />
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup>
  import { getCurrentInstance, computed, ref, watch, nextTick } from 'vue'
  import {NodeResizer} from '@vue-flow/node-resizer'
  const isDbl = ref(false)
  const {parent} = getCurrentInstance()
  const currentNode = ref()
  const textareaRef = ref()
  const editName = computed({
    get(){
      return currentNode.value.data.widget.options.label
    },
    set(val){
      currentNode.value.data.widget.options.label = val
    }
  })
  const selected = computed(()=>{
    return parent.proxy.$attrs.selected
  })
  
  watch(selected,(val)=>{
    if(!val){
      isDbl.value = false
    }
  })
  
  parent.attrs.events.doubleClick((e)=>{
    currentNode.value = e.node
    isDbl.value = true
    nextTick(()=>{
      textareaRef.value.focus()
    })
  })
</script>

<style scoped lang="scss">
  .node{
    position: relative;
    
    .vue-flow-edit-label__input-container{
      border:1px solid var(--border-color);
      border-radius: var(--border-radius);
      width: 100%;
      height: 100%;
      textarea{
        width: 100% !important;
        height: 100% !important;
        border-radius: var(--border-radius);
        color:var(--color-white);
        background-color: transparent;
        border-width: 0px;
        outline: none;
        resize:none;
        overflow-y: hidden;
      }
    }
  }
</style>