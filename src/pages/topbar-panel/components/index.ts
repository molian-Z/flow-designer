import { computed } from 'vue'
interface comps {
  index ?: number
  name : string
  render : any
  setup : any
  __file ?: any
  __hmrId ?: any
  __name ?: any
}
const modules : any = import.meta.globEager('./*.vue')
const comps : comps[] = []
for (const path in modules) {
  console.log(modules[path])
  comps.push(modules[path].default)
}
export const appendComponents = []
export default computed(() => {
  return comps.sort((a : comps, b : comps) => {
    return a.index - b.index
  })
})