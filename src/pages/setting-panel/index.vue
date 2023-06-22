<template>
  <el-container class="panel-container">
    <el-scrollbar class="setting-scrollbar">
      <template v-if="!!designer.selectedWorkflow && !designer.selectedWorkflow.category">
        <el-form :model="optionModel" size="small" label-position="left" label-width="120px" class="setting-form"
          @submit.prevent>
          <el-collapse v-model="widgetActiveCollapseNames" class="setting-collapse">
            <el-collapse-item name="1" v-if="showCollapse(commonProps)"
              :title="i18nt('designer.setting.commonSetting')">
              <template v-for="(editorName, propName) in commonProps">
                <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                  :designer="designer" :selected-workflow="selectedWorkflow" :option-model="optionModel"></component>
              </template>
            </el-collapse-item>

            <el-collapse-item name="2" v-if="showCollapse(advProps)" :title="i18nt('designer.setting.advancedSetting')">
              <template v-for="(editorName, propName) in advProps">
                <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                  :designer="designer" :selected-workflow="selectedWorkflow" :option-model="optionModel"></component>
              </template>
            </el-collapse-item>

            <el-collapse-item name="3" v-if="showEventCollapse() && showCollapse(eventProps)"
              :title="i18nt('designer.setting.eventSetting')">
              <template v-for="(editorName, propName) in eventProps">
                <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                  :designer="designer" :selected-workflow="selectedWorkflow" :option-model="optionModel"
                  :event-handled="getEventHandled(propName)"></component>
              </template>
            </el-collapse-item>
          </el-collapse>

        </el-form>
      </template>

      <template v-if="(!!designer.selectedWorkflow && !!designer.selectedWorkflow.category)">
        <el-form :model="optionModel" size="small" label-position="left" label-width="120px" class="setting-form"
          @submit.prevent>
          <el-collapse v-model="widgetActiveCollapseNames" class="setting-collapse">
            <el-collapse-item name="1" v-if="showCollapse(commonProps)"
              :title="i18nt('designer.setting.commonSetting')">
              <template v-for="(editorName, propName) in commonProps">
                <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                  :designer="designer" :selected-workflow="selectedWorkflow" :option-model="optionModel"></component>
              </template>
            </el-collapse-item>

            <el-collapse-item name="2" v-if="showCollapse(advProps)" :title="i18nt('designer.setting.advancedSetting')">
              <template v-for="(editorName, propName) in advProps">
                <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                  :designer="designer" :selected-workflow="selectedWorkflow" :option-model="optionModel"></component>
              </template>
            </el-collapse-item>

            <el-collapse-item name="3" v-if="showEventCollapse() && showCollapse(eventProps)"
              :title="i18nt('designer.setting.eventSetting')">
              <template v-for="(editorName, propName) in eventProps">
                <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                  :designer="designer" :selected-workflow="selectedWorkflow" :option-model="optionModel"
                  :event-handled="getEventHandled(propName)"></component>
              </template>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </template>

      <template v-if="!designer.selectedWorkflow">
        <el-empty :description="i18nt('designer.hint.noSelectedWidgetHint')"></el-empty>
      </template>

    </el-scrollbar>

  </el-container>
</template>

