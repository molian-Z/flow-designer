import {
  useDark
} from '@vueuse/core'
import {
  setLang,
  currentLang
} from '@/utils/i18n'


export const isDark = useDark()

export const setDark = function(val){
  isDark.value = val
}

export const i18n = {
  setLang,
  currentLang
}