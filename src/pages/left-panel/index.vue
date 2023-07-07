<template>
  <div class="left-panel">
    <div class="panel-container">
      <collapse :activeNames="activeNames">
        <template v-for="(category,categoryKey) in widgetsCategory" :key="categoryKey">
          <collapse-item :name="categoryKey" :title="$t('pages.leftPanel.collapseName.'+categoryKey)">
            <div class="nodes">
              <template v-for="item in category">
                <div :class="['vue-flow__node-'+item.type,'workflow-model-item']" :draggable="true"
                  @dragstart="onDragStart($event, item)">
                  <svg-icon :icon-class="item.icon" class="color-svg-icon"></svg-icon>
                  <div class="workflow-model-item__label">
                    {{getWidgetLabel(item)}}
                  </div>
                </div>
              </template>
            </div>
          </collapse-item>
        </template>
      </collapse>
    </div>
  </div>
</template>

<script setup>
  import collapse from '@/components/collapse/index.vue'
  import collapseItem from '@/components/collapse/collapse-item.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import { $t } from '@/utils/i18n'
  import {
    ref,
    computed,
    onMounted,
    defineOptions
  } from 'vue'
  import widgetsConfig from "./widgetsConfig"
  
  defineOptions({
    name:'leftPanel'
  })
  let id = 0
  function getId() {
    return `dndnode_${id++}`
  }
  
  const widgetsCategory = computed(()=>{
    const widgetsCates = {}
    for (let key in widgetsConfig.value) {
      widgetsCates[key] = widgetsConfig.value[key].map(fld => {
        return {
          key: getId(),
          ...fld,
          displayName: fld.type
        }
      })
    }
    return widgetsCates
  })
  const activeNames = computed(()=>{
    return Object.keys(widgetsConfig.value)
  })

  function onDragStart(event, node) {
    if (event.dataTransfer) {
      node.key = getId()
      event.dataTransfer.setData('application/vueflow', JSON.stringify(node))
      event.dataTransfer.effectAllowed = 'move'
    }
  }

  function getWidgetLabel(widget) {
    return $t('pages.leftPanel.components.'+widget.type) || widget.label
  }
</script>

<style lang="scss" scoped>
  .left-panel {
    width:100%;
    height: 100%;
    overflow-y: auto;

    .panel-container {
      padding: 0 10px;
      height: 100%;
      background-color: var(--bg-color);

      .nodes {
        display: flex;
        flex-wrap: wrap;

        .workflow-model-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 42px;
          line-height: 32px;
          width: calc(50% - 6px);
          float: left;
          padding: 0;
          margin: 2px 6px 6px 0;
          cursor: move;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          background: var(--bg-color-page);
          border-radius: var(--border-radius);
          border-width: 0px;

          .color-svg-icon {
            color: var(--color-primary);
          }

          transition:var(--transition);
          .workflow-model-item__label{
            margin-right: 1em;
            font-size: 13px;
            color:var(--text-color-primary);
          }
        }

        .workflow-model-item:hover {
          background: var(--color-primary-light-9);
          box-shadow: var(--box-shadow-lighter);
          color: var(--color-primary);

          .color-svg-icon {
            color: var(--color-primary);
          }
        }
      }
    }
  }
</style>