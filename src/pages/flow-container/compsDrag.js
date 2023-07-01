import {
  nextTick,watch,getCurrentInstance, onMounted
} from 'vue'
import {
  MarkerType
} from '@vue-flow/core'

export function useCompsDrag(flowList, historyRef) {
  let setupState = {}
  let project,addNodes,addEdges,updateEdge,vueFlowRef;
  const { proxy } = getCurrentInstance()
  const props = proxy.$props
  onMounted(()=>{
    setupState = getCurrentInstance().setupState
    project = setupState.project
    addNodes = setupState.addNodes
    addEdges = setupState.addEdges
    updateEdge = setupState.updateEdge
    vueFlowRef = setupState.vueFlowRef
  })
  
  // 连接线处理方案
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
  
  //连接线更新开始
  function onEdgeUpdateStart(edge) {
    return console.log('start update', edge)
  }

  //更新连接线时执行
  function onEdgeUpdate({
    edge,
    connection
  }) {
    return updateEdge(edge, connection)
  }
  
  //连接线更新结束
  function onEdgeUpdateEnd(edge) {
    return console.log('end update', edge)
  }
  

  //左侧组件库拖动时执行
  function onDragOver(event) {
    event.preventDefault()

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
  }
  
  //左侧组件库拖放至flow容器中执行
  function onDrop(event) {
    const node = {}
    node.widget = JSON.parse(event.dataTransfer?.getData('application/vueflow'))
    const {
      left,
      top
    } = vueFlowRef.getBoundingClientRect()
  
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
      const node = vueFlowRef.__vnode.ctx.exposed.findNode(newNode.id)
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
  
  //左侧组件库拖放结束时执行
  function onNodeDragEnd(e) {
    updateFlowPositionToId(e.node.id, e.node.position)
  }
  
  //更新flow位置并保存历史记录
  function updateFlowPositionToId(id, position) {
    const node = vueFlowRef.__vnode.ctx.exposed.findNode(id)
    node.data.widget.position = position
    node.position = position
    nextTick(() => {
      historyRef.commit()
    })
  }

  return {
    onConnected,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onDragOver,
    onDrop,
    onNodeDragEnd,
  }
}