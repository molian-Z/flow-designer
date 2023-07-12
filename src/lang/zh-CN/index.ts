export const name : string = '中文'

export default {
  components: {
    popconfirm: {
      confirm: '确定',
      cancel: '取消',
      close: '关闭'
    },
    copyable: {
      copyText: "复制",
      copiedText: "复制成功",
    }
  },
  warning:{
    missingSource:'缺少上级节点',
    missingTarget:'缺少下级节点',
    node:'节点名称',
    description:'问题详情',
    success:'审查通过'
  },
  pages: {
    topbarPanel: {
      clearTitle: '确定要清空画布么?',
      importData: '导入数据',
      exportData: '导出数据',

    },
    leftPanel: {
      collapseName: {
        baseContainer: '分组容器',
        basicFields: '基础组件',
        svgFields:'SVG图形组件'
      },
      components: {
        start: '开始流程',
        step: '流程事件',
        end: '结束流程',
        user: '用户'
      }
    },
    flowContainer: {
      
    },
    toolbarPanel: {

    }
  }
}