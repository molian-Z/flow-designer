<template>
  <teleport to="body">
    <transition name="zoom-in-center">
      <div class="setting-container" ref="settingRef" :style="positionStyle" v-show="show">
        <div class="setting-header" ref="dragRef">
          <div class="setting-header__title">{{$t('pages.settingPanel.title')}}</div>
          <svg-icon icon-class="close" class="setting-header__close" @click="show = false"></svg-icon>
        </div>
        <div class="setting-body">
          <collapse :activeNames="activeNames">
            <template v-for="(category) in components" :key="category.name">
              <collapse-item :name="category.name" :title="category.label">
                <template v-for="comp in category.children" :key="comp.name">
                  <div class="setting-item" v-if="showComp(comp) && optionsModel">
                    <component :is="comp" :vueFlowRef="vueFlowRef" :currentNode="currentNode"
                      :optionsModel="optionsModel"></component>
                  </div>
                </template>
              </collapse-item>
            </template>
          </collapse>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
  import components from './components/index'
  import svgIcon from '@/components/svg-icon/index.vue'
  import collapse from '@/components/collapse/index.vue'
  import collapseItem from '@/components/collapse/collapse-item.vue'
  import { useDraggable, useStorage } from '@vueuse/core'
  import { $t } from '@/utils/i18n'
  import {
    defineOptions,
    ref,
    inject,
    onMounted,
    watch,
    computed
  } from 'vue'

  defineOptions({
    name: 'settingPanel'
  })

  const vueFlowRef = inject<any>('vueFlow')
  const vueFlowExpose = inject<any>('vueFlowExpose')
  const settingRef = ref<HTMLElement | null | any>(null)
  const dragRef = ref<HTMLElement | null>(null)
  const positionStyle = useStorage<any>('setting-panel__position_style', null)
  const activeNames = ref<string[]>(['basic', 'event'])
  const currentNode = ref<any>(null)
  const show = ref<boolean>(false)
  const { edgeClick, nodeClick, edgeDoubleClick, nodeDoubleClick } = vueFlowRef._object.hooks
  const visualType = ref<'node' | 'edge'>('node')
  const optionsModel = computed(() => {
    if (currentNode.value) {
      let data
      if (currentNode.value.node) {
        data = vueFlowExpose.findNode(currentNode.value.node.id)
      } else {
        data = vueFlowExpose.findEdge(currentNode.value.edge.id)
      }
      return data?.data?.widget?.options
    } else {
      return null
    }
  })
  edgeClick.on((data : any) => {
    visualType.value = 'edge'
    currentNode.value = data
  })
  nodeClick.on((data : any) => {
    visualType.value = 'node'
    currentNode.value = data
  })

  edgeDoubleClick.on((data : any) => {
    show.value = true
  })

  nodeDoubleClick.on((data : any) => {
    show.value = true
  })

  const showComp = function (comp : any) {
    return !comp.types || comp.types.indexOf(visualType.value) > -1
  }

  onMounted(() => {
    const { right, top } = vueFlowRef.value.getBoundingClientRect()
    const { width } = settingRef.value.getBoundingClientRect()
    const { style } = useDraggable(dragRef, {
      initialValue: { x: right - width - 40, y: top + 40 },
    })
    let isStyle = false
    if (positionStyle.value) {
      isStyle = true
    }
    watch(style, (newVal) => {
      positionStyle.value = newVal
    }, {
      immediate: !isStyle
    })
  })
</script>

<style lang="scss">
  .setting-container {
    position: absolute;
    min-width: 300px;
    background-color: var(--bg-color);
    box-shadow: var(--box-shadow-light);
    border-radius: var(--border-radius-body);

    .setting-header {
      padding: 15px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: all-scroll;

      .setting-header__title {
        user-select: none;
      }

      .setting-header__close {
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

    .setting-body {
      padding: 0 15px 15px;
    }
  }

  .zoom-in-center-enter-active {
    opacity: 0;
    transform: scaleY(0);
  }

  .zoom-in-center-enter-to,
  .zoom-in-center-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform var(--transition) cubic-bezier(0.23, 1, 0.32, 1), opacity var(--transition) cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center center;
  }

  .zoom-in-center-leave-to {
    opacity: 0;
    transform: scaleY(0);
  }
</style>