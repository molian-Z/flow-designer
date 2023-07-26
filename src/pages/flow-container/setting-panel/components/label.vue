<template>
  <div class="setting-editor">
    <div class="setting-editor__label">{{$t('pages.settingPanel.components.label')}}</div>
    <div class="setting-editor__content">
      <input type="text" v-model="optionsModel.label">
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions, defineProps } from 'vue'
  import { $t } from '@/utils/i18n'

  defineOptions({
    name: 'label',
    category:'basic',
    index: 1
  })

  defineProps({
    optionsModel:{
      type:Object,
      default: function(){
        return null
      }
    }
  })
</script>