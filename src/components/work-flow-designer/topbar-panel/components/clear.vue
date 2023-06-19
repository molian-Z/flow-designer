<template>
	<svg-icon icon-class="clear" class="color-svg-icon" @click="$emit('click')" />
</template>

<script setup>
  import svgIcon from '@/components/svg-icon/index.vue'
  import {defineOptions,defineEmits} from 'vue'
  defineOptions({
    name:'clear',
    index:1
  })
  const $emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
	
</style>