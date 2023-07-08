# flow-designer
> 这是一个基于vue3、vue-flow、@vueuse/core 开发的设计器除此之外他将不依赖于其他UI库
> 拖拽式可视化工作流

<br/>

正在开发中```

> 2023-07-08 更新
> 工具栏增加types选项可通过该选项配置该组件是在点击线['edge']时显示或者点击节点['node']时显示亦或者全选['node','edge']


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
    defineExpose
  } from 'vue'
  import { addTopComps, addToolComps, addToolMoreComps, setToolbarConfig, addNodeComps, i18n } from '@molian-z/flow-designer'
  import topComp from './testTopComp.vue'
  import toolComp from './testToolComp.vue'
  import toolMoreComp from './testToolMoreComp.vue'
  import nodeComp from './testNodeComp.vue'

  /* 为顶部菜单新增组件 */
  addTopComps([topComp])
  
  /* 为工具栏组件新增组件 */
  addToolComps([toolComp])
  /* 为工具栏更多功能新增组件*/
  addToolMoreComps([toolMoreComp])
  
  /* 修改工具栏的配置(目前仅有sort asc|desc) */
  setToolbarConfig({
    sort:'asc'
  })
  
  /* 为流程新增组件 目前已有 basicFields 以及 svgFields 字段 */
  addNodeComps([nodeComp])
  
  i18n.setLangData({
    'zh-CN':{
      pages:{
        leftPanel:{
          components:{
            yuan:'圆形'
          }
        }
      }
    },
    'en-US':{
      pages:{
        leftPanel:{
          components:{
            yuan:'yuan'
          }
        }
      }
    }
  })

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

##### 4.1 组件库丰富组件

```html
testNodeComp.vue

<template>
  <node-container :class="widget.options.customClass">
    <svg-icon :icon-class="type.icon"></svg-icon>
  </node-container>
  <template v-for="pItem in widget.options.position" :key="pItem">
    <Handle :id="pItem" type="source" :position="Position[pItem]" :class="[widget.options['p'+pItem+'Class']]" />
  </template>
</template>


<script setup lang="ts">
  import {
    defineOptions, getCurrentInstance
  } from 'vue'
  import {
    Handle,
    Position,
    useMixins
  } from '@molian-z/flow-designer'
  defineOptions({
    name: 'yuanWidget',
    category: 'customFields',
    index: 0,
    type: 'yuan',
    icon: `<svg t="1688727637302" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2278" width="200" height="200"><path d="M514.048 128q79.872 0 149.504 30.208t121.856 82.432 82.432 122.368 30.208 150.016q0 78.848-30.208 148.48t-82.432 121.856-121.856 82.432-149.504 30.208-149.504-30.208-121.856-82.432-82.432-121.856-30.208-148.48q0-79.872 30.208-150.016t82.432-122.368 121.856-82.432 149.504-30.208z" p-id="2279"></path></svg>`,
    options: {
      name: '',
      label: 'yuan',
      customClass: '',
      hidden: false,
      position: ['Left', 'Top', 'Right', 'Bottom'],
      pTopClass: '',
      pLeftClass: '',
      pRightClass: '',
      pBottomClass: ''
    }
  })

  const { type } = getCurrentInstance()

  const {
    widget
  } = useMixins()
</script>

```

##### 4.2 头部菜单丰富功能
```html

testTopComp.vue

<template>
  <svg-icon icon-class="import-data" class="color-svg-icon" @click="click" />
</template>

<script setup lang="ts">
  import {
    defineOptions,
    defineProps,
    ref
  } from 'vue'

  defineOptions({
    name: 'importData',
    index: -1
  })

  const props = defineProps({
    flowRef: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })
  
  const importModelValue = ref<any>([])

  const click = function () {
    alert('click')
    console.log(props.flowRef)
  }
</script>

<style scoped lang="scss">
  .maxHeight{
    width: 100%;
    height: 400px;
    overflow: auto;
  }
</style>

```

##### 4.3 工具栏添加功能
```html

testToolComp.vue

<template>
  <div class="font-weight-container" :class="[isActive && 'is-active']" @click="setBold()">
    <svg-icon icon-class="toolbar-bold" class="svg-icon"></svg-icon>
  </div>
</template>
 
<script setup lang="ts">
  import { defineOptions, defineProps, defineEmits, computed } from 'vue'
  defineOptions({
    name: 'fontWeight1',
    types:['node','edge'],
    index: -1,
    split:true
  })

  const props = defineProps({
    vueFlowRef: {
      type: Object,
      default: function () {
        return {}
      }
    },
    currentNode:{
      type:Object,
      default:function(){
        return []
      }
    }
  })
  
  const $emit = defineEmits(['change'])

  const isActive = computed(() => {
    return props.currentNode.node.data.widget.style.fontWeight === 'bold'
  })

  const setBold = function () {
    if(props.currentNode.node.data.widget.style.fontWeight === 'bold'){
      props.currentNode.node.data.widget.style.fontWeight = 500
    }else{
      props.currentNode.node.data.widget.style.fontWeight = 'bold'
    }
    
    $emit('change', {
      type: 'fontWeight',
      value: props.currentNode.node.data.widget.style.fontWeight
    })
  }
</script>

<style scoped lang="scss">
  .font-weight-container {
    
    .svg-icon{
      fill:var(--text-color-primary);
    }

    &.is-active {
      background-color: var(--bg-color-page);
    }
  }
</style>

```

##### 4.4 工具栏的更多按钮添加功能
```html

testToolComp.vue

<template>
  <div>
    test1
  </div>
</template>

<script setup lang="ts">
  import { defineOptions } from 'vue'
  defineOptions({
    name: 'moreTest',
    types:['node','edge'],
    index: -1,
  })
  
</script>

```

#### 5. 在Vue模板中使用模块的容器组件

##### 当然为了更好的集成在已有项目中, leftPanel topbarPanel flowContainer 这些都允许单独引用。
> 您可以根据您目前的项目对其进行拆分及整合
```html
<template>
  <div class="designer-container">
    <!-- 左侧面板 -->
    <leftPanel class="designer-container__left_body"></leftPanel>
    <div class="designer-container__body">
    <!-- 顶部面板应注意传入flowRef -->
      <topbar-panel class="designer-container__header_body" ref="topbarRef" :flowRef="flowRef" v-model="workflowData"></topbar-panel>
      <!-- 主面板应注意传入topbarRef -->
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


### 6.引入及使用内置函数

```
import {setDark, i18n, addTopComps, addToolComps, addToolMoreComps, setToolbarConfig, addNodeComps } from '@molian-z/flow-designer'

import topComp from './testTopComp.vue'
import toolComp from './testToolComp.vue'
import toolMoreComp from './testToolMoreComp.vue'
import nodeComp from './testNodeComp.vue'

/* 为顶部菜单新增组件 */
addTopComps([topComp])
  
/* 为工具栏组件新增组件 */
addToolComps([toolComp])

/* 为工具栏更多功能新增组件*/
addToolMoreComps([toolMoreComp])
  
/* 修改工具栏的配置(目前仅有sort asc|desc) */
setToolbarConfig({
  sort:'asc'
})
  
/* 为流程新增组件 目前已有 basicFields 以及 svgFields 字段 当然您也可以自定义更多的字段 */
addNodeComps({
  svgFields:nodeComp
  customFields:...
})

```