import message from '@/locales/zh-CN'

export const setHtmlPageLang = locale => {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export const createDefaultI18n = () => ({
  global: {
    t(key) {
      if (typeof key !== 'string') {
          throw new Error('Invalid argument')
      }
      if (!key.includes('.')) return key

      const propArr = key.split('.')
      
      let value = message, i = 0 

      while (value && i < propArr.length) {
        const key = propArr[i++]
        value = value[key]
      }

      return value
    },
  }
});