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

#### 5. 在Vue模板中使用模块的容器组件

##### 当然为了更好的集成在已有项目中, leftPanel topbarPanel flowContainer 这些都允许单独引用。
> 您可以根据您目前的项目对其进行拆分及整合
```html
<template>
  <div class="designer-container">
    <leftPanel class="designer-container__left_body"></leftPanel>
    <div class="designer-container__body">
      <topbar-panel class="designer-container__header_body" ref="topbarRef" :flowRef="flowRef" v-model="workflowData"></topbar-panel>
      <flowContainer :topbarRef="topbarRef" ref="flowRef" :designer="designer" v-model="workflowData"></flowContainer>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,defineOptions
  } from 'vue'
  import leftPanel from './left-panel/index.vue'
  import flowContainer from './flow-container/index.vue'
  import topbarPanel from './topbar-panel/index.vue'
  
  defineOptions({
    name:"workFlowDesigner"
  })
  
  const workflowData = ref([])
  const designer = ref({})
  const flowRef = ref({})
  const topbarRef = ref({})
</script>

<style lang="scss" scoped>
  .designer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    
    .designer-container__left_body{
      border-right: 1px solid var(--border-color);
      max-width: 260px;
      width: 260px;
      min-width: 260px;
      background-color: var(--bg-color);
    }
    .designer-container__header_body{
      /* box-shadow: 3px 7px 9px 0px rgba(0, 0, 0, 0.12); */
      border-bottom: 1px solid var(--border-color);
      position: relative;
      z-index: 1000;
      width: calc(100% + 1px);
      left: -1px;
      background:var(--bg-color);
    }

    .designer-container__body {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }
  }
</style>
```


### 6.引入暴漏函数

```
import {setDark,i18n} from '@molian-z/flow-designer'

```