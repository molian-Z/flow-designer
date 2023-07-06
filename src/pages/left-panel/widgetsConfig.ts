import { ref, computed } from 'vue'
interface widgetFieldComps {
  type : string,
  icon : string,
  options : any
}
const widgetComps = ref<{
  basicFields : widgetFieldComps[]
  svgFields : widgetFieldComps[]
}>({
  basicFields: [{
    type: 'start',
    icon: 'node-start',
    options: {
      name: '',
      label: 'startNode',
      customClass: '',
      hidden: false,
      position: ['Right'],
      pTopClass: '',
      pLeftClass: '',
      pRightClass: '',
      pBottomClass: ''
    },
  }, {
    type: 'step',
    icon: 'node-step',
    options: {
      name: '',
      label: 'stepNode',
      customClass: '',
      hidden: false,
      position: ['Left', 'Right'],
      pTopClass: '',
      pLeftClass: '',
      pRightClass: '',
      pBottomClass: ''
    },
  }, {
    type: 'end',
    icon: 'node-end',
    options: {
      name: '',
      label: 'endNode',
      customClass: '',
      hidden: false,
      position: ['Left'],
      pTopClass: '',
      pLeftClass: '',
      pRightClass: '',
      pBottomClass: ''
    },
  }],
  svgFields: []
})

export const addWidgetsConfig = function (widgetObj : any) {
  for (let key in widgetObj) {
    widgetComps.value[key].push(widgetObj[key])
  }
}


export default computed(() => {
  return widgetComps.value
})