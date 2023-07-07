import {
  useDark
} from '@vueuse/core'
import {
  setLang,
  currentLang,
  $t,
  setLangData
} from '@/utils/i18n'


export const isDark = useDark()

export const setDark = function(val:boolean){
  isDark.value = val
}

export const i18n = <{
  setLang:any
  currentLang:string
  $t:any
  setLangData:any
}>{
  setLang,
  currentLang,
  $t,
  setLangData
}


