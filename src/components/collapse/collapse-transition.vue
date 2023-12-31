<template>
  <transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled" @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
  import {
    defineEmits,
    defineProps
  } from 'vue'
  const props = defineProps({
    duration:{
      type:Number,
      default:200
    }
  })
  const $emit = defineEmits(['onBeforeEnter', 'onEnter', 'onAfterEnter', 'onEnterCancelled', 'onBeforeLeave', 'onLeave',
    'onAfterLeave', 'onLeaveCancelled'
  ])
  // 在元素被插入到 DOM 之前被调用
  // 用这个来设置元素的 "enter-from" 状态
  function onBeforeEnter(el:any) {
    if (!el.dataset)
      el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.style.transition =  Number(props.duration / 1000) + 's'
    el.style.maxHeight = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    $emit('onBeforeEnter')
  }

  // 在元素被插入到 DOM 之后的下一帧被调用
  // 用这个来开始进入动画
  function onEnter(el:any, done:any) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.maxHeight = 0;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
    el.style.overflow = "hidden";
    $emit('onEnter')
    setTimeout(()=>{
      done()
    },props.duration)
  }

  // 当进入过渡完成时调用。
  function onAfterEnter(el:any) {
    el.style.maxHeight = "";
    el.style.overflow = el.dataset.oldOverflow;
    $emit('onAfterEnter')
  }

  function onEnterCancelled(el:any) {

    $emit('onEnterCancelled')
  }

  // 在 leave 钩子之前调用
  // 大多数时候，你应该只会用到 leave 钩子
  function onBeforeLeave(el:any) {
    if (!el.dataset)
      el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
    $emit('onBeforeLeave')
  }

  // 在离开过渡开始时调用
  // 用这个来开始离开动画
  function onLeave(el:any, done:any) {
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
    $emit('onLeave')
    setTimeout(()=>{
      done()
    },props.duration)
    
  }

  // 在离开过渡完成、
  // 且元素已从 DOM 中移除时调用
  function onAfterLeave(el:any) {
    el.style.maxHeight = "";
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
    $emit('onAfterLeave')
  }

  // 仅在 v-show 过渡中可用
  function onLeaveCancelled(el:any) {

    $emit('onLeaveCancelled')
  }
</script>

<style>
</style>