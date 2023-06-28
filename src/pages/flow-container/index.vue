<template>
  <div class="workflow-container">
    <div class="full-height-width dndflow" @drop="onDrop">
      <VueFlow ref="flowRef" fit-view-on-init v-model="flowList" @nodeDragStop="onNodeDragEnd"
        @onedge-update="onEdgeUpdate" @connect="onConnected" @edge-update-start="onEdgeUpdateStart"
        @edge-update-end="onEdgeUpdateEnd" @dragover="onDragOver" :nodeTypes="nodeTypes" @node-click="onNodeClick"
        @edgeClick="onEdgeClick">
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
    <toolbarPanel ref="workflowToolbarRef" :flowRef="flowRef"></toolbarPanel>
  </div>
</template>

<script setup name="workflowDesigner">
  //register components
  import {
    VueFlow,
    MarkerType,
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

  import workflowWidget from './workflow-widget/index'
  import toolbarPanel from './toolbar-panel/index.vue'
  import CustomConnectionLine from './workflow-widget/line/index.vue'
  /* import settingPanel from './setting-panel/index' */
  //register methods
  import {
    ref,
    nextTick,
    watch,
    markRaw,
    computed,
    defineProps,
    defineEmits,
    defineOptions,
    defineExpose,
    onMounted,
    provide
  } from 'vue'
  import initDesigner from './designer.js'
  defineOptions({
    name: 'flowContainer'
  })
  const {
    addNodes,
    project,
    vueFlowRef,
    updateEdge,
    addEdges
  } = useVueFlow()
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
  const $emit = defineEmits(['update:modelValue'])
  const currentNode = ref(null)
  const workflowToolbarRef = ref()
  const flowRef = ref(null)

  const nodeTypes = computed(() => {
    const nTypes = {}
    for (let key in workflowWidget) {
      nTypes[workflowWidget[key].type] = markRaw(workflowWidget[key])
    }
    return nTypes
  })
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
            data: node
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
    deep:true,
    clone: true,
    capacity: 20
  })

  onMounted(()=>{
    initDesigner({
      flowRef,
      designer:props.designer,
      historyRef
    })
  })



  function updateFlowPositionToId(id, position) {
    const node = flowRef.value.findNode(id)
    node.data.widget.position = position
    node.position = position
    nextTick(() => {
      historyRef.commit()
    })
  }

  function onNodeDragEnd(e) {
    updateFlowPositionToId(e.node.id, e.node.position)
  }

  function onDrop(event) {
    const node = {}
    node.widget = JSON.parse(event.dataTransfer?.getData('application/vueflow'))
    const {
      left,
      top
    } = vueFlowRef.value.getBoundingClientRect()

    const position = project({
      x: event.clientX - left,
      y: event.clientY - top,
    })
    let id = node.widget.type + '-' + node.widget.key + '_' + flowList.value.length
    node.widget.options.name = id
    node.widget.id = id
    node.props = props
    node.widget.position = position
    node.type = 'node'
    const newNode = {
      id: id,
      position,
      type: node.widget.type,
      label: node.widget.options.label,
      data: node
    }
    addNodes(newNode)
    // align node position after drop, so it's centered to the mouse
    nextTick(() => {
      const node = flowRef.value.findNode(newNode.id)
      const stop = watch(
        () => node.dimensions,
        (dimensions) => {
          if (dimensions.width > 0 && dimensions.height > 0) {
            node.position = {
              x: node.position.x - node.dimensions.width / 2,
              y: node.position.y - node.dimensions.height / 2
            }
            stop()
            updateFlowPositionToId(node.id, node.position)
          }
        }, {
          deep: true,
          flush: 'post'
        },
      )
    })
  }

  function onEdgeUpdateStart(edge) {
    return console.log('start update', edge)
  }

  function onEdgeUpdateEnd(edge) {
    return console.log('end update', edge)
  }

  function onEdgeUpdate({
    edge,
    connection
  }) {
    return updateEdge(edge, connection)
  }

  function onConnected(params) {
    const id = 'edge-' + flowList.value.length
    const options = {
      name: id,
      type: 'smoothstep',
      label: 'custom label text',
      labelStyle: {
        fill: '#10b981',
        fontWeight: 700
      },
      markerEnd: MarkerType.ArrowClosed,
      ...params
    }
    addEdges({
      data: {
        props: props,
        widget: {
          type: 'edge',
          id: id,
          options
        }
      },
      ...options
    })
    nextTick(() => {
      historyRef.commit()
    })
    return
  }

  //左侧拖放
  function onDragOver(event) {
    event.preventDefault()

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
  }

  function onNodeClick(data) {
    workflowToolbarRef.value.show(data,flowRef)
  }

  function onEdgeClick(data) {
    workflowToolbarRef.value.show(data,flowRef)
  }

  function clearFlowData() {
    $emit('update:modelValue', [])
    historyRef.commit()
  }
  
  provide('vueFlow',vueFlowRef)
  
  defineExpose({
    historyRef,
    flowRef,
    currentNode,
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