<template>
  <div class="collapse-item-container" ref="collapseItem">
    <div class="collapse-item-header" @click="clcikItem">
      <div class="title">{{title}}</div>
      <div class="arrow" :class="[isOpened?'':'rotate']">
        <svgIcon icon-class="arrow-down"></svgIcon>
      </div>
    </div>
    <collapse-transition>
      <div class="collapse-item-body" v-if="isOpened">
        <div class="collapse-item-body__content">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script setup lang="ts">
  import {
    ref,
    defineProps,
    inject,
    computed
  } from 'vue'
  import collapseTransition from '@/components/collapse/collapse-transition.vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  
  const props = defineProps({
    name: String,
    title: String
  })
  const collapseItem = ref<any>({})
  
  const activeNames = inject('activeNames')
  
  const isOpened = computed(()=>{
    return activeNames.value.indexOf(props.name) > -1
  })
  
  function clcikItem(){
    if(activeNames.value.indexOf(props.name) > -1){
      activeNames.value?.splice(activeNames.value.indexOf(props.name),1)
    }else{
      activeNames.value.push(props.name)
    }
  }
</script>

<style scoped lang="scss">
  .collapse-item-container {
    border-bottom: 1px solid var(--border-color);

    >.collapse-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 15px 5px;
      
      .title{
        color:var(--text-color-primary);
      }

      >.arrow {
        transition: var(--transition);
        color:var(--text-color-primary);
        &.rotate {
          transform: rotate(-90deg);
        }
      }
    }

    >.collapse-item-body {
      >.collapse-item-body__content{
        padding: 15px 5px;
      }
    }
  }

  .hide-enter-active {
    position: absolute;
    z-index: -1;
    animation: hide-in var(--transition);
  }

  .hide-leave-active {
    animation: hide-in var(--transition) reverse;
  }

  @keyframes hide-in {
    0% {
      transform: translate(10px, -30px);
    }

    100% {
      transform: translate(0px, 0px);
    }
  }
</style>