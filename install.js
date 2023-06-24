/* pages */
import workFlowDesigner from '@/pages/index.vue'
import topbarPanel from '@/pages/topbar-panel/index.vue'
import leftPanel from '@/pages/left-panel/index.vue'
import flowContainer from '@/pages/flow-container/index.vue'
import 'virtual:svg-icons-register'

workFlowDesigner.install = function(app) {
  app.component(workFlowDesigner.name, workFlowDesigner)
  app.component(topbarPanel.name, topbarPanel)
  app.component(leftPanel.name, leftPanel)
  app.component(flowContainer.name, flowContainer)
}

topbarPanel.install = function(app) {
  app.component(topbarPanel.name, topbarPanel)
}

leftPanel.install = function(app) {
  app.component(leftPanel.name, leftPanel)
}

flowContainer.install = function(app) {
  app.component(flowContainer.name, flowContainer)
}

const install = (app)=>{
  const components = [
    workFlowDesigner,
    topbarPanel,
    leftPanel,
    flowContainer
  ]
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install,
  workFlowDesigner,
  topbarPanel,
  leftPanel,
  flowContainer
}

export * from '@/pages/index.vue'
export * from '@/pages/topbar-panel/index.vue'
export * from '@/pages/left-panel/index.vue'
export * from '@/pages/flow-container/index.vue'