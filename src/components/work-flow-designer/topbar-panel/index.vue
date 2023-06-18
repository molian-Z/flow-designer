<template>
  <div class="workflow-header">
    <div class="workflow-header__body">
      <div class="workflow-header__body-left">
        <svg-icon icon-class="undo" class="color-svg-icon"></svg-icon>
        <svg-icon icon-class="redo" class="color-svg-icon"></svg-icon>
        <div>其他功能</div>
      </div>
      <div class="workflow-header__body-right">
        <template v-for="comp in components" :key="comp.name">
          <component :is="comp"></component>
        </template>
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
</script>

<style lang="scss" scoped>
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
  }
</style>