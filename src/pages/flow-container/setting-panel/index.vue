<template>
  <teleport to="body">
    <div class="setting-container" ref="settingRef" :style="positionStyle">
      <div class="setting-header" ref="dragRef" >
        <div class="setting-header__title">配置面板</div>
        <svg-icon icon-class="close" class="setting-header__close"></svg-icon>
      </div>
      <div class="setting-body">
        <div>45646</div>
        <!-- <template v-for="comp in components" :key="comp.name">
          <div class="setting-item" v-if="showComp(comp)">
            <component :is="comp" :vueFlowRef="vueFlowRef" :currentNode="currentNode"></component>
          </div>
        </template> -->
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
  //import components, { settingConfig } from './components/index'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { useDraggable, useStorage } from '@vueuse/core'
  import {
    defineOptions,
    ref,
    inject,
    onMounted,
    watch
  } from 'vue'

  defineOptions({
    name: 'settingPanel'
  })

  const vueFlowRef = inject<any>('vueFlow')
  const settingRef = ref<HTMLElement | null>(null)
  const dragRef = ref<HTMLElement | null>(null)
  const positionStyle = useStorage<any>('setting-panel__position_style', null)
 /* const { edgeClick, nodeClick } = vueFlowRef._object.hooks
  const currentNode = ref<any>(null)
  const visualType = ref<'node' | 'edge'>('node')
  edgeClick.on((data : any) => {
    visualType.value = 'edge'
  })
  nodeClick.on((data : any) => {
    visualType.value = 'node'
  })

  const showComp = function (comp : any) {
    return comp.types.indexOf(visualType.value) > -1
  } */
  
  onMounted(()=>{
    const { right , top } = vueFlowRef.value.getBoundingClientRect()
    const { width } = settingRef.value.getBoundingClientRect()
    const { style } = useDraggable(settingRef, {
      initialValue: { x: right - width - 40, y: top + 40 },
    })
    let isStyle = false
    if(positionStyle.value){
      isStyle = true
    }
    watch(style,(newVal)=>{
      positionStyle.value = newVal
    },{
      immediate:!isStyle
    })
  })
</script>

<style lang="scss">
  .setting-container {
    position: absolute;
    min-width: 260px;
    background-color: var(--bg-color);
    box-shadow: var(--box-shadow-light);
    border-radius: var(--border-radius-body);
    .setting-header{
      padding: 15px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: all-scroll;
      .setting-header__title{
        user-select: none;
      }
      .setting-header__close{
        fill: var(--text-color-primary);
        width: 12px;
        height: 12px;
        cursor: pointer;
        transition: var(--transition);
        &:hover:not(.disabled) {
          opacity: .5;
        }
      }
    }
    .setting-body{
      padding: 15px;
    }
  }
</style>