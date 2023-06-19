<template>
  <div class="workflow-header">
    <div class="workflow-header__body">
      <div class="workflow-header__body-left">
        <svg-icon icon-class="undo" class="color-svg-icon" @click="click('undo')"></svg-icon>
        <svg-icon icon-class="redo" class="color-svg-icon" @click="click('redo')"></svg-icon>
      </div>
      <div class="workflow-header__body-right">
        <template v-for="comp in components" :key="comp.name">
          <component :is="comp" @click="click(comp.name)"></component>
        </template>
		<slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    nextTick,
    watch,
    computed,
    defineProps,
    defineEmits,
    defineOptions
  } from 'vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import components from './components/index'
  const props = defineProps({
    designer: Object,
    modelValue: Array,
    flowRef:{
      type:Object,
      default:function(){
        return{}
      }
    }
  })
  const click = function(type){
	  console.log(type)
	  console.log(props.flowRef)
	  props.flowRef.undo()
  }
</script>

<style lang="scss">
  .workflow-header{
    min-height: 42px;
    max-height: 42px;
    
    .workflow-header__body{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding:0 15px;
      .workflow-header__body-left{
        display: flex;
        align-items: center;
        >*:not(:last-child){
          margin-right: 30px;
        }
      }
	  .color-svg-icon{
	    font-size: 16px;
	    transition: var(--transition);
	    color: var(--color-primary);
	    cursor: pointer;
	    &:hover{
	      opacity: .3;
	    }
	    &:first-child{
	      margin-right: 15px;
	    }
	  }
    }
  }
</style>