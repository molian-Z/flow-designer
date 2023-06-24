<template>
  <div ref="itemRef" class="dropdown-menu__item" :class="[activeNode&& 'active']">
    <slot></slot>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
const activeNode = ref(false)
const itemRef = ref()
onMounted(()=>{
  if(itemRef.value.outerText === itemRef.value.parentNode.__vnode.props.activeName){
    activeNode.value = true
  }
})
</script>

<style lang="scss" scoped>
  .dropdown-menu__item{
    padding: 5px 25px;
    background-color: var(--bg-color);
    transition: var(--transition);
    cursor: pointer;
    font-size: 14px;
    color: var(--text-color-primary);
    &:hover{
      background-color: var(--bg-color-page);
    }
    
    .svg-icon{
      margin-right: 15px;
    }
    
    &.active{
      color:var(--color-primary);
      font-weight: bold;
    }
  }
</style>