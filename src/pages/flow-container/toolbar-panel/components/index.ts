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

export const moreComps = ref<comps[]>([])

export const toolbarConfig = ref<config>({
  sort: 'asc'
})

export const setToolbarConfig = function(config:config){
  toolbarConfig.value = {
    ...toolbarConfig,
    ...config
  }
}

export const addToolMoreComps = function(moreCompData:comps[]){
  moreComps.value.push(...moreCompData)
}

export const addToolComps = function(compData:comps[]){
  comps.value.push(...compData)
}

export default computed(() => {
  return comps.value.sort((a : comps, b : comps) => {
    if (toolbarConfig.value.sort === 'asc') {
      return a.index - b.index
    } else if (toolbarConfig.value.sort === 'desc') {
      return b.index - a.index
    }
  })
})