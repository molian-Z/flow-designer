<template>
  <div class="loading">
    <div class="circle"></div>
  </div>
</template>

<style scoped>
  .loading {
    color: #1890ff;
    font-size: 12px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .circle {
    width: 18px;
    height: 18px;
    border: 2px white solid;
    border-left-color: #1890ff;
    border-right-color: #1890ff;
    border-radius: 100%;
    animation: loading1 1s infinite linear;

    margin-bottom: 5px;
  }

  @keyframes loading1 {
    from {
      transform: rotate(0deg)
    }

    to {
      transform: rotate(360deg)
    }
  }
</style>