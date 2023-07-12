import { computed, markRaw } from 'vue'
import workflowWidget from './workflow-widget/index'
import {
  useMagicKeys,
  whenever
} from '@vueuse/core'
import magicKeysData from './magicKeys.json'
import { $t } from '@/utils/i18n'

export default function({
  historyRef,
  $emit
}:any) {
  const keys = useMagicKeys()
  for (let key in magicKeysData) {
    const item = magicKeysData[key]
    whenever(keys[item.key], () => {
      command(item.command)
    })
  }

  const command = function(cmd:string) {
    switch (cmd) {
      case 'undo':
        historyRef.canUndo.value && historyRef.undo()
        break;
      case 'redo':
        historyRef.canRedo.value && historyRef.redo()
        break;
      default:
        break;
    }
    $emit('command',cmd)
  }
  
  const nodeTypes = computed(() => {
    const nTypes = {}
    for (let key in workflowWidget.value) {
      nTypes[workflowWidget.value[key].type] = markRaw(workflowWidget.value[key])
    }
    return nTypes
  })
  
  function clearFlowData() {
    $emit('update:modelValue', [])
    historyRef.commit()
  }
  
  function isValidWarning(widgets:any){
    widgets.forEach((widget:any) =>{
      if(widget.type !== 'edge'){
        widget.isWarning = false
        widget.warningData = []
        if (widget.rules) {
          if (widget.rules.source) {
            if (widget.sourceEdges && widget.sourceEdges.length === 0 || !widget.sourceEdges) {
              widget.warningData.push({
                label:widget.options.label,
                name:widget.options.name,
                id:widget.id,
                message:$t('warning.missingTarget')
              })
              widget.isWarning = true
            }
          }
          if (widget.rules.target) {
            if (widget.targetEdges && widget.targetEdges.length === 0 || !widget.targetEdges) {
              widget.warningData.push({
                label:widget.options.label,
                name:widget.options.name,
                id:widget.id,
                message:$t('warning.missingSource')
              })
              widget.isWarning = true
            }
          }
        }
      }
    })
  }
  
  return {
    nodeTypes,
    clearFlowData,
    isValidWarning
  }
}