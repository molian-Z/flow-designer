<template>
  <div ref="itemRef" class="dropdown-menu__item" :class="[activeNode&& 'active']">
    <slot></slot>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const activeNode = ref(false)
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