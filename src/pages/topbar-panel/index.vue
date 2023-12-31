<template>
  <div class="workflow-header">
    <div class="workflow-header__body">
      <div class="workflow-header__body-left">
        <svg-icon icon-class="undo" class="color-svg-icon" style="margin-right: 15px;"
          @click="flowRef.historyRef.undo()" :class="[!canUndo&&'disabled']"></svg-icon>
        <svg-icon icon-class="redo" class="color-svg-icon" @click="flowRef.historyRef.redo()"
          :class="[!canRedo&&'disabled']"></svg-icon>
        <template v-for="comp in leftComponents" :key="comp.name">
          <component :is="comp" :flowRef="flowRef" v-if="hiddenComponents.indexOf(comp.name) === -1"></component>
        </template>
        <slot name="left"></slot>
      </div>
      <div class="workflow-header__body-right">
        <slot name="right-left"></slot>
        <template v-for="comp in components" :key="comp.name">
          <component :is="comp" :flowRef="flowRef" v-if="hiddenComponents.indexOf(comp.name) === -1"></component>
        </template>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    defineProps,
    defineOptions
  } from 'vue'
  import svgIcon from '@/components/svg-icon/index.vue'
  import components from './components/index'
  import leftComponents from './left-components/index'

  defineOptions({
    name: 'topbarPanel'
  })

  const props = defineProps({
    designer: Object,
    modelValue: Array,
    flowRef: {
      type: Object,
      default: function () {
        return {}
      }
    },
    hiddenComponents: {
      type: Array,
      default: function () {
        return []
      }
    },
  })
  const canUndo = computed(() => {
    return props?.flowRef?.historyRef?.canUndo.value
  })
  const canRedo = computed(() => {
    return props?.flowRef?.historyRef?.canRedo.value
  })
</script>

<style lang="scss" scoped>
  .workflow-header {
    height: 42px;
    max-height: 42px;

    .workflow-header__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 0 15px;

      .workflow-header__body-left {
        display: flex;
        align-items: center;

        >*:not(:last-child) {
          margin-right: 30px;
        }
      }

      .workflow-header__body-right {
        display: flex;
        align-items: center;
      }

      :deep(.color-svg-icon) {
        margin: 0 10px;
        font-size: 16px;
        transition: var(--transition);
        color: var(--color-primary);
        cursor: pointer;

        &:hover:not(.disabled) {
          opacity: .5;
        }
      }

      .disabled {
        color: var(--disbled-color);
        cursor: no-drop;
      }
    }
  }
</style>