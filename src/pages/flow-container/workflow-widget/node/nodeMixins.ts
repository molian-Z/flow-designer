import {
  defineEmits,
  getCurrentInstance,
  computed
} from 'vue'

export function useMixins() {
  const { proxy }:any = getCurrentInstance()
  
  const widget = computed(()=>{
    return proxy.$attrs.data.widget
  })
  
  return {
    data: proxy.$attrs.data,
    designer: proxy.$attrs.data.props.designer,
    widget: widget,
    formConfig: proxy.$attrs.data.formConfig,
    globalDsv: proxy.$attrs.data.globalDsv
  }
}