<template>
  <dropdown ref="popcofirm" :activeName="languageName" @command="setLang" :disabled="!isSupported">
    <svg-icon icon-class="lang" class="color-svg-icon" :class="[!isSupported && 'disabled']" />
    <template #dropdown>
      <dropdownItem v-for="lang in languageObj" :key="lang.value">{{lang.label}}</dropdownItem>
    </template>
  </dropdown>
</template>

<script setup lang="ts">
  import {languageName, setLang, isSupported} from '@/utils/i18n'
  import { defineOptions } from 'vue'
  import { languageObj } from '@/lang/index'
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