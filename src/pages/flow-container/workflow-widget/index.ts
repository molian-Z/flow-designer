import { ref, computed } from 'vue'
import {
  addWidgets
} from '@/pages/left-panel/widgetsConfig'
const nodeModules = import.meta.globEager('./node/*.vue')
const edgeModules = import.meta.globEager('./edge/*.vue')
const modules = { ...nodeModules, ...edgeModules }
const comps = ref({})
for (const path in modules) {
  let cname = modules[path].default.name
  comps.value[cname] = modules[path].default
}
interface comps {
  index ?: number
  name : string
  type : string
  options: any
  category: string
  icon : string
  render : any
  setup : any
  __file ?: any
  __hmrId ?: any
  __name ?: any
}

export const addNodeComps = function (compData : comps[]) {
  compData.forEach((comp:comps) =>{
    comps.value[comp.name] = comp
  })
}

export default computed(() => {
  for (let key in comps.value) {
    const {index ,name ,type, options ,category ,icon } = comps.value[key]
    addWidgets({index ,name ,type, options ,category ,icon})
  }
  return comps.value
})