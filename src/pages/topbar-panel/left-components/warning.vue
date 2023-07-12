<template>
  <div ref="visualRef" @click="isPopover = !isPopover">
    <svg-icon icon-class="warning" class="color-svg-icon warning-icon" v-if="warningData.length > 0"></svg-icon>
    <svg-icon icon-class="success" class="color-svg-icon success-icon" v-else></svg-icon>
  </div>
  <popover :visualRef="visualRef" v-model="isPopover">
    <div class="panel-body">
      <div class="panel-body__container">
        <template v-if="warningData.length > 0">
          <div class="panel-body__container__header">
            <div class="panel-body__container__header__left">
              {{$t('warning.description')}}
            </div>
            <div class="panel-body__container__header__right">
              <svg-icon icon-class="warning" class="color-svg-icon warning-icon"></svg-icon>
              {{warningData.length}}
            </div>
          </div>
          <collapse :activeNames="[]">
            <template v-for="item in warningData" :key="item.id">
              <collapse-item class="warning-collapse-item" :title="$t('warning.node')+': '+item.label">
                {{item.message}}
              </collapse-item>
            </template>
          </collapse>
        </template>
        <template v-else>
          <div class="panel-body-success">
            <svg-icon icon-class="success" class="color-svg-icon success-icon"></svg-icon>
            <div class="marginTop">
              {{$t('warning.success')}}
            </div>
          </div>
          
        </template>
      </div>
    </div>
  </popover>
</template>

<script setup lang="ts">
  import { $t } from '@/utils/i18n'
  import svgIcon from '@/components/svg-icon/index.vue'
  import popover from '@/components/popover/index.vue'
  import collapse from '@/components/collapse/index.vue'
  import collapseItem from '@/components/collapse/collapse-item.vue'
  import {
    defineOptions,
    defineProps,
    computed,
    ref
  } from 'vue'
  defineOptions({
    name: 'warning',
    index: 3
  })

  const props = defineProps({
    flowRef: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })

  const visualRef = ref<any>(null)
  const isPopover = ref<boolean>(false)

  const warningData = computed(() => {
    const warningList : any[] = []
    props?.flowRef?.flowData?.forEach((widget : any) => {
      if (widget.type !== 'edge') {
        if (widget.isWarning) {
          warningList.push(...widget.warningData)
        }
      }
    })
    return warningList
  })
</script>
<style scoped lang="scss">
  .warning-icon {
    color: #ddc71f !important;
  }

  .success-icon {
    color: #2cc592 !important;
  }

  .panel-body {
    display: flex;
    justify-content: center;
    align-items: center;

    .panel-body__container {
      width: 240px;

      .success-icon {
        width: 48px;
        height: 48px;
      }
    }

    .panel-body__container__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid var(--border-color);
      font-weight: bold;
      .panel-body__container__header__left{
        font-size: 14px;
        color:var(--color-info);
      }
      .panel-body__container__header__right{
        .warning-icon{
          width: 12px;
          height: 12px;
        }
        font-size: 12px;
        color:var(--color-danger);
      }
    }
    
    .panel-body-success{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 50px 0;
    }
  }

  .warning-collapse-item {
    :deep(.collapse-item-header){
      padding:10px 5px !important;
      padding-left: 15px !important;
    }
    
    :deep(.title) {
      font-weight: bold;
      color: var(--color-warning) !important;
      font-size: 13px;
    }

    :deep(.collapse-item-body__content) {
      padding: 5px 20px !important;
      font-size: 14px;
      color: var(--color-info) !important;
      padding-bottom: 15px !important;
    }
  }

  .marginTop {
    margin-top: 15px;
  }
</style>