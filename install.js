/* pages */
import flowDesigner from '@/pages/index.vue'
import topbarPanel from '@/pages/topbar-panel/index.vue'
import leftPanel from '@/pages/left-panel/index.vue'
import flowContainer from '@/pages/flow-container/index.vue'
import 'virtual:svg-icons-register'

flowDesigner.install = function(app){
  
  app.component(flowDesigner.name,flowDesigner)
  
 /* app.component(VueFlow.name,VueFlow)
  app.component(Background.name,Background)
  
  app.component(MiniMap.name,MiniMap)
  app.component(Controls.name,Controls) */
}

topbarPanel.install = function(app){
  app.component(topbarPanel.name,topbarPanel)
}

leftPanel.install = function(app){
  app.component(leftPanel.name,leftPanel)
}

flowContainer.install = function(app){
  app.component(flowContainer.name,flowContainer)
}

const components = [
  flowDesigner,
  topbarPanel,
  leftPanel,
  flowContainer
]

const install = (app) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}


export default {
  flowDesigner,
  topbarPanel,
  leftPanel,
  flowContainer,
  install
}