<script>
  import i18n from "@/utils/i18n"
  import emitter from "@/utils/emitter";
  import propertyEditor from './property-editor/index'
  import WorkflowProperties,{propertyRegistered} from './propertyRegister'
  const {
    COMMON_PROPERTIES,
    ADVANCED_PROPERTIES,
    EVENT_PROPERTIES
  } = WorkflowProperties
  export default {
    mixins: [i18n, emitter],
    components:{...propertyEditor},
    props: {
      designer: Object,
      selectedWorkflow: Object,
      formConfig: Object,
      globalDsv: {
        type: Object,
        default: () => ({})
      },
    },
    provide() {
      return {
        getGlobalDsv: () => this.globalDsv, // 全局数据源变量
      }
    },
    inject: ['getDesignerConfig'],
    data() {
      return {
        designerConfig: this.getDesignerConfig(),
        
        widgetActiveCollapseNames:['1','2','3'],
        
        commonProps: COMMON_PROPERTIES,
        advProps: ADVANCED_PROPERTIES,
        eventProps: EVENT_PROPERTIES,
      }
    },
    watch: {
      'designer.selectedWorkflow': {
        handler(val) {
          if (!!val) {
            this.designer.saveCurrentHistoryStep()
          }
        }
      },

      'selectedWorkflow.options': { //组件属性变动后，立即保存表单JSON！！
        deep: true,
        handler() {
          this.designer.saveCurrentHistoryStep()
        }
      },
    },
    computed: {
      optionModel: {
        get() {
          return this.selectedWorkflow.options
        },
    
        set(newValue) {
          this.selectedWorkflow.options = newValue
        }
      },
    
    },
    methods:{
      getEventHandled(eventName) {
        return !!this.optionModel[eventName] && (this.optionModel[eventName].length > 0)
      },
      
      showCollapse(propsObj) {
        let result = false
      
        for (let propName in propsObj) {
          if (!propsObj.hasOwnProperty(propName)) {
            continue
          }
      
          if (this.hasPropEditor(propName, propsObj[propName])) {
            result = true
            break
          }
        }
      
        return result
      },
      showEventCollapse() {
        if (this.designerConfig['eventCollapse'] === undefined) {
          return true
        }
      
        return !!this.designerConfig['eventCollapse']
      },
      
      hasPropEditor(propName, editorName) {
        if (!editorName) {
          return false
        }
        /* alert组件注册了两个type属性编辑器，跳过第一个type属性编辑器，只显示第二个alert-type属性编辑器！！ */
        if (propName.indexOf('-') <= -1) {
          let uniquePropName = this.selectedWorkflow.type + '-' + propName
          if (propertyRegistered(uniquePropName)) {
            return false
          }
        }
        
        let originalPropName = propName.replace(this.selectedWorkflow.type + '-', '') //去掉组件名称前缀-，如果有的话！！
        return this.designer.hasConfig(this.selectedWorkflow, originalPropName)
      },
      
      getPropEditor(propName, editorName) {
        let originalPropName = propName.replace(this.selectedWorkflow.type + '-', '') //去掉组件名称前缀-，如果有的话！！
        let ownPropEditorName = `${this.selectedWorkflow.type}-${originalPropName}-editor`
        if (!!this.$options.components[ownPropEditorName]) { //局部注册的属性编辑器组件
          return ownPropEditorName
        }
        //return !!this.$root.$options.components[ownPropEditorName] ? ownPropEditorName : editorName  //Vue2全局注册的属性编辑器组件
        return !!this.$root.$.appContext.components[ownPropEditorName] ? ownPropEditorName :
          editorName //Vue3全局注册的属性编辑器组件
      },
    }
  }
</script>

<style lang="scss" scoped>
  .panel-container {
    padding: 0 10px !important;

    > :deep(.el-tab-pane) {
      width: 300px;
    }
  }

  .setting-scrollbar {
    width:100%;
    height: 100%;

    :deep(.el-scrollbar__wrap) {
      overflow-x: hidden;
      /* IE浏览器隐藏水平滚动条箭头！！ */
    }
  }

  .ds-setting-scrollbar {

    /*width: 284px;*/
    :deep(.el-scrollbar__wrap) {
      overflow-x: hidden;
      /* IE浏览器隐藏水平滚动条箭头！！ */
    }
  }

  .setting-collapse {
    :deep(.el-collapse-item__content) {
      padding-bottom: 6px;
    }

    :deep(.el-collapse-item__header) {
      font-style: italic;
      font-weight: bold;
    }
  }

  .setting-form {
    :deep(.el-form-item__label) {
      font-size: 13px;
      //text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    :deep(.el-form-item--small.el-form-item) {
      margin-bottom: 10px;
    }
  }

  /* 隐藏Chrome浏览器中el-input数字输入框右侧的上下调整小箭头 */
  :deep(.hide-spin-button) input::-webkit-outer-spin-button,
  :deep(.hide-spin-button) input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  /* 隐藏Firefox浏览器中el-input数字输入框右侧的上下调整小箭头 */
  :deep(.hide-spin-button) input[type="number"] {
    -moz-appearance: textfield;
  }

  :deep(.custom-divider.el-divider--horizontal) {
    margin: 10px 0;
  }

  :deep(.custom-divider-margin-top.el-divider--horizontal) {
    margin: 20px 0;
  }

  .small-padding-dialog {
    :deep(.el-dialog__body) {
      padding: 6px 15px 12px 15px;
    }
  }

  :deep(.header-small-mb .el-drawer__header) {
    margin-bottom: 6px;
  }

  :deep(.header-small-mb .el-drawer__body) {
    padding: 12px;
  }

  :deep(.el-button.button-text-highlight) {
    font-weight: bold;
    color: $--color-primary;

    &:hover {
      color: var(--el-button-hover-text-color);
    }
  }

  .is-slider {
    > :deep(.el-tabs__header.is-top) {
      margin: 5px 15px;
    }
  }
</style>