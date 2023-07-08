import { computed, markRaw } from 'vue'
import workflowWidget from './workflow-widget/index'
import {
  useMagicKeys,
  whenever
} from '@vueuse/core'
import magicKeysData from './magicKeys.json'

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

  const command = function(cmd) {
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
  
  return {
    nodeTypes,
    clearFlowData
  }
}