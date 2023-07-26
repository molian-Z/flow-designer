import type { App } from 'vue'
import 'virtual:svg-icons-register'
import '@/components/color-gradient-picker-vue3/style.css';
/* pages */
import JsonViewer from 'vue-json-viewer'
import workFlowDesigner from '@/pages/index.vue'
import topbarPanel from '@/pages/topbar-panel/index.vue'
import leftPanel from '@/pages/left-panel/index.vue'
import flowContainer from '@/pages/flow-container/index.vue'

import {
  setDark,
  i18n
} from '@/utils/exposeConfig'

/* components */
import popover from '@/components/popover/index.vue'
import svgIcon from '@/components/svg-icon/index.vue'
import nodeContainer from '@/components/node-container/index.vue'


const setConfig = function (config : any) {
  setDark(config.setDark)
  if (!!config.setLang) {
    i18n.setLang(config.setLang)
  }
}

workFlowDesigner.install = function (app : App, config : any) {
  app.component(workFlowDesigner.name, workFlowDesigner)
  app.component(topbarPanel.name, topbarPanel)
  app.component(leftPanel.name, leftPanel)
  app.component(flowContainer.name, flowContainer)
  app.component(popover.name, popover)
  app.component(svgIcon.name, svgIcon)
  app.component(nodeContainer.name,nodeContainer)
  setConfig(config)
}

topbarPanel.install = function (app : App, config : any) {
  app.use(JsonViewer)
  app.component(topbarPanel.name, topbarPanel)
  app.component(popover.name, popover)
  app.component(svgIcon.name, svgIcon)
  setConfig(config)
}

leftPanel.install = function (app : App, config : any) {
  app.component(leftPanel.name, leftPanel)
  app.component(svgIcon.name, svgIcon)
  setConfig(config)
}

flowContainer.install = function (app : App, config : any) {
  app.component(flowContainer.name, flowContainer)
  app.component(popover.name, popover)
  app.component(svgIcon.name, svgIcon)
  app.component(nodeContainer.name,nodeContainer)
  setConfig(config)
}

const install = (app : App, config : any) => {
  app.use(JsonViewer)
  const components = [
    workFlowDesigner,
    topbarPanel,
    leftPanel,
    flowContainer,
    popover,
    svgIcon,
    nodeContainer
  ]
  components.forEach(component => {
    app.component(component.name, component)
  })

  setConfig(config)
}

export default {
  install,
  workFlowDesigner,
  topbarPanel,
  leftPanel,
  flowContainer
}


/* 开放API */

export { setDark, i18n } from '@/utils/exposeConfig'
export { addTopComps } from '@/pages/topbar-panel/components/index'
export { addToolComps, addToolMoreComps, setToolbarConfig } from '@/pages/flow-container/toolbar-panel/components/index'
export { addSettingComps, addSettingCategory } from '@/pages/flow-container/setting-panel/components/index'
export { addNodeComps } from '@/pages/flow-container/workflow-widget/index'
export { useMixins } from '@/pages/flow-container/workflow-widget/node/nodeMixins'
export { Handle, Position } from '@vue-flow/core'