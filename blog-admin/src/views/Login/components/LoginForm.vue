<script setup lang="js">
import { reactive, ref, unref, watch } from 'vue'
import { Form } from '@/components/Form'
import { ElButton, ElCheckbox, ElLink } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { loginApi, getTestRoleApi, getAdminRoleApi } from '@/api/login'
import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import { UserType } from '@/api/login/types'
import { useValidator } from '@/hooks/web/useValidator'

const { required } = useValidator()

const emit = defineEmits(['to-register'])

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const { currentRoute, addRoute, push } = useRouter()

const { wsCache } = useCache()

const rules = {
  username: [required()],
  password: [required()]
}

const schema = reactive([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'username',
    label: 'login.username',
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: 'login.usernamePlaceholder'
    }
  },
  {
    field: 'password',
    label: 'login.password',
    value: 'admin',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: 'login.passwordPlaceholder'
    }
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    }
  },
  {
    field: 'other',
    component: 'Divider',
    label: 'login.otherLogin',
    componentProps: {
      contentPosition: 'center'
    }
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24
    }
  }
])

const iconSize = 30

const remember = ref(false)

const { register, elFormRef, methods } = useForm()

const loading = ref(false)

const iconColor = '#999'

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route) => {
    redirect.value = route?.query?.redirect
  },
  {
    immediate: true
  }
)

// 登录
const signIn = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const { getFormData } = methods
      const formData = await getFormData()

      try {
        const res = await loginApi(formData)

        if (res) {
          wsCache.set(appStore.getUserInfo, res.data)
          // 是否使用动态路由
          if (appStore.getDynamicRouter) {
            getRole()
          } else {
            await permissionStore.generateRoutes('none').catch(() => {})
            permissionStore.getAddRouters.forEach((route) => {
              addRoute(route) // 动态添加可访问路由表
            })
            permissionStore.setIsAddRouters(true)
            push({ path: redirect.value || permissionStore.addRouters[0].path })
          }
        }
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取角色信息
const getRole = async () => {
  const { getFormData } = methods
  const formData = await getFormData()
  const params = {
    roleName: formData.username
  }
  // admin - 模拟后端过滤菜单
  // test - 模拟前端过滤菜单
  const res =
    formData.username === 'admin' ? await getAdminRoleApi(params) : await getTestRoleApi(params)
  if (res) {
    const { wsCache } = useCache()
    const routers = res.data || []
    wsCache.set('roleRouters', routers)

    formData.username === 'admin'
      ? await permissionStore.generateRoutes('admin', routers).catch(() => {})
      : await permissionStore.generateRoutes('test', routers).catch(() => {})

    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route) // 动态添加可访问路由表
    })
    permissionStore.setIsAddRouters(true)
    push({ path: redirect.value || permissionStore.addRouters[0].path })
  }
}

// 去注册页面
const toRegister = () => {
  emit('to-register')
}
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">{{ 'login.login' }}</h2>
    </template>

    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="'login.remember'" size="small" />
        <ElLink type="primary" :underline="false">{{ 'login.forgetPassword' }}</ElLink>
      </div>
    </template>

    <template #login>
      <div class="w-[100%]">
        <ElButton :loading="loading" type="primary" class="w-[100%]" @click="signIn">
          {{ 'login.login' }}
        </ElButton>
      </div>
      <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toRegister">
          {{ 'login.register' }}
        </ElButton>
      </div>
    </template>

    <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon
          icon="ant-design:github-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:wechat-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:alipay-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
        <Icon
          icon="ant-design:weibo-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
      </div>
    </template>
  </Form>
</template>

<style lang="less" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
