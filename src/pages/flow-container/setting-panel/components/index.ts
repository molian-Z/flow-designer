import { computed, ref } from 'vue'
import { $t } from '@/utils/i18n'
interface comps {
  index ?: number
  category : string
  name : string
  render : any
  setup : any
  __file ?: any
  __hmrId ?: any
  __name ?: any
}

interface category {
  name : string
  label : string
  index ?: number
  children ?: comps[]
}

const modules : any = import.meta.globEager('./*.vue')
const comps = ref<comps[]>([])
const category = ref<category[]>([{
  name: 'basic',
  label: $t('pages.settingPanel.category.basic'),
  index: 0
}, {
  name: 'event',
  label: $t('pages.settingPanel.category.event'),
  index: 10
}])
for (const path in modules) {
  comps.value.push(modules[path].default)
}

export const addSettingComps = function (compData : comps[]) {
  comps.value.push(...compData)
}

export const addSettingCategory = function (categoryData : category[]) {
  category.value.push(...categoryData)
}

export default computed(() => {
  const newComps = comps.value.sort((a : comps, b : comps) => {
    return a.index - b.index
  })
  category.value.forEach(item =>{
    delete item.children
    item.label = $t('pages.settingPanel.category.'+item.name) || item.label
  })
  newComps.forEach((item:comps) => {
    const i = category.value.findIndex((cateItem:category) => {
      return cateItem.name === item.category
    })
    if (i > -1) {
      if(!category.value[i].children){
        category.value[i].children = []
      }
      category.value[i].children.push(item)
    } else {
      category.value.push({
        name: item.category,
        label : item.category,
        index : 999,
        children : [item],
      })
    }
  })
  return category.value.sort((a : comps, b : comps) => {
    return a.index - b.index
  })
})