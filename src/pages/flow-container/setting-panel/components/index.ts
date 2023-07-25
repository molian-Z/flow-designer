import { computed, ref } from 'vue'
interface comps {
  index ?: number
  name : string
  split ?: boolean
  render : any
  setup : any
  __file ?: any
  __hmrId ?: any
  __name ?: any
}

interface config {
  sort: 'asc' | 'desc'
}

const modules : any = import.meta.globEager('./*.vue')
const comps = ref<comps[]>([])
for (const path in modules) {
  comps.value.push(modules[path].default)
}

export const settingConfig = ref<config>({
  sort: 'asc'
})

export const setSettingConfig = function(config:config){
  settingConfig.value = {
    ...settingConfig,
    ...config
  }
}

export const addSettingComps = function(compData:comps[]){
  comps.value.push(...compData)
}

export default computed(() => {
  return comps.value.sort((a : comps, b : comps) => {
    if (settingConfig.value.sort === 'asc') {
      return a.index - b.index
    } else if (settingConfig.value.sort === 'desc') {
      return b.index - a.index
    }
  })
})