<template>
  <div ref="itemRef" class="dropdown-menu__item" :class="[activeNode&& 'active']" :data-v-value="modelValue">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  const activeNode = ref<boolean>(false)
  const itemRef = ref<any>(null)
  const props = defineProps({
    value:{
      type:[String,Number],
      default:null
    }
  })
  const modelValue = computed(()=>{
    return props.value ? props.value : itemRef?.value?.outerText
  })
  onMounted(() => {
    if(modelValue.value === itemRef.value.parentNode.__vnode.props.activeName){
      activeNode.value = true
    }
  })
</script>

<style lang="scss" scoped>
  .dropdown-menu__item {
    padding: 5px 25px;
    background-color: var(--bg-color);
    transition: var(--transition);
    cursor: pointer;
    font-size: 14px;
    color: var(--text-color-primary);

    &:hover {
      background-color: var(--bg-color-page);
    }

    .svg-icon {
      margin-right: 15px;
    }

    &.active {
      color: var(--color-primary);
      font-weight: bold;
    }
  }
</style>