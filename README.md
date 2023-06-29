# flow-designer
> 这是一个基于vue3、vue-flow、@vueuse/core 开发的设计器除此之外他将不依赖于其他UI库
> 拖拽式可视化工作流
> gzip压缩大小仅84kb

<br/>

正在开发中```

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

import '@molian-z/flow-designer/dist/index.css'

const app = createApp(App)

app.use(flowDesigner,{setLang:'zh-CN'})//setLang  中文可传递 中文或者zh-CN  英文应传递 English或者en-US

app.mount('#app')

```

<br/>

#### 4. 在Vue模板中使用完整的容器组件
```html
<script setup>
  import {
    ref,
    reactive,
    defineExpose,
    watch
  } from 'vue'
  import {i18n} from '@molian-z/flow-designer'
  i18n.setLang('zh-CN')
  watch('i18n.currentLang',{
    handler:(val){
      console.log(val)
    }
  })
  console.log(i18n.currentLang)
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


### 5.引入暴漏函数

```
import {setDark,i18n} from '@molian-z/flow-designer'

```