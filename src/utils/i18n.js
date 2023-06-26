import {useNavigatorLanguage } from '@vueuse/core'
import { computed,watch } from 'vue'
import {languageObj, setLanguage, langResource} from '@/lang/index'
const languages = useNavigatorLanguage()
const {language} = languages

watch(language,(val)=>{
  setLanguage(val)
},{
  immediate:true
})

export const currentLang = computed(()=>{
  const findLang = languageObj.value.find(item =>{
    return item.value === language.value
  })
  return findLang
})

export const languageName = computed(()=>{
  return currentLang.value?.label
})

export const setLang = function(val){
  const findLang = languageObj.value.find(item =>{
    return item.label === val || item.value === val
  })
  if(findLang){
    language.value = findLang.value
    return true
  }else{
    return false
  }
}

export const isSupported = languages.isSupported

export const $t = function(val){
  return langResource.value[val]
}

export default language