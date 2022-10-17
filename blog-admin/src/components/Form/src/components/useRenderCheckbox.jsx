
import { ElCheckbox, ElCheckboxButton } from 'element-plus'

export const useRenderCheckbox = () => {
  const renderChcekboxOptions = (item) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField
    const Com = (item.component === 'Checkbox' ? ElCheckbox : ElCheckboxButton)
    return item?.componentProps?.options?.map((option) => {
      return <Com label={option[labelAlias || 'value']}>{option[valueAlias || 'label']}</Com>
    })
  }

  return {
    renderChcekboxOptions
  }
}
