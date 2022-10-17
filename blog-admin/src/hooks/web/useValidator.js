
export const useValidator = () => {
  const required = (message) => {
    return {
      required: true,
      message: message || t('common.required')
    }
  }

  const lengthRange = (val, callback, options) => {
    const { min, max, message } = options
    if (val.length < min || val.length > max) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  const notSpace = (val, callback, message) => {
    // 用户名不能有空格
    if (val.indexOf(' ') !== -1) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  const notSpecialCharacters = (val, callback, message) => {
    // 密码不能是特殊字符
    if (/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/gi.test(val)) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  // 两个字符串是否想等
  const isEqual = (val1, val2, callback, message) => {
    if (val1 === val2) {
      callback()
    } else {
      callback(new Error(message))
    }
  }

  return {
    required,
    lengthRange,
    notSpace,
    notSpecialCharacters,
    isEqual
  }
}
