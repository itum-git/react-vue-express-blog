import { createTypes } from 'vue-types'

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
})

// 需要自定义扩展的类型
// see: https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#the-extend-method
propTypes.extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined
  }
])

export { propTypes }
