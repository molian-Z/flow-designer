<template>
  <svg :class="svgClass" aria-hidden="true" v-if="props?.iconClass?.length < 100" :style="{width:size,height:size}">
    <use :xlink:href="iconName" rel="external nofollow"></use>
    <title v-if="!!title">{{title}}</title>
  </svg>
 <!-- <stringSvg :class="svgClass" v-else></stringSvg> -->
 <div :class="svgClass" :style="{width:size,height:size}" v-else v-html="stringSvg.template"></div>
</template>

<script lang="ts" setup>
  import { defineOptions, defineProps, computed } from 'vue'
  defineOptions({
    name: 'SvgIcon'
  })
  
  const props = defineProps({
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    title: {
      type: String,
      default: ''
    },
    size:{
      type:Number,
      default:18
    }
  })

  const iconName:any = computed(()=>{
    if(!props.iconClass || props?.iconClass?.length < 100){
      return `#icon-${props.iconClass}`
    }else{
      return props.iconClass
    }
  })
  
  const stringSvg = props?.iconClass?.length < 100 ? '': {
    template:iconName.value
  }
  
  const svgClass:any = computed(()=>{
    if (props.className) {
      return 'svg-icon ' + props.className
    } else {
      return 'svg-icon'
    }
  })
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 18px;
    height: 18px;
    margin-left: 5px;
    margin-right: 5px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    outline: none;
    
    :deep(svg){
      width: inherit;
      height: inherit;
    }
  }
</style>