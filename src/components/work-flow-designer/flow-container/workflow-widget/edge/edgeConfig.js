import {
  Handle,
  Position
} from '@vue-flow/core'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  components: {
    Handle
  },
  computed: {
    Position() {
      return Position
    },
    designer() {
      return this.data.props.designer
    },
    widget() {
      return this.data.widget
    },
    formConfig() {
      return this.data.props.formConfig
    },
    globalDsv() {
      return this.data.props.globalDsv
    },
    optionData() {
      return this.data.props.optionData
    }
  },
  watch:{
    'designer.selectedWorkflowName':{
      handler(val,oldVal){
        if(val === this.widget.options.name){
          this.$el.nextElementSibling.classList.add('selected')
        }
        if(oldVal === this.widget.options.name){
          this.$el.nextElementSibling.classList.remove('selected')
        }
      }
    }
  },
  methods: {
    onSelect(color) {
      this.$emit('change', color)
    },
    onGradient() {
      this.$emit('gradient')
    }
  }
}