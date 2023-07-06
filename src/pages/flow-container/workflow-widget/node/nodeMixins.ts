import {
  defineEmits,
  getCurrentInstance
} from 'vue'

export function useMixins() {
  const ctx = getCurrentInstance()
  const attrs = ctx.attrs
  const $emit = defineEmits(['change', 'gradient'])
  const onSelect = function(color) {
    $emit('change', color)
  }

  const onGradient = function() {
    $emit('gradient')
  }

  return {
    data: attrs.data,
    designer: attrs.data.props.designer,
    widget: attrs.data.widget,
    formConfig: attrs.data.formConfig,
    globalDsv: attrs.data.globalDsv,
    onSelect,
    onGradient
  }
}