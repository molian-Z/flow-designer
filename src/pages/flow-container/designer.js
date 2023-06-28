import {
  useMagicKeys,
  whenever
} from '@vueuse/core'
import magicKeysData from './magicKeys.json'

export default function({
  designer,
  flowRef,
  historyRef,
  selected
}) {

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
      case 'delete':
      console.log(flowRef)
        //historyRef.commit()
        break;
      default:
        break;
    }
  }
}