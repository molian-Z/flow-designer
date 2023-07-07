import { computed, ref } from 'vue'
declare interface comps {
  index ?: number
  name : string
  render : any
  setup : any
  __file ?: any
  __hmrId ?: any
  __name ?: any
}
const modules : any = import.meta.globEager('./*.vue')
const comps = ref<comps[]>([])
for (const path in modules) {
  comps.value.push(modules[path].default)
}
export const addTopComps = function(compData:comps[]){
  comps.value.push(...compData)
}
export default computed(() => {
  const allComps = comps.value
  return allComps.sort((a : comps, b : comps) => {
    return a.index - b.index
  })
})