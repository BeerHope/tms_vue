import index from './index.vue'

const NoResult = {
  install: (Vue) => {
    Vue.component('NoResult', index)
  }
}

export default NoResult
