import { ref, computed } from 'vue'
import { useArrayUnique, useSorted } from '@vueuse/core'
interface widgetFieldComps {
  category : string
  index ?: number
  name : string
  type : string
  icon : string
  options : any
}
const widgetComps = ref<{
  basicFields : widgetFieldComps[]
  svgFields : widgetFieldComps[]
}>({
  basicFields: [],
  svgFields: []
})

interface widget {
  category : string
  index ?: number
  name : string
  type : string
  widget : any
}

export const addWidgets = function (widgetObj : widget) {
  const { category } = widgetObj
  if (!widgetComps.value[category]) {
    widgetComps.value[category] = []
  }
  widgetComps.value[category].push(widgetObj)
  widgetComps.value[category] = useArrayUnique(widgetComps.value[category], (a : widget, b : widget) => {
    return a.name === b.name
  })
}

export default computed(() => {
  for (let key in widgetComps.value) {
    useSorted(widgetComps.value[key], (a, b) => {
     return a.index - b.index
    },{
      dirty: true,
    })
  }
  return widgetComps.value
})