export const name : string = 'English'

export default {
  components: {
    popconfirm: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      close: 'Close'
    },
    copyable: {
      copyText: "Copy",
      copiedText: "Copied",
    }
  },
  warning:{
    MissingSource: 'Missing Source',
    MissingTarget: 'Missing Target',
    node:'Node Name',
    description:'Problem Details',
    success:'Success'
  },
  pages: {
    topbarPanel: {
      clearTitle: 'Are you sure you want to empty the canvas ?',
      importData: 'Import Data',
      exportData: 'Export Data',
    },
    leftPanel: {
      collapseName: {
        baseContainer: 'Basic Container',
        basicFields: 'Basic Fields',
        svgFields:'SVG Fields'
      },
      components: {
        start: 'Start Node',
        step: 'Step Node',
        end: 'End Node',
        user: 'User'
      }
    },
    flowContainer: {

    },
    toolbarPanel: {

    }
  }
}