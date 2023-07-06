import { ref, computed } from 'vue'
import {
    addWidgetsConfig
  } from '@/pages/left-panel/widgetsConfig'
const nodeModules = import.meta.globEager('./node/*.vue')
const edgeModules = import.meta.globEager('./edge/*.vue')
const modules = { ...nodeModules, ...edgeModules }
const comps = ref({})
for (const path in modules) {
  let cname = modules[path].default.name
  comps.value[cname] = modules[path].default
}

export const addNodeComps = function(compObj:any){
  for (let key in compObj) {
    comps.value[key] = compObj[key]
  }
}

export default computed(() => {
  for (let key in comps.value) {
    if(comps.value[key].widgetConfig){
      addWidgetsConfig(comps.value[key].widgetConfig)
    }
  }
  return comps.value
})