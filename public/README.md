# flow-designer
> 这是一个基于vue3、vue-flow、@vueuse/core 开发的设计器除此之外他将不依赖于其他UI库
> 拖拽式可视化工作流
> gzip压缩大小仅84kb

<br/>

### 跟Vue项目集成

<br/>

#### 1. 安装包
  ```bash
  npm i @molian-z/flow-designer
  ```
或
  ```bash
  yarn add @molian-z/flow-designer
  ```

<br/>

#### 2. 引入并全局注册flow-designer组件
```
import {createApp} from 'vue'

import App from './App.vue'

import flowDesigner from '@molian-z/flow-designer'

import '@molian-z/flow-designer/index.css'

const app = createApp(App)

app.use(flowDesigner)
app.mount('#app')

```

<br/>

#### 4. 在Vue模板中使用完整的容器组件
```html
<script setup>
  import {
    ref,
    reactive,
    defineExpose
  } from 'vue'

  const config = reactive({})
  const flowList = reactive([])
  const flowRef = ref()
  defineExpose({
    config,
    flowList,
    flowRef
  })
</script>

<template>
    <workFlowDesigner ref="flowRef" :flowList="flowList" :config="config"></workFlowDesigner>
</template>

<style>
  html,body,#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }
</style>
```
