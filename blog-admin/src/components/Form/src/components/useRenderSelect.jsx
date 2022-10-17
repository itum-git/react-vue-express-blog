import { ElOption, ElOptionGroup } from 'element-plus'
import { getSlot } from '@/utils/jsxHelper'

export const useRenderSelect = (slots) => {
  // 渲染 select options
  const renderSelectOptions = (item) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    return item?.componentProps?.options?.map((option) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={option[labelAlias || 'label']}>
            {() => {
              return option?.options?.map((v) => {
                return renderSelectOptionItem(item, v)
              })
            }}
          </ElOptionGroup>
        )
      } else {
        return renderSelectOptionItem(item, option)
      }
    })
  }

  // 渲染 select option item
  const renderSelectOptionItem = (item, option) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField

    const { label, value, ...other } = option

    return (
      <ElOption
        label={labelAlias ? option[labelAlias] : label}
        value={valueAlias ? option[valueAlias] : value}
        {...other}
      >
        {{
          default: () =>
            // option 插槽名规则，{field}-option
            item?.componentProps?.optionsSlot
              ? getSlot(slots, `${item.field}-option`, { item: option })
              : undefined
        }}
      </ElOption>
    )
  }

  return {
    renderSelectOptions
  }
}
