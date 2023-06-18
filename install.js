/* import VFormDesigner from '@/components/form-designer/index.vue' */

import ContextMenu from '@imengyu/vue3-context-menu';

import 'virtual:svg-icons-register'

/* import ContainerWidgets from '@/components/form-designer/form-widget/container-widget/index' */

/* import i18n, {addENExtensionLang, addZHExtensionLang} from "@/utils/i18n" */


/* VFormDesigner.install = function (app) {
  addDirective(app)
  loadExtension(app)

  app.use(ContainerWidgets)
  app.use(ContainerItems)
  app.use(DataV, { classNamePrefix: 'data-v-' });
  app.use(ContextMenu)
  app.config.globalProperties.$echarts = echarts;
  registerIcon(app)
  app.component('draggable', Draggable)
  app.component(VFormDesigner.name, VFormDesigner)
  app.component(TableMultiLevelColumn.name, TableMultiLevelColumn)
  app.component(TableHighLevelColumn.name, TableHighLevelColumn)
} */
const components = [
  VFormDesigner
]

const install = (app) => {
  app.use(ContextMenu)
  components.forEach(component => {
    app.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) { /* script方式引入时赋值axios！！ */
  //window.axios = axios
}

export default {
  install
}