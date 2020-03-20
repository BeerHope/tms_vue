const ENABLED = 'enabled'
const DISABLED = 'disabled'
import { JSEncrypt } from 'jsencrypt'

const mixin = {
  methods: {
    /**
     * @param {string} tPath 
     * @param {Object} item 
     */
    itemState(tPath, item) {
      const states = this.$t(tPath)
      const itemState = _.find(states, { value: _.toNumber(item.state) })
      return itemState && itemState.label
    },
    /**
     * @param {Object} item 
     */
    stateClass(item) {
      return _.toNumber(item.state) === 1 ? ENABLED : DISABLED
    },
    /**
     * 
     * @param {string} text 
     */
    encryptText(text) {
      const encryptor = new JSEncrypt()
      // 设置公钥
      const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5simUmTb1cbAaXLKUerWD+0BVsvLPW8FYryQnEFyqOFoA1P2SZXWkcv92eeodWvbonQGU9m3EL50o7W5s0EVvhDIo7kFKVlUmgCCL87SM67NFyy387db4EwR9TQkrBo3inxKp6TnFHlcbfeYuocfx1jqxUQsdn3lQ5C8K4qRIVQIDAQAB'
      encryptor.setPublicKey(publicKey)
      // 加密数据
      return encryptor.encrypt(text);
    },
  }
}

export default mixin
