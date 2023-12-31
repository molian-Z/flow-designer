# flow-designer
> 这是一个基于vue3、vue-flow、@vueuse/core 开发的设计器除此之外他将不依赖于其他UI库
> 拖拽式可视化工作流

<br/>

正在开发中```

> 因正在开发部分功能可能会有数据调整,望见谅

> 2023-07-27 更新
> 1.新增 配置面板。插槽使用方案见下方settingComps相关。
> 2.更新 toolbar-panel的插槽组件新增optionsModel属性,可直接修改有关options数据的内容
> 3.优化edge属性提示文字增加背景色使其可以在页面中更加显眼
> 4.修复node节点可能存在数据更新不及时的问题

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
  import { addTopComps, addToolComps, addToolMoreComps, setToolbarConfig, addNodeComps, addSettingComps, addSettingCategory, i18n } from '@molian-z/flow-designer'
  import topComp from './testTopComp.vue'
  import toolComp from './testToolComp.vue'
  import toolMoreComp from './testToolMoreComp.vue'
  import nodeComp from './testNodeComp.vue'
  import settingComp from './testSettingComp.vue'

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
  
  /* 为流程新增组件 目前已有 basicFields 以及 svgFields 字段,可自行添加更多面板 */
  addNodeComps([nodeComp])
  
  /* 为流程新增配置面板组件 目前已有 basic 以及 event 面板 */
  addSettingCategory([{
  name : 'test',
  label : '测试面板',
  index : 1000
}])
  addSettingComps([settingComps])
  
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
  <node-container :is-valid-connection="isValidConnection">
    {{widget.options.label}}
  </node-container>
</template>


<script setup lang="ts">
  import {
    defineOptions
  } from 'vue'
  import {
    useMixins
  } from '@molian-z/flow-designer'
  defineOptions({
    name: 'yuanWidget',
    category: 'customFields',
    index: 0,
    type: 'yuan',
    rules: { //规则校验,漏连提醒
      source: true,
      target: true,
    },
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

  const {
    widget
  } = useMixins()

  const isValidConnection = function (connection : any) {
    return connection.target.indexOf('start-dndnode') === -1 //不允许连接起始节点
  }
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
    index: 10,
    types:['node','edge'],
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
    },
    optionsModel:{
      type:Object,
      default: function(){
        return null
      }
    }
  })
  
  const $emit = defineEmits(['change'])
  
  const getStyle = computed(()=>{
    return props.optionsModel.labelStyle ? props.optionsModel.labelStyle : props.optionsModel.style
  })

  const isActive = computed(() => {
    return getStyle.value.fontWeight === 'bold'
  })

  const setBold = function () {
    if(getStyle.value.fontWeight === 'bold'){
      getStyle.value.fontWeight = 500
    }else{
      getStyle.value.fontWeight = 'bold'
    }
    
    $emit('change', {
      type: 'fontWeight',
      value: getStyle.value.fontWeight
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

testToolMoreComp.vue

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

#### 4.5 配置面板的更多输入功能
```html
testSettingComp.vue

<template>
  <div class="setting-editor">
    <div class="setting-editor__label">标签</div>
    <div class="setting-editor__content">
      <input type="text" v-model="optionsModel.label">
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions, defineProps } from 'vue'

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