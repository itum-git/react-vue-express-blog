import { Icon } from '@/components/Icon'

export const useRenderMenuTitle = () => {
  const renderMenuTitle = (meta) => {
    const { title = 'Please set title', icon } = meta

    return icon ? (
      <>
        <Icon icon={meta.icon}></Icon>
        <span class="v-menu__title">{title}</span>
      </>
    ) : (
      <span class="v-menu__title">{title}</span>
    )
  }

  return {
    renderMenuTitle
  }
}
