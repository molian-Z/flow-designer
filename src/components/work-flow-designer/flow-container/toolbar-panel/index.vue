<template>
    <div ref="workflowPopoverRef" class="popper">
       <transition name="zoom-in-bottom">
        <div class="popper-container" v-if="isShow">
          <span> Some content </span>
        </div>
        </transition>
    </div>
</template>

<script setup>
  import {
    createPopper
  } from '@popperjs/core';
  import collapseTransition from '@/components/collapse/collapse-transition.vue'
  import {
    ref,
    defineOptions,
    defineExpose,
    onMounted,
    computed,
    watch,
    defineProps
  } from 'vue'
  defineOptions({
    name: 'toolbar'
  })
  const props = defineProps({
    visible:Boolean,
    placement:{
      type:String,
      default:'top',
    }
  })
  
  const isShow = ref(false)
  const workflowPopoverRef = ref()
  const currentId = ref('')
  
  function generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    });
  }
  
  const virtualElement = ref({
    getBoundingClientRect: generateGetBoundingClientRect(),
  });
  const instance = ref({})
  onMounted(()=>{
    close()
    instance.value = createPopper(virtualElement.value, workflowPopoverRef.value);
  })
  
  const show = function(data) {
    if(data.node.id === currentId.value && isShow.value){
      close()
      return false
    }
    const dom = data.event.target
    const {x,y,width} = dom.getBoundingClientRect()
    const realX = x+(width/2)
    const realY = y - 50
    virtualElement.value.getBoundingClientRect = generateGetBoundingClientRect(realX,realY)
    currentId.value = data.node.id
    isShow.value = true
    instance.value.update()
  }
  const close = function() {
    isShow.value = false
  }

  
  defineExpose({
    show,
    close
  })
</script>

<style lang="scss">
  .popper{
    transition:var(--transition);
    .popper-container{
      background-color: var(--bg-color);
      padding: 10px 15px;
      box-shadow: var(--box-shadow-light);
      border-radius: var(--border-radius);
    }
  }
  
  .zoom-in-bottom-enter-active{
    opacity: 0;
    transform: scaleY(0);
  }
  
  .zoom-in-bottom-enter-to,
  .zoom-in-bottom-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform var(--transition) cubic-bezier(0.23, 1, 0.32, 1), opacity var(--transition) cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center bottom;
  }
  
  .zoom-in-bottom-leave-to {
    opacity: 0;
    transform: scaleY(0);
  }
  
</style>