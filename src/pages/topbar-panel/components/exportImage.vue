<template>
  <dropdown ref="popcofirm" @command="command">
    <svg-icon icon-class="export-image" class="color-svg-icon" />
    <template #dropdown>
      <dropdownItem class="color-item" value="toSvg">保存为SVG</dropdownItem>
      <dropdownItem class="color-item" value="toPng">保存为PNG</dropdownItem>
      <dropdownItem class="color-item" value="toJpeg">保存为JPG</dropdownItem>
      <dropdownItem class="color-item" value="save2PDF">保存为PDF</dropdownItem>
    </template>
  </dropdown>
  <fullLoading :modelValue="showLoading"></fullLoading>
</template>

<script setup lang="ts">
  import svgIcon from '@/components/svg-icon/index.vue'
  import fullLoading from '@/components/full-loading/index.vue'
  import {
    dropdown,
    dropdownItem
  } from '@/components/dropdown'
  import domtoimage from 'dom-to-image'
  import {pdfHtml} from '@/components/pdf-html';
  import {
    defineOptions,
    defineProps,
    ref
  } from 'vue'

  defineOptions({
    name: 'exportImage',
    index: 20
  })

  const props = defineProps({
    flowRef: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })

  const showLoading = ref(false)

  const command = function (cmd : string) {
    const options : any = {}
    showLoading.value = true
    const vueFlowRefMethods = props.flowRef.vueFlowRef.__vnode.ctx.exposed
    const SelectedElements = vueFlowRefMethods.getSelectedElements.value
    vueFlowRefMethods.fitView({ padding: .25, includeHiddenNodes: false })
    SelectedElements.forEach((item:any) =>{
      vueFlowRefMethods.removeSelectedElements(item)
    })
    setTimeout(() => {
      if (cmd === 'save2PDF') {
       pdfHtml({
            el: props.flowRef.vueFlowRef.firstElementChild,
            styles:{
              size:'auto'
            }
        })
        showLoading.value = false
      } else {
        if (cmd === 'toJpeg') {
          options.bgcolor = '#FFF'
        }
        domtoimage[cmd](props.flowRef.vueFlowRef.firstElementChild, options)
          .then(function (dataUrl : any) {
            downloadFile(Math.round(new Date()).toString(), dataUrl, cmd);
          })
          .catch((err : any) => {
            showLoading.value = false
            alert(err)
          })
      }
    }, 1000)
  }

  function downloadFile(fileName : string | number, dataUrl : any, cmd : string) { //下载base64图片
    let expandName : string
    switch (cmd) {
      case 'toSvg':
        expandName = '.svg'
        break;
      case 'toPng':
        expandName = '.png'
        break;
      case 'toJpeg':
        expandName = '.jpg'
        break;
      case 'save2PDF':
        expandName = '.pdf'
        break;
      default:
        expandName = '.png'
        break;
    }
    var link : any = document.createElement('a');
    link.download = fileName + expandName;
    link.href = dataUrl;
    link.click();
    showLoading.value = false
  };
</script>

<style lang="scss" scoped>
  .color-item {
    color: var(--color-primary);
  }
</style>