import {
  nextTick,watch,getCurrentInstance,h
} from 'vue'
import {
  MarkerType
} from '@vue-flow/core'

import edgeLabelContainer from '@/components/edge-label-container/index.vue'

export function useCompsDrag(flowList:any, historyRef:any, {
  project,
  addNodes,
  addEdges,
  updateEdge,
  vueFlowRef
}:any) {
  const { proxy } = getCurrentInstance()
  const props = proxy.$props
  
  //连线开始时(校验)
  function onConnectStart(params:any){
    //console.log(params)
  }
  
  // 连接线处理
  function onConnected(params:any) {
    if(params.source === params.target){
      return false
    }
    const id = 'edge-' + flowList.value.length
    const options = {
      name: id,
      type: 'smoothstep',
      label: 'custom label text',
      labelStyle: {
        fill: '#10b981',
        fontWeight: 500,
        fontSize:'16px'
      },
      labelBgStyle:{},
      labelShowBg:true,
      style:{},
      labelBgPadding: [0,0],
      labelBgBorderRadius: 5,
      markerEnd: MarkerType.ArrowClosed,
      markerStart:'',
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
      ...options,
      id:id,
      label: ()=>h(edgeLabelContainer,{label:options.label,vueFlowRef}),
    })
    nextTick(() => {
      historyRef.commit()
    })
    const vueFlow = vueFlowRef.value.__vnode.ctx.exposed
    const snode = vueFlow.findNode(params.source)
    snode.sourceEdges.push(id)
    const tnode = vueFlow.findNode(params.target)
    tnode.targetEdges.push(id)
  }
  
  //连线结束时
  function onConnectEnd(event:any){
    //console.log(event)
  }
  
  //连接线更新开始
  function onEdgeUpdateStart(edge:any) {
    return console.log('start update', edge)
  }

  //更新连接线时执行
  function onEdgeUpdated({
    edge,
    connection
  }:any) {
    return updateEdge(edge, connection)
  }
  
  //连接线更新结束
  function onEdgeUpdateEnd(edge:any) {
    return console.log('end update', edge)
  }
  

  //左侧组件库拖动时执行
  function onDragOver(event:any) {
    event.preventDefault()

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
  }
  
  //左侧组件库拖放至flow容器中执行
  function onDrop(event:any) {
    const {
      left,
      top
    } = vueFlowRef.value.getBoundingClientRect()
  
    const position = project({
      x: event.clientX - left,
      y: event.clientY - top,
    })
    const widget = JSON.parse(event.dataTransfer?.getData('application/vueflow'))
    let id = widget.type + '-' + widget.key + '_' + flowList.value.length
    widget.options.name = id
    const node = {
      widget:{
        ...widget,
        id:id,
        position
      },
      props,
      type:'node'
    }
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
      const node = vueFlowRef.value.__vnode.ctx.exposed.findNode(newNode.id)
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
  function onNodeDragEnd(e:any) {
    updateFlowPositionToId(e.node.id, e.node.position)
  }
  
  //更新flow位置并保存历史记录
  function updateFlowPositionToId(id:string, position:any) {
    const node = vueFlowRef.value.__vnode.ctx.exposed.findNode(id)
    node.data.widget.position = position
    node.position = position
    nextTick(() => {
      historyRef.commit()
    })
  }

  return {
    onConnectStart,
    onConnected,
    onConnectEnd,
    onEdgeUpdateStart,
    onEdgeUpdated,
    onEdgeUpdateEnd,
    onDragOver,
    onDrop,
    onNodeDragEnd,
  }
}