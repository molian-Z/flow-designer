<template>
  <div class="workflow-container">
    <div class="full-height-width dndflow" @drop="onDrop">
      <VueFlow ref="flow" fit-view-on-init v-model="flowList" @nodeDragStop="onNodeDragEnd"
        @onedge-update="onEdgeUpdate" @connect="onConnected" @edge-update-start="onEdgeUpdateStart"
        @edge-update-end="onEdgeUpdateEnd" @dragover="onDragOver" :nodeTypes="nodeTypes" @node-click="onNodeClick"
        @paneClick="onPaneClick" @move="move" @edgeClick="onEdgeClick">
        <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
          <CustomConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
        </template>
        <Background></Background>
        <MiniMap pannable zoomable>
          <!-- <template #node-input="props">
            <MiniMapNode />
          </template> -->
        </MiniMap>
        <Controls>
          <!-- <ControlButton>
            <i class="fa fa-plus"></i>
          </ControlButton> -->
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
    MarkerType
  } from '@vue-flow/core'
  import {
    Background
  } from '@vue-flow/background'
  import {
    MiniMap
  } from '@vue-flow/minimap'
  import {
    Controls,
    ControlButton
  } from '@vue-flow/controls'
  import {getElementByAttr} from '@/utils/util'
  
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
    defineEmits
  } from 'vue'
  import {
    useVueFlow,
    Position
  } from '@vue-flow/core'
  const {
    addNodes,
    project,
    vueFlowRef,
    updateEdge,
    addEdges,
    onConnect,
  } = useVueFlow()
  const props = defineProps({
    designer: Object,
    modelValue: Array,
    topbarRef:{
      type:Object,
      default:function(){
        return{}
      }
    }
  })
  const $emit = defineEmits(['update:modelValue'])
  const selectedWorkflow = ref(null)
  const selectedWorkflowName = ref(null)
  const workflowToolbarRef = ref()
  const flow = ref(null)

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
            id: widget.options.$id,
            data: node
          }
        } else if (widget) {
          return {
            id: widget.options.$id,
            position: widget.position,
            type: widget.type,
            label: widget.options.label || widget.label,
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
      }
    }
  })

  function updateFlowPositionToId(id, position) {
    let cacheIndex = props.modelValue.findIndex(item => {
      return item.options.$id === id
    })
    if (cacheIndex > -1) {
      props.modelValue[cacheIndex].position = position
      //props.designer.emitHistoryChange()
    }
  }

  function onNodeDragEnd(e) {
    updateFlowPositionToId(e.node.data.widget.options.$id, e.node.position)
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
    node.widget.options.label = node.widget.label
    node.widget.options.$id = id
    node.props = props
    node.widget.position = position
    node.type = 'node'
    const newNode = {
      id: id,
      position,
      type: node.widget.type,
      label: node.widget.options.label || node.widget.label,
      data: node
    }
    addNodes(newNode)
    // align node position after drop, so it's centered to the mouse
    nextTick(() => {
      const node = flow.value.findNode(newNode.id)
      const stop = watch(
        () => node.dimensions,
        (dimensions) => {
          if (dimensions.width > 0 && dimensions.height > 0) {
            node.position = {
              x: node.position.x - node.dimensions.width / 2,
              y: node.position.y - node.dimensions.height / 2
            }
            stop()
            updateFlowPositionToId(node.data.widget.options.$id, node.position)
            nextTick(()=>{
              var dom = document.getElementsByClassName('vue-flow__node')
              onNodeClick({
                node,
                event:{target:getElementByAttr(dom,'data-id',newNode.id)[0]}
              })
            })
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
      $id: id,
      id: id,
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
          options
        }
      },
      ...options
    })
    nextTick(() => {
      //props.designer.emitHistoryChange()
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
    workflowToolbarRef.value.show(data)
    const {
      props,
      widget
    } = data.node.data
    const designer = props.designer
    designer.selectedWorkflow = widget
    designer.selectedWorkflowName = widget.options.$id
  }

  function onEdgeClick(data) {
    workflowToolbarRef.value.show(data)
  }

  function onPaneClick(data) {
    workflowToolbarRef.value.close()
  }

  function move(data) {
    workflowToolbarRef.value.close()
  }

</script>

<style lang="scss">
  @import '@vue-flow/core/dist/style.css';
  @import '@vue-flow/core/dist/theme-default.css';
  @import '@vue-flow/controls/dist/style.css';
  @import '@vue-flow/minimap/dist/style.css';

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