<template>
  <svg-icon icon-class="export-image" class="color-svg-icon" @click="click" />
  <fullLoading :modelValue="showLoading"></fullLoading>
</template>

<script setup lang="ts">
  import svgIcon from '@/components/svg-icon/index.vue'
  import fullLoading from '@/components/full-loading/index.vue'
  import html2canvas from 'html2canvas'
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


  const click = function () {
    showLoading.value = true
    props.flowRef.vueFlowRef.__vnode.ctx.exposed.fitView(/* { padding: 0.25, includeHiddenNodes: true } */)
    setTimeout(()=>{
      html2canvas(props.flowRef.vueFlowRef, {
        allowTaint: false,
        useCORS: true,
      })
      .then(canvas =>{
        //将图片保存到变量
        var image = canvas.toDataURL("image/jpeg");
        downloadFile(Math.round(new Date()).toString(), image);
      })
      .catch(err =>{
        showLoading.value = false
        alert(err)
      })
    },1000)
  }

  function downloadFile(fileName:string|number, content:any) { //下载base64图片
    var base64ToBlob = function (code:any) {
      let parts = code.split(';base64,');
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {
        type: contentType
      });
    };
    let aLink = document.createElement('a');
    let blob = base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
    showLoading.value = false
  };
</script>

<style>
</style>