import { ref, unref, nextTick } from 'vue'
import { FormSchema, FormSetPropsType } from '@/types/form'

export const useForm = (props) => {
  // From实例
  const formRef = ref()

  // ElForm实例
  const elFormRef = ref()

  /**
   * @param ref Form实例
   * @param elRef ElForm实例
   */
  const register = (ref, elRef) => {
    formRef.value = ref
    elFormRef.value = elRef
  }

  const getForm = async () => {
    await nextTick()
    const form = unref(formRef)
    if (!form) {
      console.error('The form is not registered. Please use the register method to register')
    }
    return form
  }

  /**
   * 一些内置的方法
   * methods: {
   *  setProps: (props: Recordable) => void
   *  setValues: (data: Recordable) => void
   *  getFormData: <T = Recordable | undefined>() => Promise<T>
   *  setSchema: (schemaProps: FormSetPropsType[]) => void
   *  addSchema: (formSchema: FormSchema, index?: number) => void
   *  delSchema: (field: string) => void
   * }
   */
  const methods = {
    setProps: async (props = {}) => {
      const form = await getForm()
      form?.setProps(props)
    },

    setValues: async (data) => {
      const form = await getForm()
      form?.setValues(data)
    },

    /**
     * @param schemaProps 需要设置的schemaProps
     */
    setSchema: async (schemaProps) => {
      const form = await getForm()
      form?.setSchema(schemaProps)
    },

    /**
     * @param formSchema 需要新增数据
     * @param index 在哪里新增
     */
    addSchema: async (formSchema, index) => {
      const form = await getForm()
      form?.addSchema(formSchema, index)
    },

    /**
     * @param field 删除哪个数据
     */
    delSchema: async (field) => {
      const form = await getForm()
      form?.delSchema(field)
    },

    /**
     * @returns form data
     */
    getFormData: async () => {
      const form = await getForm()
      return form?.formModel
    }
  }

  props && methods.setProps(props)

  return {
    register,
    elFormRef,
    methods
  }
}
