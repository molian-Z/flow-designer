<template>
  <g>
    <path class="vue-flow__connection animated" fill="none" stroke="#409eff" :stroke-width="2.5"
      :d="`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`" />

    <circle :cx="targetX" :cy="targetY" fill="#fff" :r="4" stroke="#409eff" :stroke-width="1.5" />
  </g>
</template>

<script>
  export default {
    props: {
      sourceX: {
        type: Number,
        required: true,
      },
      sourceY: {
        type: Number,
        required: true,
      },
      targetX: {
        type: Number,
        required: true,
      },
      targetY: {
        type: Number,
        required: true,
      },
    }
  }
</script>

<style>
</style>