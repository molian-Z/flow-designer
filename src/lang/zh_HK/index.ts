export const name : string = '繁體中文'

export default {
  components: {
    popconfirm: {
      confirm: '確定',
      cancel: '取消',
      close: '關閉'
    },
    copyable: {
      copyText: '複製',
      copiedText: '複製成功',
    }
  },
  warning:{
    missingSource:'缺少上級節點',
    missingTarget:'缺少下級節點',
    node:'節點名稱',
    description:'問題詳情',
    success:'審查通過'
  },
  pages: {
    topbarPanel: {
      clearTitle: '確定要清空畫布麼？',
      importData: '導入數據',
      exportData: '匯出數據',
    },
    leftPanel: {
      collapseName: {
        baseContainer: '分組容器',
        basicFields: '基礎組件',
        svgFields: 'SVG圖形組件'
      },
      components: {
        start: '開始流程',
        step: '流程事件',
        end: '結束流程',
        user: '用戶'
      }
    },
    settingPanel: {
      title:'配置面板',
      category:{
        basic:'基础配置',
        event:'事件配置'
      }
    },
    flowContainer: {
    },
    toolbarPanel: {
    }
  }
}