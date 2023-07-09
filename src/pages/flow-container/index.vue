<template>
  <div class="workflow-container">
    <div class="full-height-width dndflow" @drop="onDrop">
      <VueFlow fit-view-on-init v-model="flowList" @nodeDragStop="onNodeDragEnd" @onedge-update="onEdgeUpdate"
        @connect="onConnected" @edge-update-start="onEdgeUpdateStart" @edge-update-end="onEdgeUpdateEnd"
        @dragover="onDragOver" :nodeTypes="nodeTypes">
        <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
          <CustomConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
        </template>
          <Background></Background>
          <MiniMap pannable zoomable></MiniMap>
          <Controls>
            <slot name="controlButton"></slot>
          </Controls>
      </VueFlow>
    </div>
    <!-- <settingPanel></settingPanel> -->
    <toolbarPanel ref="workflowToolbarRef"></toolbarPanel>
  </div>
</template>

<script setup name="workflowDesigner">
  //register components
  import {
    VueFlow,
    useVueFlow
  } from '@vue-flow/core'
  import {
    Background
  } from '@vue-flow/background'
  import {
    MiniMap
  } from '@vue-flow/minimap'
  import {
    Controls
  } from '@vue-flow/controls'

  import {
    useManualRefHistory
  } from '@vueuse/core'

  
  import toolbarPanel from './toolbar-panel/index.vue'
  import CustomConnectionLine from './workflow-widget/line/index.vue'
  import edgeLabelContainer from '@/components/edge-label-container/index.vue'
  /* import settingPanel from './setting-panel/index' */
  //register methods
  import {
    ref,
    watch,
    computed,
    defineProps,
    defineEmits,
    defineOptions,
    defineExpose,
    provide,
    h
  } from 'vue'
  import initDesigner from './designer'
  import {
    useCompsDrag
  } from './compsDrag'
  defineOptions({
    name: 'flowContainer'
  })
  const {
    project,
    addNodes,
    addEdges,
    updateEdge,
    vueFlowRef
  } = useVueFlow()
  provide('vueFlow', vueFlowRef)
  const props = defineProps({
    designer: Object,
    modelValue: Array,
    topbarRef: {
      type: Object,
      default: function() {
        return {}
      }
    }
  })
  const $emit = defineEmits(['update:modelValue','command'])
  const workflowToolbarRef = ref()
  
  /* 数据处理 */
  const flowList = computed({
    get() {
      const list = props.modelValue.map(widget => {
        const node = {
          props,
          widget
        }
        if (widget && widget.type === 'edge') {
          return {
            ...widget.options,
            id: widget.id,
            data: node,
            label: ()=> h(edgeLabelContainer,{label:widget.options.label,vueFlowRef}),
          }
        } else if (widget) {
          return {
            id: widget.id,
            position: widget.position,
            type: widget.type,
            label: widget.options.label,
            data: node
          }
        }
      })
      return list
    },
    set(e) {
      const newData = e.map(item => {
        return item.data.widget
      })
      if (JSON.stringify(props.modelValue) !== JSON.stringify(newData)) {
        $emit('update:modelValue', newData)
        historyData.value = newData
      }
    }
  })

  const historyData = ref([])

  watch(historyData, (val) => {
    $emit('update:modelValue', val)
  })

  /* history records */
  const historyRef = useManualRefHistory(historyData, {
    deep: true,
    clone: true,
    capacity: 20
  })

  const {
    nodeTypes,
    clearFlowData
  } = initDesigner({
    designer: props.designer,
    historyRef,
    $emit
  })

  const {
    onConnected,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onDragOver,
    onDrop,
    onNodeDragEnd,
  } = useCompsDrag(flowList, historyRef, {
    project,
    addNodes,
    addEdges,
    updateEdge,
    vueFlowRef
  })

  defineExpose({
    historyRef,
    vueFlowRef,
    flowList,
    flowData:historyData,
    clearFlowData
  })
</script>

<style lang="scss">
  @import '@vue-flow/core/dist/style.css';
  @import '@vue-flow/core/dist/theme-default.css';
  @import '@vue-flow/controls/dist/style.css';
  @import '@vue-flow/minimap/dist/style.css';
  @import '@vue-flow/node-resizer/dist/style.css';

  .workflow-container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .full-height-width {
      height: 100%;

      .no-widget-hint {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 18px;
        color: #999999;
      }
    }
  }

  .vue-flow__minimap {
    transform: scale(75%);
    transform-origin: bottom right;
  }
</style>