<template>
  <div class="workflow-container">
    <div class="full-height-width dndflow" @drop="onDrop">
      <VueFlow fit-view-on-init :nodeTypes="nodeTypes" v-model="flowList"
        @edge-update-start="onEdgeUpdateStart" @edge-update="onEdgeUpdated" @edge-update-end="onEdgeUpdateEnd"
        @connectStart="onConnectStart" @connect="onConnected" @connectEnd="onConnectEnd"
        @dragover="onDragOver" @nodeDragStop="onNodeDragEnd">
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
    <settingPanel ref="workflowSettingRef"></settingPanel>
  </div>
</template>

<script setup name="workflowDesigner" lang="ts">
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
  import settingPanel from './setting-panel/index.vue'
  import CustomConnectionLine from './workflow-widget/line/index.vue'
  import edgeLabelContainer from '@/components/edge-label-container/index.vue'
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
    h,
    onMounted
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
  }:any = useVueFlow()
  provide('vueFlow', vueFlowRef)
  provide('vueFlowExpose', useVueFlow())
  const props = defineProps({
    designer: {
      type:Object,
      default:function(){
        return{}
      }
    },
    modelValue: {
      type:Array,
      default:function(){
        return []
      }
    },
    topbarRef: {
      type: Object,
      default: function() {
        return {}
      }
    }
  })
  const $emit = defineEmits(['update:modelValue','command'])
  const workflowToolbarRef = ref<any>(null)
  const workflowSettingRef = ref<any>(null)
  
  /* 数据处理 */
  const historyData = ref<any>(null)
  const flowList = computed<any>({
    get() {
      const list = props.modelValue.map((widget:any) => {
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
          widget.sourceEdges = widget.sourceEdges || []
          widget.targetEdges = widget.targetEdges || []
          return {
            id: widget.id,
            position: widget.position,
            type: widget.type,
            label: widget.options.label,
            data: node,
            sourceEdges:widget.sourceEdges,
            targetEdges:widget.targetEdges
          }
        }
      })
      return list
    },
    set(e) {
      const newData = e.map((item:any) => {
        return item.data.widget
      })
      if (JSON.stringify(props.modelValue) !== JSON.stringify(newData) || historyData.value === null) {
        historyData.value = newData
      }
    }
  })

  watch(historyData, (data:any) => {
    isValidWarning(data)
    $emit('update:modelValue', data)
  })

  /* history records */
  const historyRef = useManualRefHistory(historyData, {
    deep: true,
    clone: true,
    capacity: 20
  })

  const {
    nodeTypes,
    clearFlowData,
    isValidWarning
  } = initDesigner({
    designer: props.designer,
    historyRef,
    $emit
  })

  const {
    onConnectStart,
    onConnected,
    onConnectEnd,
    onEdgeUpdateStart,
    onEdgeUpdated,
    onEdgeUpdateEnd,
    onDragOver,
    onDrop,
    onNodeDragEnd,
  } = useCompsDrag(flowList, historyRef, {
    project,
    addNodes,
    addEdges,
    updateEdge,
    vueFlowRef,
    vueFlowExpose:useVueFlow()
  })

  defineExpose({
    historyRef,
    vueFlowRef,
    flowList,
    flowData:historyData,
    clearFlowData,
    vueFlowExpose:useVueFlow()
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
    position: relative;

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