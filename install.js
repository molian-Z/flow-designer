/* pages */
import Vue3ColorPicker from "vue3-colorpicker";
import workFlowDesigner from '@/pages/index.vue'
import topbarPanel from '@/pages/topbar-panel/index.vue'
import leftPanel from '@/pages/left-panel/index.vue'
import flowContainer from '@/pages/flow-container/index.vue'
import 'virtual:svg-icons-register'
import {
  setDark,
  i18n
} from '@/utils/exposeConfig'


const setConfig = function(config) {
  setDark(config.setDark)
  if (!!config.setLang) {
    i18n.setLang(config.setLang)
  }
}

workFlowDesigner.install = function(app, config) {
  app.component(workFlowDesigner.name, workFlowDesigner)
  app.component(topbarPanel.name, topbarPanel)
  app.component(leftPanel.name, leftPanel)
  app.component(flowContainer.name, flowContainer)
  setConfig(config)
}

topbarPanel.install = function(app, config) {
  app.use(Vue3ColorPicker)
  app.component(topbarPanel.name, topbarPanel)
  setConfig(config)
}

leftPanel.install = function(app, config) {
  app.component(leftPanel.name, leftPanel)
  setConfig(config)
}

flowContainer.install = function(app, config) {
  app.component(flowContainer.name, flowContainer)
  setConfig(config)
}

const install = (app, config) => {
  const components = [
    Vue3ColorPicker,
    workFlowDesigner,
    topbarPanel,
    leftPanel,
    flowContainer
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

export {setDark, i18n} from '@/utils/exposeConfig'
export * from '@/pages/index.vue'
export * from '@/pages/topbar-panel/index.vue'
export * from '@/pages/left-panel/index.vue'
export * from '@/pages/flow-container/index.vue'