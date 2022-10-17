import { useI18n } from '@/hooks/web/useI18n'
import { getSlot } from '@/utils/jsxHelper'

const { t } = useI18n()

/**
 *
 * @param schema 对应组件数据
 * @returns 返回提示信息对象
 * @description 用于自动设置placeholder
 */
export const setTextPlaceholder = (schema)=> {
  const textMap = ['Input', 'Autocomplete', 'InputNumber', 'InputPassword']
  const selectMap = ['Select', 'TimePicker', 'DatePicker', 'TimeSelect', 'TimeSelect']
  if (textMap.includes(schema?.component)) {
    return {
      placeholder: t('common.inputText')
    }
  }
  if (selectMap.includes(schema?.component)) {
    // 一些范围选择器
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (
      twoTextMap.includes(
        (schema?.componentProps?.type || schema?.componentProps?.isRange)
      )
    ) {
      return {
        startPlaceholder: t('common.startTimeText'),
        endPlaceholder: t('common.endTimeText'),
        rangeSeparator: '-'
      }
    } else {
      return {
        placeholder: t('common.selectText')
      }
    }
  }
  return {}
}

/**
 *
 * @param col 内置栅格
 * @returns 返回栅格属性
 * @description 合并传入进来的栅格属性
 */
export const setGridProp = (col = {}) => {
  const colProps = {
    // 如果有span，代表用户优先级更高，所以不需要默认栅格
    ...(col.span
      ? {}
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        }),
    ...col
  }
  return colProps
}

/**
 *
 * @param item 传入的组件属性
 * @returns 默认添加 clearable 属性
 */
export const setComponentProps = (item) => {
  const notNeedClearable = ['ColorPicker']
  const componentProps = notNeedClearable.includes(item.component)
    ? { ...item.componentProps }
    : {
        clearable: true,
        ...item.componentProps
      }
  // 需要删除额外的属性
  delete componentProps?.slots
  return componentProps
}

/**
 *
 * @param slots 插槽
 * @param slotsProps 插槽属性
 * @param field 字段名
 */
export const setItemComponentSlots = (
  slots,
  slotsProps = {},
  field
) => {
  const slotObj = {}
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      // 由于组件有可能重复，需要有一个唯一的前缀
      slotObj[key] = (data) => {
        return getSlot(slots, `${field}-${key}`, data)
      }
    }
  }
  return slotObj
}

/**
 *
 * @param schema Form表单结构化数组
 * @param formModel FormMoel
 * @returns FormMoel
 * @description 生成对应的formModel
 */
export const initModel = (schema, formModel) => {
  const model = { ...formModel }
  schema.map((v) => {
    // 如果是hidden，就删除对应的值
    if (v.hidden) {
      delete model[v.field]
    } else if (v.component && v.component !== 'Divider') {
      const hasField = Reflect.has(model, v.field)
      // 如果先前已经有值存在，则不进行重新赋值，而是采用现有的值
      model[v.field] = hasField ? model[v.field] : v.value !== void 0 ? v.value : ''
    }
  })
  return model
}

/**
 * @param slots 插槽
 * @param field 字段名
 * @returns 返回FormIiem插槽
 */
export const setFormItemSlots = (slots, field) => {
  const slotObj = {}
  if (slots[`${field}-error`]) {
    slotObj['error'] = (data) => {
      return getSlot(slots, `${field}-error`, data)
    }
  }
  if (slots[`${field}-label`]) {
    slotObj['label'] = (data) => {
      return getSlot(slots, `${field}-label`, data)
    }
  }
  return slotObj
}
