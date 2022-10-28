import { inject } from 'vue'

export const useConfigGlobal = () => {
  const configGlobal = inject('configGlobal', {})

  return {
    configGlobal
  }
}
