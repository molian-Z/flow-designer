<template>
  <dropdown ref="popcofirm" :activeName="languageName" @command="setLang" :disabled="!isSupported">
    <svg-icon icon-class="lang" class="color-svg-icon" :class="[!isSupported && 'disabled']" />
    <template #dropdown>
      <dropdownItem>中文</dropdownItem>
      <dropdownItem>English</dropdownItem>
    </template>
  </dropdown>
</template>

<script setup>
  import {languageName, setLang, isSupported} from '@/utils/i18n'
  import { defineOptions } from 'vue'
  defineOptions({
    name: 'selectedLange',
    index: 50
  })
  import svgIcon from '@/components/svg-icon/index.vue'
  import {
    dropdown,
    dropdownItem
  } from '@/components/dropdown/index'
</script>
<style scoped lang="scss">
</style>