<template>
  <NodeResizer min-width="50" min-height="20" :isVisible="selected"></NodeResizer>
  <div class="node-container" :style="styles" :class="[widget.options.customClass,isWarning && 'is-warning']">
    <div class="vue-flow-edit-label__input-container" v-if="isDbl">
      <textarea ref="textareaRef" :style="{color:currentRefColor}" v-model="editName" />
    </div>
    <slot v-else></slot>
  </div>
  <template v-for="(pItem,index) in widget.options.position" :key="pItem+'_'+index">
    <Handle :id="pItem+'_'+index" :position="Position[pItem]" :class="[widget.options['p'+pItem+'Class']]"
      :is-valid-connection="isValidConnection" />
  </template>
</template>

<script setup lang="ts">
  import { getCurrentInstance, computed, ref, watch, nextTick, onMounted, defineOptions, defineProps } from 'vue'
  import { NodeResizer } from '@vue-flow/node-resizer'
  import {
    Handle,
    Position
  } from '@vue-flow/core'
  defineOptions({
    name: 'nodeContainer'
  })

  defineProps({
    isValidConnection: {
      type: Function,
      default: function () {
        return true
      }
    }
  })

  const isDbl = ref<boolean>(false)
  const { parent } = getCurrentInstance()
  const currentNode = ref<any>(null)
  const textareaRef = ref<any>(null)
  const currentRefColor = ref<string>('rgb(255,255,255)')

  const editName = computed({
    get() {
      return currentNode.value.data.widget.options.label
    },
    set(val) {
      currentNode.value.data.widget.options.label = val
    }
  })

  const selected = computed(() => {
    return parent.proxy.$attrs.selected
  })
  const styles = computed(() => {
    return parent.proxy.$attrs.data.widget.options.style
  })

  const widget = computed(() => {
    return parent.proxy.$attrs.data.widget
  })

  const isWarning = computed(() => {
    return widget.value.isWarning
  })

  onMounted(() => {
    currentRefColor.value = window.getComputedStyle(parent.vnode.el.nextElementSibling).color
  })

  watch(selected, (val : boolean) => {
    if (!val) {
      isDbl.value = false
    }
  })

  parent.proxy.$attrs.events.doubleClick((e : any) => {
    currentNode.value = e.node
    isDbl.value = true
    nextTick(() => {
      textareaRef.value.focus()
    })
  })
</script>

<style scoped lang="scss">
  .node-container {
    position: relative;

    .vue-flow-edit-label__input-container {
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      width: 100%;
      height: 100%;

      textarea {
        width: 100% !important;
        height: 100% !important;
        border-radius: var(--border-radius);
        background-color: transparent;
        border-width: 0px;
        outline: none;
        resize: none;
        overflow-y: hidden;
      }
    }

    &.is-warning {
      outline: 2px dashed var(--color-danger);
    }
  }
</style>