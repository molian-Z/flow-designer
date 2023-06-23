import {
  ref,computed
} from 'vue'
import { useCloned } from '@vueuse/core'

export const languageObj = ref([])
const langResources = ref([])
const langFiles = import.meta.globEager('./**/*.js')
const lang = ref()

export const setLanguage = function(newLang){
  lang.value = newLang
}

for (const path in langFiles) {
  let __dir = path.split('/')
  languageObj.value.push({
    label: langFiles[path].name,
    value: __dir[1]
  })
  if (!langResources.value[__dir[1]]) {
    langResources.value[__dir[1]] = {}
  }
  langResources.value[__dir[1]] = {
    ...langFiles[path].default
  }
}

const lang_revange = function(data) {
  var _data = {};
  var Rcallee = function(obj,name) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        if(name){
          const newKey = name+'.'+key
          obj[newKey] = Rcallee(obj[key],newKey);
        }else{
          obj[key] = Rcallee(obj[key],key);
        }
      } else {
        if(name){
          const newKey = name+'.'+key
          _data[newKey] = obj[key];
        }else{
          _data[key] = obj[key];
        }
      }
    }
  }
  Rcallee(data);
  return _data;
}

export const langResource = computed(()=>{
  const { cloned } = useCloned(langResources.value[lang.value])
  return lang_revange(cloned.value)
}) 