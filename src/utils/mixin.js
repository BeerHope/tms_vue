const ENABLED = 'enabled'
const DISABLED = 'disabled'
const mixin = {
  methods: {
    /**
     * @param {string} tPath 
     * @param {Object} item 
     */
    itemState(tPath, item) {
      const states = this.$t(tPath)
      const itemState = _.find(states, { value: item.state })
      return itemState && itemState.label
    },
    /**
     * @param {Object} item 
     */
    stateClass(item) {
      return item.state === 1 ? ENABLED : DISABLED
    },
  }
}

export default mixin
